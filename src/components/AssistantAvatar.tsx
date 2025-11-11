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
        {/* Enhanced glow effect */}
        <div className={`absolute -inset-4 rounded-full bg-gradient-primary blur-3xl opacity-40 transition-all duration-500 ${
          isSpeaking ? 'animate-pulse-glow scale-125 opacity-60' : isListening ? 'opacity-50 scale-110' : ''
        }`} />
        
        {/* Outer ring with gradient */}
        <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br from-primary via-secondary to-primary p-1 transition-all duration-300 ${
          isSpeaking ? 'animate-pulse-glow scale-105' : ''
        }`}>
          {/* Inner ring */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-background via-card to-background p-2">
            {/* Avatar container */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-card to-background flex items-center justify-center overflow-hidden relative shadow-2xl">
              {/* Robot Image with better sizing */}
              <img 
                src={robotAvatar} 
                alt="AI Assistant" 
                className="w-full h-full object-cover scale-110"
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

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Enhanced level indicator */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-primary rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap shadow-glow border border-primary/30">
          <span className="text-primary-foreground">Level 1</span>
        </div>

        {/* Floating particles effect when speaking */}
        {isSpeaking && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/60"
              animate={{
                y: [-20, -60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-secondary/60"
              animate={{
                y: [-20, -60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
                ease: "easeOut"
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}