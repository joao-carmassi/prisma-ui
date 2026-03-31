import { useId } from 'react';
import type { ReactElement } from 'react';
import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: Backlight glow effect for images, videos, and SVGs.
 * Uses an SVG filter to create a saturated blur glow behind the content.
 * @version: 1.0.0
 * @date: 2026-31-03
 * @license: MIT
 * @reference: https://magicui.design/docs/components/backlight
 */

interface BacklightProps {
  /** The image, video, or SVG element to apply the backlight to. */
  children?: ReactElement;
  /** Additional class names for the wrapper. */
  className?: string;
  /** Blur intensity of the backlight glow. */
  blur?: number;
}

export function Backlight({
  blur = 20,
  children,
  className,
}: BacklightProps): React.ReactNode {
  const id = useId();

  return (
    <div className={cn(className)}>
      <svg width='0' height='0' aria-hidden='true'>
        <filter id={id} y='-50%' x='-50%' width='200%' height='200%'>
          <feGaussianBlur
            in='SourceGraphic'
            stdDeviation={blur}
            result='blurred'
          />
          <feColorMatrix type='saturate' in='blurred' values='4' />
          <feComposite in='SourceGraphic' operator='over' />
        </filter>
      </svg>

      <div style={{ filter: `url(#${id})` }}>{children}</div>
    </div>
  );
}
