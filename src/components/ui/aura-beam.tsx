'use client';

import './style.css';

import { useCallback, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: Unified ambient glow wrapper with aura, beam, shine, and glow variants.
 * - variant="aura" (default): diffuse rotating conic-gradient halo.
 * - variant="beam": focused narrow arc of light that travels around the border.
 * - variant="shine": sweeping radial-gradient highlight that glides across the border.
 * - variant="glow": cursor-proximity glow that follows the pointer along the border.
 * All variants share the same high-quality blur/glow layers.
 * @version: 3.1.0
 * @date: 2026-07-27
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
   * - "glow": cursor-proximity glow that follows the pointer along the border
   */
  variant?: 'aura' | 'beam' | 'shine' | 'glow';
  /**
   * Animation cycle duration in seconds. For `variant="glow"` it only sets the
   * length of the `animated` intro sweep (the hover reaction is pointer-driven).
   * @default 6
   */
  duration?: number;
  /**
   * Border glow color(s).
   * - string: single solid color
   * - string[]: gradient for beam ([from, to]), multi-stop for shine,
   *   up to three stops for glow ([from, to, third])
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
  /**
   * `variant="glow"` only — how close (in px) the pointer must be to an edge
   * for the glow to reach full strength. Counts from either side of the edge,
   * so the glow also lights up as the cursor approaches from outside.
   * @default 90
   */
  edgeSensitivity?: number;
  /**
   * `variant="glow"` only — radius (in px) of the radial gradient along the
   * border, i.e. how wide the glow spreads around the pointer.
   * @default 140
   */
  coneSpread?: number;
  /**
   * `variant="glow"` only — brightness multiplier (0.1 – 3.0).
   * @default 1
   */
  glowIntensity?: number;
  /**
   * `variant="glow"` only — play a one-shot sweep around the border on mount.
   * @default false
   */
  animated?: boolean;
  children: React.ReactNode;
}

/** Projects a [0,1] progress value to a (x,y) point along the element perimeter. */
function getBorderPosition(t: number, w: number, h: number): [number, number] {
  const perimeter = 2 * (w + h);
  const pos = t * perimeter;
  if (pos <= w) return [pos, 0];
  if (pos <= w + h) return [w, pos - w];
  if (pos <= 2 * w + h) return [w - (pos - w - h), h];
  return [0, h - (pos - 2 * w - h)];
}

export function AuraEffect({
  variant,
  duration,
  color,
  borderWidth,
  radius,
  edgeSensitivity = 90,
  coneSpread = 140,
  glowIntensity = 1,
  animated = false,
  className,
  style,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: AuraEffectProps): React.ReactNode {
  const isGlow = variant === 'glow';
  const rootRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<number | null>(null);
  const isSweepingRef = useRef(false);

  const cssVars = {} as React.CSSProperties & Record<string, string>;

  if (duration !== undefined) cssVars['--aura-duration'] = `${duration}s`;
  if (borderWidth !== undefined) cssVars['--aura-padding'] = `${borderWidth}px`;
  if (radius !== undefined) cssVars['--aura-radius'] = radius;
  if (isGlow) cssVars['--aura-cone'] = `${coneSpread}px`;

  const colors = Array.isArray(color) ? color : color ? [color] : [];
  if (colors.length > 0) {
    cssVars['--aura-color'] = colors[0];
    cssVars['--aura-color-from'] = colors[0];
    cssVars['--aura-color-to'] = colors[1] ?? colors[0];
    if (colors.length > 2) cssVars['--aura-color-third'] = colors[2];
  }

  const shineInline: React.CSSProperties =
    variant === 'shine' && colors.length > 1
      ? {
          backgroundImage: `radial-gradient(transparent, transparent, ${colors.join(', ')}, transparent, transparent)`,
        }
      : {};

  /* Write straight to the DOM — no re-render per mouse event. */
  const applyGlow = useCallback(
    (x: number, y: number, opacity: number) => {
      const el = rootRef.current;
      if (!el) return;
      el.style.setProperty('--aura-x', `${x}px`);
      el.style.setProperty('--aura-y', `${y}px`);
      el.style.setProperty(
        '--aura-glow-opacity',
        String(Math.min(Math.max(opacity, 0), 1)),
      );
    },
    [],
  );

  const hideGlow = useCallback(() => {
    rootRef.current?.style.setProperty('--aura-glow-opacity', '0');
  }, []);

  /* Intro sweep: orbit the glow around the perimeter once. */
  useEffect(() => {
    if (!isGlow || !animated || !rootRef.current) return;

    const el = rootRef.current;
    isSweepingRef.current = true;
    let start: number | null = null;
    const sweepDuration = (duration ?? 1.6) * 1000;

    const sweep = (timestamp: number) => {
      if (!isSweepingRef.current) return;
      if (!start) start = timestamp;
      const t = Math.min((timestamp - start) / sweepDuration, 1);
      const { width, height } = el.getBoundingClientRect();
      const [px, py] = getBorderPosition(t, width, height);
      applyGlow(px, py, Math.sin(t * Math.PI) * glowIntensity);

      if (t < 1) {
        sweepRef.current = requestAnimationFrame(sweep);
      } else {
        hideGlow();
        isSweepingRef.current = false;
      }
    };

    sweepRef.current = requestAnimationFrame(sweep);
    return () => {
      if (sweepRef.current) cancelAnimationFrame(sweepRef.current);
      isSweepingRef.current = false;
    };
  }, [isGlow, animated, duration, glowIntensity, applyGlow, hideGlow]);

  /* Pointer tracking on the document so the glow also reacts from outside the card. */
  useEffect(() => {
    if (!isGlow) return;

    const onPointerMove = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el || isSweepingRef.current) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Nearest point of the card box — where the light sits on the border.
      const cx = Math.min(Math.max(x, 0), rect.width);
      const cy = Math.min(Math.max(y, 0), rect.height);

      const inside = x === cx && y === cy;
      const distToEdge = inside
        ? Math.min(x, rect.width - x, y, rect.height - y)
        : Math.hypot(x - cx, y - cy);

      const proximity = Math.max(
        0,
        1 - distToEdge / Math.max(edgeSensitivity, 1),
      );

      if (proximity <= 0) {
        hideGlow();
        return;
      }
      applyGlow(cx, cy, proximity * glowIntensity);
    };

    const onPointerLeaveWindow = () => {
      if (!isSweepingRef.current) hideGlow();
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeaveWindow);
    window.addEventListener('blur', onPointerLeaveWindow);
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeaveWindow);
      window.removeEventListener('blur', onPointerLeaveWindow);
    };
  }, [isGlow, edgeSensitivity, glowIntensity, applyGlow, hideGlow]);

  return (
    <div
      ref={rootRef}
      className={cn('aura-beam', className)}
      data-variant={variant ?? 'aura'}
      style={{ ...cssVars, ...shineInline, ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
