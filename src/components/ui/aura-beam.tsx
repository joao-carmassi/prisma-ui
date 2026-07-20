import './style.css';

import * as React from 'react';

import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: Unified ambient glow wrapper with aura, beam, and shine variants.
 * - variant="aura" (default): diffuse rotating conic-gradient halo.
 * - variant="beam": focused narrow arc of light that travels around the border.
 * - variant="shine": sweeping radial-gradient highlight that glides across the border.
 * All variants share the same high-quality blur/glow layers.
 * @version: 3.0.0
 * @date: 2026-07-20
 * @license: MIT
 */

interface AuraEffectProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'color'
> {
  /**
   * Visual variant of the effect.
   * - "aura" (default): diffuse rotating conic-gradient halo
   * - "beam": focused narrow arc that continuously travels along the border
   * - "shine": sweeping radial-gradient highlight that passes across the border
   */
  variant?: 'aura' | 'beam' | 'shine';
  /**
   * Animation cycle duration in seconds.
   * @default 6
   */
  duration?: number;
  /**
   * Border glow color(s).
   * - string: single solid color
   * - string[]: gradient for beam ([from, to]) or multi-stop for shine
   * @default "hsl(var(--primary))"
   */
  color?: string | string[];
  /**
   * Thickness of the glow border in pixels.
   * @default 2
   */
  borderWidth?: number;
  /**
   * Corner radius — should match the wrapped element.
   * @default "0.75rem"
   */
  radius?: string;
  children: React.ReactNode;
}

export function AuraEffect({
  variant,
  duration,
  color,
  borderWidth,
  radius,
  className,
  style,
  children,
  ...props
}: AuraEffectProps): React.ReactNode {
  const cssVars = {} as React.CSSProperties & Record<string, string>;

  if (duration !== undefined) cssVars['--aura-duration'] = `${duration}s`;
  if (borderWidth !== undefined) cssVars['--aura-padding'] = `${borderWidth}px`;
  if (radius !== undefined) cssVars['--aura-radius'] = radius;

  const colors = Array.isArray(color) ? color : color ? [color] : [];
  if (colors.length > 0) {
    cssVars['--aura-color'] = colors[0];
    cssVars['--aura-color-from'] = colors[0];
    cssVars['--aura-color-to'] = colors[1] ?? colors[0];
  }

  const shineInline: React.CSSProperties =
    variant === 'shine' && colors.length > 1
      ? {
          backgroundImage: `radial-gradient(transparent, transparent, ${colors.join(', ')}, transparent, transparent)`,
        }
      : {};

  return (
    <div
      className={cn('aura-beam', className)}
      data-variant={variant ?? 'aura'}
      style={{ ...cssVars, ...shineInline, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
