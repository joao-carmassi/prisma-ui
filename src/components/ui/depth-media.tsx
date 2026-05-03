'use client';

import Image from 'next/image';
import { useMotionValue, useTransform, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTiltContext } from '@/components/ui/tilt';

/*
 * @author: @joao-carmassi
 * @description: 3D depth effect for images inside a Tilt card.
 * Renders the image across three parallax layers (background, mid-shadow, foreground)
 * that respond to the parent Tilt's rotation, creating a real parallax depth effect.
 * Works as a standalone component too — falls back gracefully without a Tilt parent.
 * @version: 1.0.0
 * @date: 2026-02-05
 * @license: MIT
 */

interface DepthMediaProps {
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
}: DepthMediaProps): React.ReactNode {
  const tilt = useTiltContext();

  // Fallback MotionValues used when not inside a Tilt (always zero → no parallax)
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  const rotateX = tilt?.rotateX ?? fallbackY;
  const rotateY = tilt?.rotateY ?? fallbackX;

  // Foreground: shifts strongly (closer layer moves more in parallax)
  const fgX = useTransform(rotateY, (v) => v * -(depthIntensity / 10));
  const fgY = useTransform(rotateX, (v) => v * -(depthIntensity / 10));

  // Background: shifts slightly in the opposite direction (far layer barely moves)
  const bgX = useTransform(rotateY, (v) => v * (depthIntensity / 22));
  const bgY = useTransform(rotateX, (v) => v * (depthIntensity / 22));

  return (
    <div className={cn('relative size-full overflow-hidden', className)}>
      {/* ── Layer 1: Background — blurry, desaturated, barely moves ── */}
      <motion.div
        className='absolute inset-0'
        style={{ x: bgX, y: bgY, scale: 1.12 }}
        aria-hidden
      >
        <Image
          src={src}
          alt=''
          fill
          className='object-cover brightness-[0.72] contrast-[0.65] saturate-[0.75]'
          style={{ filter: 'blur(7px)' }}
        />
      </motion.div>

      {/* ── Layer 2: Mid vignette — fixed depth-shadow overlay ── */}
      <div
        className='pointer-events-none absolute inset-0 z-10 rounded-[inherit]'
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(0,0,0,0.28) 100%)',
        }}
        aria-hidden
      />

      {/* ── Layer 3: Foreground — sharp, elevated, shifts most ── */}
      <motion.div
        className='absolute inset-[5%] z-20 rounded-[inherit]'
        style={{
          x: fgX,
          y: fgY,
          filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.42))',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className='rounded-[inherit] object-cover'
        />
      </motion.div>

      {/* ── Layer 4: Inner-edge shadow — frames the depth ── */}
      <div
        className='pointer-events-none absolute inset-0 z-30 rounded-[inherit]'
        style={{ boxShadow: 'inset 0 0 18px rgba(0,0,0,0.22)' }}
        aria-hidden
      />
    </div>
  );
}
