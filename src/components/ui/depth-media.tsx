'use client';

import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { useMotionValue, useTransform, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTiltContext } from '@/components/ui/tilt';

/*
 * @author: @joao-carmassi
 * @description: 3D depth effect for images inside a Tilt card.
 * Renders the image across three parallax layers (background, mid-shadow, foreground)
 * that respond to the parent Tilt's rotation, creating a real parallax depth effect.
 * Works as a standalone component too — falls back gracefully without a Tilt parent.
 * @version: 1.1.0
 * @date: 2026-02-05
 * @license: MIT
 */

interface DepthMediaProps extends Omit<
  ImageProps,
  'src' | 'alt' | 'fill' | 'className'
> {
  /** Image URL to apply the depth effect to. */
  src: string;
  /** Alt text for the foreground (accessible) image. */
  alt?: string;
  /** Additional CSS classes for the container. */
  className?: string;
  /**
   * Controls the parallax intensity — higher values produce more pronounced layer separation.
   * @default 8
   */
  depthIntensity?: number;
}

/**
 * DepthMedia
 *
 * Wraps a single image URL in three layered planes that each shift at a different
 * rate when the parent Tilt card rotates. The result is a real parallax depth illusion:
 * the foreground "pops" forward while the background recedes.
 *
 * Place it inside a positioned container (e.g. `relative h-48`) so `fill` images work.
 */
export function DepthMedia({
  src,
  alt = '',
  className,
  depthIntensity = 8,
  ...imageProps
}: DepthMediaProps): React.ReactNode {
  const tilt = useTiltContext();

  // Fallback MotionValues used when not inside a Tilt (always zero → no parallax)
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  const rotateX = tilt?.rotateX ?? fallbackY;
  const rotateY = tilt?.rotateY ?? fallbackX;

  // Foreground: shifts toward the hovered corner (correct parallax direction)
  const fgX = useTransform(rotateY, (v) => -v * (depthIntensity / 10));
  const fgY = useTransform(rotateX, (v) => v * (depthIntensity / 10));

  // Overscale: grow the layer so void never peeks through when shifting.
  const fgScale = 1 + depthIntensity * 0.016;

  return (
    <div className={cn('relative size-full overflow-hidden', className)}>
      {/* ── Layer 1: Foreground — sharp, elevated, shifts with tilt ── */}
      <motion.div
        className='absolute inset-0 z-10 rounded-[inherit]'
        style={{
          x: fgX,
          y: fgY,
          scale: fgScale,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className='rounded-[inherit] object-cover'
          {...imageProps}
        />
      </motion.div>

      {/* ── Layer 2: Vignette + bottom depth edge — above image ── */}
      <div
        className='pointer-events-none absolute inset-0 z-20 rounded-[inherit]'
        aria-hidden
      />

      {/* ── Layer 3: Inner-edge shadow — frames the depth ── */}
      <div
        className='pointer-events-none absolute inset-0 z-30 rounded-[inherit]'
        style={{ boxShadow: 'inset 0 0 18px rgba(0,0,0,0.18)' }}
        aria-hidden
      />
    </div>
  );
}
