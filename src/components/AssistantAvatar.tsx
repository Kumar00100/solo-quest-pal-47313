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
          {/* Glowing gradient for the rings */}
          <radialGradient id="pinkGlow">
            <stop offset="0%" stopColor="hsl(320, 80%, 60%)" stopOpacity="1"/>
            <stop offset="100%" stopColor="hsl(320, 80%, 60%)" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="cyanGlow">
            <stop offset="0%" stopColor="hsl(180, 80%, 60%)" stopOpacity="1"/>
            <stop offset="100%" stopColor="hsl(180, 80%, 60%)" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="purpleGlow">
            <stop offset="0%" stopColor="hsl(270, 80%, 60%)" stopOpacity="1"/>
            <stop offset="100%" stopColor="hsl(270, 80%, 60%)" stopOpacity="0"/>
          </radialGradient>
          
          {/* Blur filters for glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation={glow} result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Turbulence for wave effect */}
          <filter id="wave">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="turbulence">
              <animate attributeName="baseFrequency" 
                values="0.02;0.03;0.02" 
                dur={`${speed}s`} 
                repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale={complexity} />
          </filter>
        </defs>

        {/* Outer glow circles */}
        <motion.circle
          cx="150"
          cy="150"
          r="100"
          fill="url(#pinkGlow)"
          opacity="0.3"
          filter="url(#glow)"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main animated rings with wave distortion */}
        <motion.g
          animate={{ rotate: rotation * 360 }}
          transition={{ duration: speed * 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "150px 150px" }}
        >
          {/* Pink ring */}
          <motion.circle
            cx="150"
            cy="150"
            r="90"
            fill="none"
            stroke="hsl(320, 80%, 60%)"
            strokeWidth="3"
            filter="url(#wave)"
            opacity="0.8"
            animate={{ 
              strokeWidth: isSpeaking ? [3, 5, 3] : [3, 4, 3],
              opacity: isSpeaking ? [0.8, 1, 0.8] : [0.6, 0.8, 0.6]
            }}
            transition={{ duration: speed * 0.7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Cyan ring */}
          <motion.circle
            cx="150"
            cy="150"
            r="90"
            fill="none"
            stroke="hsl(180, 80%, 60%)"
            strokeWidth="3"
            filter="url(#wave)"
            opacity="0.7"
            animate={{ 
              strokeWidth: isSpeaking ? [3, 5, 3] : [3, 4, 3],
              opacity: isSpeaking ? [0.7, 0.9, 0.7] : [0.5, 0.7, 0.5],
              rotate: [0, 120, 240, 360]
            }}
            transition={{ 
              strokeWidth: { duration: speed * 0.8, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: speed * 0.8, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: speed * 5, repeat: Infinity, ease: "linear" }
            }}
            style={{ transformOrigin: "150px 150px" }}
          />

          {/* Purple ring */}
          <motion.circle
            cx="150"
            cy="150"
            r="90"
            fill="none"
            stroke="hsl(270, 80%, 60%)"
            strokeWidth="3"
            filter="url(#wave)"
            opacity="0.6"
            animate={{ 
              strokeWidth: isSpeaking ? [3, 5, 3] : [3, 4, 3],
              opacity: isSpeaking ? [0.6, 0.8, 0.6] : [0.4, 0.6, 0.4],
              rotate: [0, -90, -180, -270, -360]
            }}
            transition={{ 
              strokeWidth: { duration: speed, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: speed, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: speed * 6, repeat: Infinity, ease: "linear" }
            }}
            style={{ transformOrigin: "150px 150px" }}
          />
        </motion.g>

        {/* Thinking state - rotating dots inside */}
        {isThinking && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "150px 150px" }}
          >
            {[0, 120, 240].map((angle, i) => {
              const x = 150 + 40 * Math.cos((angle * Math.PI) / 180);
              const y = 150 + 40 * Math.sin((angle * Math.PI) / 180);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="hsl(var(--foreground))"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </motion.g>
        )}

        {/* Speaking state - pulsing center */}
        {isSpeaking && (
          <motion.circle
            cx="150"
            cy="150"
            r="15"
            fill="hsl(var(--primary))"
            opacity="0.5"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}
