'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { Transition } from 'motion/react';

/*
 * @author: @joao-carmassi
 * @description: Customizable glow effect with multiple animation modes (rotate, pulse, breathe, etc.).
 *               Render inside any element with `relative` and `overflow-hidden`.
 * @version: 1.0.0
 * @date: 2026-31-03
 * @license: MIT
 * @reference: https://motion-primitives.com/docs/glow-effect
 */

interface GlowEffectProps {
  /** Additional CSS classes. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Colors for the glow gradient. */
  colors?: string[];
  /** Animation mode. */
  mode?:
    | 'rotate'
    | 'pulse'
    | 'breathe'
    | 'colorShift'
    | 'flowHorizontal'
    | 'static';
  /** Blur intensity — preset name or pixel number. */
  blur?:
    | number
    | 'softest'
    | 'soft'
    | 'medium'
    | 'strong'
    | 'stronger'
    | 'strongest'
    | 'none';
  /** Motion transition config override. */
  transition?: Transition;
  /** Scale of the glow effect. */
  scale?: number;
  /** Duration of one animation cycle in seconds. */
  duration?: number;
}

export function GlowEffect({
  className,
  style,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'rotate',
  blur = 'medium',
  transition,
  scale = 1,
  duration = 5,
}: GlowEffectProps): React.ReactNode {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration,
    ease: 'linear' as const,
  };

  const animations: Record<string, object> = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(', ')})`,
      ],
      transition: { ...(transition ?? BASE_TRANSITION) },
    },
    pulse: {
      background: colors.map(
        (color) =>
          `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`,
      ),
      scale: [1 * scale, 1.1 * scale, 1 * scale],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        ...(transition ?? { ...BASE_TRANSITION, repeatType: 'mirror' }),
      },
    },
    breathe: {
      background: [
        ...colors.map(
          (color) =>
            `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`,
        ),
      ],
      scale: [1 * scale, 1.05 * scale, 1 * scale],
      transition: {
        ...(transition ?? { ...BASE_TRANSITION, repeatType: 'mirror' }),
      },
    },
    colorShift: {
      background: colors.map((color, index) => {
        const nextColor = colors[(index + 1) % colors.length];
        return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
      }),
      transition: {
        ...(transition ?? { ...BASE_TRANSITION, repeatType: 'mirror' }),
      },
    },
    flowHorizontal: {
      background: colors.map((color) => {
        const nextColor = colors[(colors.indexOf(color) + 1) % colors.length];
        return `linear-gradient(to right, ${color}, ${nextColor})`;
      }),
      transition: {
        ...(transition ?? { ...BASE_TRANSITION, repeatType: 'mirror' }),
      },
    },
    static: {
      background: `linear-gradient(to right, ${colors.join(', ')})`,
    },
  };

  const getBlurClass = (blurValue: GlowEffectProps['blur']): string => {
    if (typeof blurValue === 'number') {
      return `blur-[${blurValue}px]`;
    }

    const presets: Record<string, string> = {
      softest: 'blur-xs',
      soft: 'blur-sm',
      medium: 'blur-md',
      strong: 'blur-lg',
      stronger: 'blur-xl',
      strongest: 'blur-2xl',
      none: 'blur-none',
    };

    return presets[blurValue as string] ?? 'blur-md';
  };

  return (
    <motion.div
      style={
        {
          ...style,
          '--scale': scale,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        } as React.CSSProperties
      }
      animate={animations[mode] as import('motion/react').TargetAndTransition}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        'scale-(--scale) transform-gpu',
        getBlurClass(blur),
        className,
      )}
    />
  );
}
