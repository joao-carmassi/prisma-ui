'use client';

import { AnimatePresence, motion } from 'motion/react';
import type { Transition, Variant, MotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: Animated panel that transitions between content with enter/exit animations.
 *               Perfect for step-based card flows, onboarding, or any sequential content.
 * @version: 1.0.0
 * @date: 2026-31-03
 * @license: MIT
 * @reference: https://motion-primitives.com/docs/transition-panel
 */

interface TransitionPanelProps extends Omit<
  MotionProps,
  'children' | 'transition'
> {
  /** Array of content elements to transition between. */
  children: React.ReactNode[];
  /** Optional CSS class for the panel container. */
  className?: string;
  /** Transition settings from motion to control the animation. */
  transition?: Transition;
  /** The index of the currently active child element to display. */
  activeIndex: number;
  /** Variants for enter, center, and exit animation states. */
  variants?: { enter: Variant; center: Variant; exit: Variant };
}

export function TransitionPanel({
  children,
  className,
  transition,
  variants,
  activeIndex,
  ...motionProps
}: TransitionPanelProps): React.ReactNode {
  return (
    <div className={cn('relative', className)}>
      <AnimatePresence
        initial={false}
        mode='popLayout'
        custom={motionProps.custom}
      >
        <motion.div
          key={activeIndex}
          variants={variants}
          transition={transition}
          initial='enter'
          animate='center'
          exit='exit'
          {...motionProps}
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
