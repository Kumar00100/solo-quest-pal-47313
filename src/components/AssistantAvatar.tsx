import { useState } from 'react';
import { motion } from 'framer-motion';
import robotAvatar from '@/assets/robot-avatar.png';

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
        {/* Multi-layer glow effects */}
        <div className={`absolute -inset-8 rounded-full blur-3xl transition-all duration-700 ${
          isSpeaking 
            ? 'bg-gradient-to-r from-primary via-secondary to-accent opacity-70 animate-pulse-glow scale-110' 
            : isListening 
            ? 'bg-gradient-to-r from-primary/60 to-secondary/60 opacity-50 scale-105' 
            : 'bg-gradient-to-r from-primary/40 to-secondary/40 opacity-30'
        }`} />
        
        <div className={`absolute -inset-6 rounded-full bg-gradient-radial transition-all duration-500 ${
          isSpeaking ? 'opacity-60 scale-110' : 'opacity-30'
        }`} />
        
        {/* Outer ring with animated gradient */}
        <div className={`relative w-64 h-64 rounded-full p-[3px] transition-all duration-500 ${
          isSpeaking ? 'animate-pulse-glow scale-105' : ''
        }`} style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
        }}>
          {/* Middle ring */}
          <div className="w-full h-full rounded-full bg-background p-[2px]">
            {/* Inner gradient ring */}
            <div className="w-full h-full rounded-full p-3" style={{
              background: 'linear-gradient(225deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
            }}>
              {/* Avatar container with enhanced shadow */}
              <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative" style={{
                background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5), 0 10px 40px rgba(0,0,0,0.8)',
              }}>
                {/* Robot Image with perfect fit */}
                <img 
                  src={robotAvatar} 
                  alt="AI Assistant" 
                  className="w-full h-full object-cover scale-[1.15]"
                />
              
              {/* Animated overlay for expressions */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="140" height="140" viewBox="0 0 120 120" className="absolute">
                  {/* Eyes with expressions */}
                  <motion.ellipse
                    cx="45"
                    cy="50"
                    rx="8"
                    ry={getEyeHeight()}
                    fill="rgba(255, 255, 255, 0.95)"
                    animate={{
                      ry: getEyeHeight(),
                    }}
                    transition={{ duration: 0.15 }}
                  />
                  <motion.ellipse
                    cx="75"
                    cy="50"
                    rx="8"
                    ry={getEyeHeight()}
                    fill="rgba(255, 255, 255, 0.95)"
                    animate={{
                      ry: getEyeHeight(),
                    }}
                    transition={{ duration: 0.15 }}
                  />

                  {/* Pupils with subtle movement */}
                  <motion.circle
                    cx="45"
                    cy="50"
                    r="4"
                    fill="rgba(0, 0, 0, 0.9)"
                    animate={isListening ? {
                      cx: [45, 47, 43, 45],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: isListening ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.circle
                    cx="75"
                    cy="50"
                    r="4"
                    fill="rgba(0, 0, 0, 0.9)"
                    animate={isListening ? {
                      cx: [75, 77, 73, 75],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: isListening ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Realistic mouth/lip movement */}
                  <motion.path
                    d="M 40 75 Q 60 80 80 75"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={isSpeaking ? getMouthAnimation() : {}}
                    transition={{
                      duration: 0.15,
                      repeat: isSpeaking ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </div>

                {/* Enhanced shine effect */}
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                }} />
                
                {/* Rim light */}
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Premium level indicator with better styling */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full px-6 py-2.5 text-sm font-bold whitespace-nowrap border-2 shadow-glow-lg" style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
          borderColor: 'hsl(var(--primary-glow))',
          boxShadow: '0 0 30px hsl(var(--primary) / 0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}>
          <span className="text-primary-foreground font-extrabold tracking-wide">LEVEL 1</span>
        </div>

        {/* Enhanced floating particles effect when speaking */}
        {isSpeaking && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))',
                  left: `${20 + i * 10}%`,
                  top: '50%',
                  opacity: 0.6,
                }}
                animate={{
                  y: [-30, -80],
                  x: [0, (i % 2 === 0 ? 20 : -20)],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.2,
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