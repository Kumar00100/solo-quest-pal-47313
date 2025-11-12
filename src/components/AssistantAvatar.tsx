import { useState } from 'react';
import { motion } from 'framer-motion';

type Expression = 'idle' | 'speaking' | 'thinking' | 'happy';

interface AssistantAvatarProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  expression?: Expression;
  position?: { x: number; y: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export function AssistantAvatar({ 
  isSpeaking = false,
  isListening = false,
  expression = 'idle',
  position = { x: 50, y: 50 },
  onPositionChange 
}: AssistantAvatarProps) {
  const [blinkState, setBlinkState] = useState(false);

  // Natural blinking
  useState(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  });

  // Eye expressions based on state
  const getEyeHeight = () => {
    if (blinkState) return 2;
    if (isListening) return 14;
    if (expression === 'happy') return 12;
    if (expression === 'thinking') return 10;
    return 12;
  };

  // Mouth/lip animations
  const getMouthAnimation = () => {
    if (isSpeaking) {
      return {
        d: [
          "M 0 0 Q 20 10 40 0",  // Open wide
          "M 0 5 Q 20 0 40 5",   // Closed
          "M 0 0 Q 20 8 40 0",   // Medium open
          "M 0 5 Q 20 2 40 5",   // Slightly open
          "M 0 0 Q 20 12 40 0",  // Wide open
          "M 0 5 Q 20 0 40 5",   // Closed
        ],
      };
    } else if (expression === 'happy') {
      return { d: "M 0 0 Q 20 8 40 0" };
    } else if (expression === 'thinking') {
      return { d: "M 5 5 L 35 5" };
    }
    return { d: "M 0 5 Q 20 2 40 5" };
  };

  return (
    <div className="relative mx-auto w-fit">
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute -inset-6 rounded-full blur-2xl transition-all duration-500 ${
          isSpeaking 
            ? 'bg-gradient-to-r from-primary via-secondary to-accent opacity-60 animate-pulse-glow' 
            : isListening 
            ? 'bg-primary/40 opacity-50' 
            : 'bg-primary/20 opacity-30'
        }`} />
        
        {/* Main avatar circle */}
        <div className={`relative w-32 h-32 rounded-full transition-all duration-300 ${
          isSpeaking ? 'scale-105' : ''
        }`} style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
        }}>
          <div className="absolute inset-[3px] rounded-full bg-background flex items-center justify-center">
            <svg width="100" height="100" viewBox="0 0 100 100" className="relative z-10">
              {/* Robot head */}
              <rect x="25" y="30" width="50" height="45" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2"/>
              
              {/* Antenna */}
              <line x1="50" y1="30" x2="50" y2="20" stroke="hsl(var(--primary))" strokeWidth="2"/>
              <circle cx="50" cy="18" r="3" fill="hsl(var(--secondary))" className={isSpeaking ? 'animate-pulse' : ''}/>
              
              {/* Eyes */}
              <motion.rect
                x="35" 
                y="42" 
                width="8" 
                height={getEyeHeight()}
                rx="4"
                fill="hsl(var(--primary))"
                animate={{
                  height: getEyeHeight(),
                }}
                transition={{ duration: 0.15 }}
              />
              <motion.rect
                x="57" 
                y="42" 
                width="8" 
                height={getEyeHeight()}
                rx="4"
                fill="hsl(var(--primary))"
                animate={{
                  height: getEyeHeight(),
                }}
                transition={{ duration: 0.15 }}
              />
              
              {/* Mouth */}
              <motion.path
                d="M 35 60 Q 50 65 65 60"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={isSpeaking ? getMouthAnimation() : {}}
                transition={{
                  duration: 0.15,
                  repeat: isSpeaking ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
              
              {/* Decorative elements */}
              <circle cx="32" cy="68" r="2" fill="hsl(var(--accent))" opacity="0.6"/>
              <circle cx="68" cy="68" r="2" fill="hsl(var(--accent))" opacity="0.6"/>
            </svg>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }} />
        </div>

        {/* Level badge */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-bold border-2" style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
          borderColor: 'hsl(var(--primary-glow))',
          boxShadow: '0 0 20px hsl(var(--primary) / 0.4)',
        }}>
          <span className="text-primary-foreground font-bold">LVL 1</span>
        </div>

        {/* Particles when speaking */}
        {isSpeaking && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
                  left: `${30 + i * 15}%`,
                  top: '50%',
                }}
                animate={{
                  y: [-20, -50],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}