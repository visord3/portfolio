import React, { useRef, useEffect, useCallback, useState } from 'react';
import LaserFlow from './LaserFlow';
import './Shuffle.css';

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  duration?: number;
  delay?: number;
  scrambleCharset?: string;
  triggerOnHover?: boolean;
  autoStart?: boolean; // New prop to control auto-start
  // LaserFlow integration props
  enableLaserFlow?: boolean;
  laserFlowColor?: string;
  laserFlowIntensity?: number;
  laserFlowProps?: {
    wispDensity?: number;
    horizontalBeamOffset?: number;
    verticalBeamOffset?: number;
    flowSpeed?: number;
    wispSpeed?: number;
    wispIntensity?: number;
  };
}

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  className = '',
  style = {},
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 2,        // Reduced default for quicker animation
  duration = 80,           // Much faster default
  delay = 0,
  scrambleCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*',
  triggerOnHover = true,
  autoStart = true,
  // LaserFlow props
  enableLaserFlow = false,
  laserFlowColor = '#4f46e5',
  laserFlowIntensity = 0.3,
  laserFlowProps = {}
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const shuffleText = useCallback((targetText: string, element: HTMLElement) => {
    if (!targetText || !element) return;

    // Clear any existing animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    setIsShuffling(true);
    
    const chars = targetText.split('');
    let iterations = 0;
    
    // 🚀 Quick animation settings
    const maxIterations = Math.max(6, chars.length * shuffleTimes); // Minimum 6 iterations
    const frameDuration = duration;

    console.log(`🎬 Starting quick shuffle: "${targetText}" - ${maxIterations} iterations, ${frameDuration}ms frames`);

    const animate = () => {
      if (iterations >= maxIterations) {
        // Animation complete
        element.textContent = targetText;
        setIsShuffling(false);
        onShuffleComplete?.();
        console.log(`✅ Shuffle complete: "${targetText}"`);
        return;
      }

      // Quick reveal logic - characters resolve faster
      const revealedText = chars.map((char, index) => {
        const charStartTime = (index / chars.length) * maxIterations * 0.3; // Faster start
        
        if (iterations > charStartTime) {
          // Much higher chance to resolve quickly
          const resolveChance = Math.min(1, (iterations - charStartTime) / shuffleTimes);
          
          if (Math.random() < resolveChance * 1.5) { // 1.5x higher chance
            return char;
          }
        }
        
        // Show scrambled character
        if (char === ' ') return ' ';
        return scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
      }).join('');

      element.textContent = revealedText;
      iterations++;

      animationRef.current = setTimeout(animate, frameDuration);
    };

    // Start animation with delay
    setTimeout(() => {
      animate();
    }, delay);

  }, [shuffleTimes, duration, delay, scrambleCharset, onShuffleComplete]);

  // Handle individual interaction for this specific element
  const handleInteraction = useCallback((e: Event) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!ref.current || !text || isShuffling) return;
    
    console.log(`🖱️ Individual interaction on: "${text}"`);
    shuffleText(text, ref.current);
  }, [text, shuffleText, isShuffling]);

  // Auto-start animation on mount (only once)
  useEffect(() => {
    if (!ref.current || !text || !autoStart || hasStarted) return;
    
    console.log(`🚀 Auto-starting: "${text}"`);
    setHasStarted(true);
    
    // Stagger the auto-start based on text content
    const autoDelay = text.includes('Evan') ? 500 : 1500;
    
    setTimeout(() => {
      if (ref.current) {
        shuffleText(text, ref.current);
      }
    }, autoDelay);
  }, [text, shuffleText, autoStart, hasStarted]);

  // Add event listeners for hover interaction
  useEffect(() => {
    const element = ref.current;
    if (!element || !triggerOnHover) return;

    // Only hover events - prevent touch events from interfering
    const events = ['mouseenter'];
    
    events.forEach(eventName => {
      element.addEventListener(eventName, handleInteraction, { passive: false });
    });

    return () => {
      events.forEach(eventName => {
        element.removeEventListener(eventName, handleInteraction);
      });
    };
  }, [handleInteraction, triggerOnHover]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const commonStyle: React.CSSProperties = { textAlign, ...style };
  const classes = `shuffle-parent ${isShuffling ? 'shuffling' : ''} ${className}`;
  const Tag = tag as React.ElementType;

  const textElement = React.createElement(Tag, {
    ref: ref as any,
    className: classes,
    style: { ...commonStyle, position: 'relative', zIndex: 2 }
  }, text);

  if (enableLaserFlow) {
    return (
      <div className="shuffle-container" style={{ position: 'relative', display: 'inline-block' }}>
        <div className="shuffle-laser-background" style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
          pointerEvents: 'none',
          opacity: laserFlowIntensity,
          zIndex: 1
        }}>
          <LaserFlow
            color={laserFlowColor}
            fogIntensity={laserFlowIntensity}
            horizontalBeamOffset={laserFlowProps.horizontalBeamOffset || 0.0}
            verticalBeamOffset={laserFlowProps.verticalBeamOffset || 0.2}
            flowSpeed={laserFlowProps.flowSpeed || 0.2}
            wispDensity={laserFlowProps.wispDensity || 1.0}
            wispSpeed={laserFlowProps.wispSpeed || 10.0}
            wispIntensity={laserFlowProps.wispIntensity || 3.0}
          />
        </div>
        {textElement}
      </div>
    );
  }

  return textElement;
};

export default Shuffle;
