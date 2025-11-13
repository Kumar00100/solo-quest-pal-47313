import { motion } from 'framer-motion';

interface AssistantAvatarProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  isThinking?: boolean;
}

export function AssistantAvatar({ 
  isSpeaking = false,
  isListening = false,
  isThinking = false,
}: AssistantAvatarProps) {
  // Dynamic parameters based on state
  const getAnimationParams = () => {
    if (isSpeaking) {
      return { speed: 0.8, complexity: 15, glow: 30, rotation: 2 };
    }
    if (isThinking) {
      return { speed: 1.5, complexity: 8, glow: 20, rotation: 5 };
    }
    if (isListening) {
      return { speed: 2, complexity: 5, glow: 15, rotation: 1 };
    }
    return { speed: 3, complexity: 3, glow: 10, rotation: 0.5 };
  };

  const { speed, complexity, glow, rotation } = getAnimationParams();

  return (
    <div className="relative mx-auto w-fit py-8">
      <svg width="300" height="300" viewBox="0 0 300 300" className="relative">
        <defs>
          {/* Vibrant gradients using design system colors */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
            <stop offset="100%" stopColor="hsl(270, 70%, 60%)" />
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(280, 80%, 65%)" />
            <stop offset="100%" stopColor="hsl(217, 100%, 70%)" />
          </linearGradient>
          
          <radialGradient id="glowCenter">
            <stop offset="0%" stopColor="hsl(217, 100%, 70%)" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="hsl(270, 80%, 70%)" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0"/>
          </radialGradient>
          
          {/* Enhanced blur filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation={glow} result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation={glow * 1.5} result="coloredBlur"/>
            <feColorMatrix in="coloredBlur" type="matrix" values="
              1.5 0 0 0 0
              0 1.5 0 0 0
              0 0 2 0 0
              0 0 0 1 0"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Wave distortion */}
          <filter id="wave">
            <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" result="turbulence">
              <animate attributeName="baseFrequency" 
                values="0.015;0.025;0.015" 
                dur={`${speed}s`} 
                repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale={complexity} />
          </filter>
        </defs>

        {/* Glowing background */}
        <motion.circle
          cx="150"
          cy="150"
          r="120"
          fill="url(#glowCenter)"
          animate={{ 
            scale: isSpeaking ? [1, 1.15, 1] : [1, 1.08, 1],
            opacity: isSpeaking ? [0.6, 0.9, 0.6] : [0.4, 0.6, 0.4]
          }}
          transition={{ duration: speed * 0.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main animated rings */}
        <motion.g
          animate={{ rotate: rotation * 360 }}
          transition={{ duration: speed * 5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "150px 150px" }}
        >
          {/* Primary gradient ring */}
          <motion.circle
            cx="150"
            cy="150"
            r="85"
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="4"
            filter="url(#strongGlow)"
            opacity="1"
            strokeDasharray="20 10"
            animate={{ 
              strokeWidth: isSpeaking ? [4, 6, 4] : [3, 5, 3],
              r: isSpeaking ? [85, 88, 85] : [85, 87, 85],
              strokeDashoffset: [0, 100]
            }}
            transition={{ 
              strokeWidth: { duration: speed * 0.6, repeat: Infinity, ease: "easeInOut" },
              r: { duration: speed * 0.6, repeat: Infinity, ease: "easeInOut" },
              strokeDashoffset: { duration: speed * 2, repeat: Infinity, ease: "linear" }
            }}
          />

          {/* Accent gradient ring (counter-rotating) */}
          <motion.circle
            cx="150"
            cy="150"
            r="85"
            fill="none"
            stroke="url(#accentGradient)"
            strokeWidth="3"
            filter="url(#glow)"
            opacity="0.9"
            animate={{ 
              strokeWidth: isSpeaking ? [3, 5, 3] : [2, 4, 2],
              rotate: [360, 0]
            }}
            transition={{ 
              strokeWidth: { duration: speed * 0.7, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: speed * 4, repeat: Infinity, ease: "linear" }
            }}
            style={{ transformOrigin: "150px 150px" }}
          />

          {/* Wavy outer ring */}
          <motion.circle
            cx="150"
            cy="150"
            r="92"
            fill="none"
            stroke="hsl(217, 100%, 70%)"
            strokeWidth="2"
            filter="url(#wave)"
            opacity="0.7"
            animate={{ 
              opacity: isSpeaking ? [0.7, 1, 0.7] : [0.5, 0.7, 0.5]
            }}
            transition={{ duration: speed * 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Inner pulsing core */}
        <motion.circle
          cx="150"
          cy="150"
          r="25"
          fill="url(#primaryGradient)"
          filter="url(#strongGlow)"
          animate={{ 
            scale: isSpeaking ? [1, 1.3, 1] : isThinking ? [1, 1.15, 1] : [1, 1.1, 1],
            opacity: isSpeaking ? [0.8, 1, 0.8] : isThinking ? [0.6, 0.8, 0.6] : [0.5, 0.7, 0.5]
          }}
          transition={{ duration: speed * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Thinking state - animated orbit dots */}
        {isThinking && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "150px 150px" }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const x = 150 + 50 * Math.cos((angle * Math.PI) / 180);
              const y = 150 + 50 * Math.sin((angle * Math.PI) / 180);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="hsl(217, 100%, 70%)"
                  filter="url(#glow)"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.3, 0.8],
                    r: [3, 5, 3]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </motion.g>
        )}

        {/* Speaking state - energy particles */}
        {isSpeaking && (
          <>
            {[0, 90, 180, 270].map((angle, i) => {
              const x = 150 + 60 * Math.cos((angle * Math.PI) / 180);
              const y = 150 + 60 * Math.sin((angle * Math.PI) / 180);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="hsl(280, 80%, 65%)"
                  filter="url(#strongGlow)"
                  animate={{ 
                    scale: [1, 1.8, 1],
                    opacity: [0.8, 0.3, 0.8],
                    cx: [x, 150 + 70 * Math.cos((angle * Math.PI) / 180), x],
                    cy: [y, 150 + 70 * Math.sin((angle * Math.PI) / 180), y]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
}
