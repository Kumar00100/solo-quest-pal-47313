import { motion } from 'framer-motion';

interface AssistantAvatarProps {
  isSpeaking?: boolean;
  isListening?: boolean;
}

export function AssistantAvatar({ 
  isSpeaking = false,
  isListening = false,
}: AssistantAvatarProps) {
  // Create wave animation
  const getWaveAmplitude = () => {
    if (isSpeaking) return 50;
    if (isListening) return 20;
    return 8;
  };

  const getAnimationSpeed = () => {
    if (isSpeaking) return 1.2;
    if (isListening) return 1.8;
    return 2.5;
  };

  const amplitude = getWaveAmplitude();
  const speed = getAnimationSpeed();

  return (
    <div className="relative mx-auto w-fit py-8">
      <svg width="300" height="120" viewBox="0 0 300 120" className="relative">
        {/* Background wave - Yellow/Gold */}
        <motion.path
          d="M 0 60 Q 20 60 40 60 T 80 60 T 120 60 T 160 60 T 200 60 T 240 60 T 280 60 L 300 60"
          fill="none"
          stroke="hsl(45, 90%, 60%)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
          animate={{
            d: [
              `M 0 60 Q 20 ${60 - amplitude} 40 60 T 80 60 T 120 60 T 160 60 T 200 60 T 240 60 T 280 60 L 300 60`,
              `M 0 60 Q 20 60 40 60 T 80 ${60 + amplitude} T 120 60 T 160 ${60 - amplitude} T 200 60 T 240 ${60 + amplitude} T 280 60 L 300 60`,
              `M 0 60 Q 20 ${60 + amplitude} 40 60 T 80 60 T 120 ${60 - amplitude} T 160 60 T 200 ${60 + amplitude} T 240 60 T 280 ${60 - amplitude} L 300 60`,
              `M 0 60 Q 20 60 40 60 T 80 ${60 - amplitude} T 120 60 T 160 60 T 200 ${60 - amplitude} T 240 60 T 280 60 L 300 60`,
            ],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle wave - White/Gray */}
        <motion.path
          d="M 0 60 Q 20 60 40 60 T 80 60 T 120 60 T 160 60 T 200 60 T 240 60 T 280 60 L 300 60"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
          animate={{
            d: [
              `M 0 60 Q 20 60 40 60 T 80 ${60 - amplitude * 0.8} T 120 60 T 160 60 T 200 ${60 + amplitude * 0.8} T 240 60 T 280 60 L 300 60`,
              `M 0 60 Q 20 ${60 + amplitude * 0.8} 40 60 T 80 60 T 120 ${60 - amplitude * 0.8} T 160 60 T 200 60 T 240 ${60 + amplitude * 0.8} T 280 60 L 300 60`,
              `M 0 60 Q 20 60 40 60 T 80 ${60 + amplitude * 0.8} T 120 60 T 160 ${60 - amplitude * 0.8} T 200 60 T 240 60 T 280 ${60 + amplitude * 0.8} L 300 60`,
              `M 0 60 Q 20 ${60 - amplitude * 0.8} 40 60 T 80 60 T 120 ${60 + amplitude * 0.8} T 160 60 T 200 ${60 - amplitude * 0.8} T 240 60 T 280 60 L 300 60`,
            ],
          }}
          transition={{
            duration: speed * 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />

        {/* Front wave - Pink/Red */}
        <motion.path
          d="M 0 60 Q 20 60 40 60 T 80 60 T 120 60 T 160 60 T 200 60 T 240 60 T 280 60 L 300 60"
          fill="none"
          stroke="hsl(350, 80%, 65%)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
          animate={{
            d: [
              `M 0 60 Q 20 60 40 60 T 80 60 T 120 ${60 + amplitude} T 160 60 T 200 60 T 240 ${60 - amplitude} T 280 60 L 300 60`,
              `M 0 60 Q 20 ${60 - amplitude} 40 60 T 80 ${60 + amplitude} T 120 60 T 160 ${60 - amplitude} T 200 60 T 240 60 T 280 ${60 + amplitude} L 300 60`,
              `M 0 60 Q 20 ${60 + amplitude} 40 60 T 80 60 T 120 ${60 - amplitude} T 160 60 T 200 ${60 + amplitude} T 240 60 T 280 60 L 300 60`,
              `M 0 60 Q 20 60 40 60 T 80 ${60 - amplitude} T 120 60 T 160 ${60 + amplitude} T 200 60 T 240 ${60 + amplitude} T 280 60 L 300 60`,
            ],
          }}
          transition={{
            duration: speed * 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />

        {/* Glow effects */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
