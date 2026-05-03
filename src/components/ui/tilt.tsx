'use client';

import { createContext, useContext, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import type { MotionStyle, MotionValue, SpringOptions } from 'motion/react';
import { cn } from '@/lib/utils';

interface TiltContextValue {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

const TiltContext = createContext<TiltContextValue | null>(null);

export function useTiltContext(): TiltContextValue | null {
  return useContext(TiltContext);
}

/*
 * @author: @joao-carmassi
 * @description: 3D tilt wrapper — applies a perspective tilt effect on mouse move.
 * Wrap any card or element. Great for interactive cards.
 * @version: 1.0.0
 * @date: 2026-31-03
 * @license: MIT
 * @reference: https://motion-primitives.com/docs/tilt
 */

interface TiltProps {
  /** Content to apply the tilt effect to. */
  children: React.ReactNode;
  /** Additional CSS classes. */
  className?: string;
  /** Additional motion styles. */
  style?: MotionStyle;
  /** Maximum rotation angle in degrees. */
  rotationFactor?: number;
  /** Reverse the tilt direction. */
  isReverse?: boolean;
  /** Spring animation configuration. */
  springOptions?: SpringOptions;
}

export function Tilt({
  children,
  className,
  style,
  rotationFactor = 15,
  isReverse = false,
  springOptions,
}: TiltProps): React.ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, springOptions);
  const ySpring = useSpring(y, springOptions);

  const rotateX = useTransform(
    ySpring,
    [-0.5, 0.5],
    isReverse
      ? [-rotationFactor, rotationFactor]
      : [rotationFactor, -rotationFactor],
  );

  const rotateY = useTransform(
    xSpring,
    [-0.5, 0.5],
    isReverse
      ? [rotationFactor, -rotationFactor]
      : [-rotationFactor, rotationFactor],
  );

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPos = mouseX / rect.width - 0.5;
    const yPos = mouseY / rect.height - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <TiltContext.Provider value={{ rotateX, rotateY }}>
      <motion.div
        ref={ref}
        className={cn(className)}
        style={{
          transformStyle: 'preserve-3d',
          ...style,
          transform,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    </TiltContext.Provider>
  );
}
