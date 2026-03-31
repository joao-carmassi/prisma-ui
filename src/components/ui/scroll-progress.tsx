'use client';

import { motion, useScroll } from 'motion/react';
import type { MotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: Animated scroll progress bar — a thin gradient line at the top of the page
 * that scales with scroll position.
 * @version: 1.0.0
 * @date: 2026-31-03
 * @license: MIT
 * @reference: https://magicui.design/docs/components/scroll-progress
 */

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
  ref?: React.Ref<HTMLDivElement>;
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps): React.ReactNode {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]',
        className,
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
}
