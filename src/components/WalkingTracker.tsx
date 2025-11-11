import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';
import { Play, Square, MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface WalkingTrackerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalkingTracker({ open, onOpenChange }: WalkingTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [route, setRoute] = useState<[number, number][]>([]);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const watchId = useRef<number | null>(null);
  const startTime = useRef<number>(0);

  useEffect(() => {
    if (!open || !mapContainer.current || map.current) return;

    // Note: Users need to add their Mapbox token
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 0],
        zoom: 15,
      });

      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { longitude, latitude } = position.coords;
          map.current?.setCenter([longitude, latitude]);
          
          new mapboxgl.Marker({ color: '#6366f1' })
            .setLngLat([longitude, latitude])
            .addTo(map.current!);
        });
      }
    } catch (error) {
      console.error('Mapbox initialization error:', error);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [open]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsTracking(true);
    startTime.current = Date.now();
    setRoute([]);
    setDistance(0);
    setDuration(0);

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        const newPoint: [number, number] = [longitude, latitude];

        setRoute((prev) => {
          if (prev.length > 0) {
            const lastPoint = prev[prev.length - 1];
            const newDistance = calculateDistance(lastPoint[1], lastPoint[0], latitude, longitude);
            setDistance((d) => d + newDistance);
          }
          return [...prev, newPoint];
        });

        // Update map
        if (map.current) {
          map.current.setCenter([longitude, latitude]);
          
          if (route.length > 0) {
            const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [...route, newPoint],
              },
            };

            if (map.current.getSource('route')) {
              (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(geojson);
            } else {
              map.current.addSource('route', {
                type: 'geojson',
                data: geojson,
              });

              map.current.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round',
                },
                paint: {
                  'line-color': '#6366f1',
                  'line-width': 4,
                },
              });
            }
          }
        }
      },
      (error) => console.error('Geolocation error:', error),
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    // Update duration every second
    const interval = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  };

  const stopTracking = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setIsTracking(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/20 max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Walking Tracker
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Distance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{distance.toFixed(2)} km</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{formatDuration(duration)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-primary/20">
            <div ref={mapContainer} className="absolute inset-0" />
            {!mapboxgl.accessToken || mapboxgl.accessToken === 'YOUR_MAPBOX_TOKEN_HERE' ? (
              <div className="absolute inset-0 bg-card/90 flex items-center justify-center text-center p-4">
                <div>
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Please add your Mapbox token to enable map tracking
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            {!isTracking ? (
              <Button
                onClick={startTracking}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Tracking
              </Button>
            ) : (
              <Button
                onClick={stopTracking}
                variant="destructive"
                className="flex-1"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Tracking
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
