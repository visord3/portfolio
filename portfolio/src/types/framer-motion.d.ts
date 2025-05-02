declare module 'framer-motion' {
  import * as React from 'react';

  export interface MotionProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    initial?: any;
    animate?: any;
    exit?: any;
    variants?: any;
    transition?: {
      duration?: number;
      ease?: string | number[];
      delay?: number;
      repeat?: number;
      repeatType?: "loop" | "reverse" | "mirror";
      repeatDelay?: number;
      staggerChildren?: number;
      staggerDirection?: number;
      when?: string;
    };
    whileHover?: any;
    whileTap?: any;
    drag?: boolean;
    dragConstraints?: any;
    dragElastic?: number;
    dragMomentum?: boolean;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    onTap?: () => void;
    onTapStart?: () => void;
    onTapCancel?: () => void;
    onAnimationStart?: () => void;
    onAnimationComplete?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onMouseMove?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
  }

  export interface Variants {
    [key: string]: {
      [key: string]: any;
      transition?: {
        duration?: number;
        ease?: string | number[];
        delay?: number;
        repeat?: number;
        repeatType?: "loop" | "reverse" | "mirror";
        repeatDelay?: number;
        staggerChildren?: number;
        staggerDirection?: number;
        when?: string;
      };
    };
  }

  export const motion: {
    [key: string]: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<any>>;
  };

  export function useAnimation(): {
    start: (variant: string) => Promise<void>;
    stop: () => void;
    set: (values: any) => void;
  };
} 