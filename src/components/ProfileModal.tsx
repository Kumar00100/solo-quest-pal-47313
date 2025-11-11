import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const [user, setUser] = useState<any>(null);
  const level = 1;
  const xp = 0;
  const xpToNextLevel = 100;

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                {user?.email?.[0].toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-semibold">{user?.email || 'User'}</h3>
              <Badge variant="outline" className="mt-2">Level {level}</Badge>
            </div>
          </div>

          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Experience</span>
              <span className="font-medium">{xp} / {xpToNextLevel} XP</span>
            </div>
            <Progress value={(xp / xpToNextLevel) * 100} className="h-2" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card/50 border border-primary/10">
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
              <div className="text-2xl font-bold text-primary">0</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-primary/10">
              <div className="text-sm text-muted-foreground">Streak</div>
              <div className="text-2xl font-bold text-secondary">0 days</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-primary/10">
              <div className="text-sm text-muted-foreground">Focus</div>
              <div className="text-2xl font-bold text-primary">1</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-primary/10">
              <div className="text-sm text-muted-foreground">Health</div>
              <div className="text-2xl font-bold text-secondary">1</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
