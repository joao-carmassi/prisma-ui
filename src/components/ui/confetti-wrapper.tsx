'use client';

import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { Slot } from 'radix-ui';
import confetti from 'canvas-confetti';

/*
 * @author: @joao-carmassi
 * @description: A wrapper component that adds confetti animation to its children when clicked. The confetti launches from the center of the clicked element.
 * @version: 1.0.0
 * @date: 2026-24-03
 * @license: MIT
 * @reference: https://magicui.design/docs/components/confetti
 */

interface ConfettiWrapperProps {
  /** Angle (in degrees) at which confetti launches. 90 = straight up. */
  angle?: number;
  /** Number of confetti particles to fire. */
  count?: number;
  children: ReactNode;
}

export const ConfettiWrapper = ({
  angle = 90,
  count = 80,
  children,
}: ConfettiWrapperProps): React.ReactNode => {
  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      await confetti({
        particleCount: count,
        angle,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      });
    },
    [angle, count],
  );

  return <Slot.Root onClick={handleClick}>{children}</Slot.Root>;
};
