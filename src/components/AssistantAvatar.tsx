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
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40">
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-primary blur-2xl opacity-50 transition-all ${
          isSpeaking ? 'animate-pulse-glow scale-110' : isListening ? 'opacity-70 scale-105' : ''
        }`} />
        
        {/* Avatar container */}
        <div className={`relative w-40 h-40 rounded-full bg-gradient-primary p-1.5 transition-all ${
          isSpeaking ? 'animate-pulse-glow scale-105' : ''
        }`}>
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
            {/* Robot Image */}
            <img 
              src={robotAvatar} 
              alt="AI Assistant" 
              className="w-full h-full object-cover"
            />
            
            {/* Animated overlay for expressions */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 120 120" className="absolute">
                {/* Eyes with expressions */}
                <motion.ellipse
                  cx="45"
                  cy="50"
                  rx="8"
                  ry={getEyeHeight()}
                  fill="rgba(255, 255, 255, 0.9)"
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
                  fill="rgba(255, 255, 255, 0.9)"
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
                  fill="rgba(0, 0, 0, 0.8)"
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
                  fill="rgba(0, 0, 0, 0.8)"
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
                  stroke="rgba(255, 255, 255, 0.8)"
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
          </div>
        </div>

        {/* Level indicator */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-card border border-primary/30 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap shadow-lg">
          Level 1
        </div>
      </div>
    </div>
  );
}
