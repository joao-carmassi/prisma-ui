'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';

/*
 * @author: @joao-carmassi
 * @description: Layered progressive blur effect using gradient masks and backdrop-filter.
 *               Great for fading content edges on images and hero sections.
 * @version: 1.0.0
 * @date: 2026-31-03
 * @license: MIT
 * @reference: https://motion-primitives.com/docs/progressive-blur
 */

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const;

interface ProgressiveBlurProps extends Omit<
  HTMLMotionProps<'div'>,
  'children'
> {
  /** Direction the blur fades towards. */
  direction?: keyof typeof GRADIENT_ANGLES;
  /** Number of blur layers (min 2). */
  blurLayers?: number;
  /** Additional class names. */
  className?: string;
  /** Blur intensity multiplier per layer. */
  blurIntensity?: number;
}

export function ProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  className,
  blurIntensity = 0.25,
  ...props
}: ProgressiveBlurProps): React.ReactNode {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div className={cn('relative', className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(', ')})`;

        return (
          <motion.div
            key={index}
            className='pointer-events-none absolute inset-0 rounded-[inherit]'
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${index * blurIntensity}px)`,
            }}
            {...props}
          />
        );
      })}
    </div>
  );
}
