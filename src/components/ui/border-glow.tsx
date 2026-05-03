'use client';

import { useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: Cursor-proximity border glow effect.
 * A glowing gradient follows the cursor along the card's border, visible only
 * when the pointer is near an edge. Supports directional cone spread, configurable
 * colors, and an optional intro sweep animation.
 * @version: 1.0.0
 * @date: 2026-02-05
 * @license: MIT
 * @reference: https://www.reactbits.dev/components/border-glow
 */

interface BorderGlowProps {
  /** Content rendered inside the card. */
  children: React.ReactNode;
  /** Additional CSS classes for the outer wrapper. */
  className?: string;
  /**
   * How close (in px) the pointer must be to an edge for the glow to appear.
   * @default 30
   */
  edgeSensitivity?: number;
  /**
   * Array of 3 hex colors for the gradient glow.
   * @default ['#c084fc', '#f472b6', '#38bdf8']
   */
  glowColors?: [string, string, string];
  /**
   * Corner radius in pixels — should match the Card's border-radius.
   * shadcn new-york Card uses 12px (rounded-xl).
   * @default 12
   */
  borderRadius?: number;
  /**
   * How far (in px) the outer glow spreads beyond the card edge.
   * @default 40
   */
  glowRadius?: number;
  /**
   * Multiplier for glow brightness (0.1 – 3.0).
   * @default 1
   */
  glowIntensity?: number;
  /**
   * Radius of the radial gradient along the border — controls "cone width".
   * Larger values produce a wider, softer spread. (5 – 200)
   * @default 100
   */
  coneSpread?: number;
  /**
   * Play a one-shot sweep animation around the border on mount.
   * @default false
   */
  animated?: boolean;
}

/** Projects a [0,1] progress value to a (x,y) point along the card perimeter. */
function getBorderPosition(t: number, w: number, h: number): [number, number] {
  const perimeter = 2 * (w + h);
  const pos = t * perimeter;
  if (pos <= w) return [pos, 0];
  if (pos <= w + h) return [w, pos - w];
  if (pos <= 2 * w + h) return [w - (pos - w - h), h];
  return [0, h - (pos - 2 * w - h)];
}

/**
 * BorderGlow
 *
 * A self-contained card wrapper that renders a colorful gradient glow on its
 * border, activated when the pointer approaches any edge. Wrap your content
 * with `<BorderGlow>` instead of (or alongside) a shadcn Card.
 *
 * @example
 * ```tsx
 * <BorderGlow className='w-72 p-6'>
 *   <h3>Hello</h3>
 * </BorderGlow>
 * ```
 */
export function BorderGlow({
  children,
  className,
  edgeSensitivity = 30,
  glowColors = ['#c084fc', '#f472b6', '#38bdf8'],
  borderRadius = 12,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 100,
  animated = false,
}: BorderGlowProps): React.ReactNode {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);
  const innerGlowRef = useRef<HTMLDivElement>(null);
  const outerGlowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<number | null>(null);
  const isSweepingRef = useRef(false);

  /** Directly update the DOM gradient and opacity — avoids React re-renders on every mouse event. */
  const applyGlow = useCallback(
    (x: number, y: number, opacity: number) => {
      const [c1, c2, c3] = glowColors;
      const r = coneSpread;

      // Thin crisp ring on the border
      if (borderGlowRef.current) {
        borderGlowRef.current.style.background = `radial-gradient(circle ${r}px at ${x}px ${y}px, ${c1}, ${c2}, ${c3}, transparent)`;
        borderGlowRef.current.style.opacity = String(Math.min(opacity, 1));
      }

      // Soft blurred glow that spreads visibly from the cursor position
      if (innerGlowRef.current) {
        innerGlowRef.current.style.background = `radial-gradient(circle ${r * 1.4}px at ${x}px ${y}px, ${c1}99, ${c2}77, ${c3}44, transparent 70%)`;
        innerGlowRef.current.style.opacity = String(Math.min(opacity * 0.85, 1));
      }

      if (outerGlowRef.current) {
        const ox = x + glowRadius;
        const oy = y + glowRadius;
        outerGlowRef.current.style.background = `radial-gradient(circle ${glowRadius * 1.8}px at ${ox}px ${oy}px, ${c1}55, ${c2}33, transparent)`;
        outerGlowRef.current.style.opacity = String(
          Math.min(opacity * 0.65, 1),
        );
      }
    },
    [glowColors, coneSpread, glowRadius],
  );

  const hideGlow = useCallback(() => {
    if (borderGlowRef.current) borderGlowRef.current.style.opacity = '0';
    if (innerGlowRef.current) innerGlowRef.current.style.opacity = '0';
    if (outerGlowRef.current) outerGlowRef.current.style.opacity = '0';
  }, []);

  /** Intro sweep: orbit the glow around the perimeter once. */
  useEffect(() => {
    if (!animated || !cardRef.current) return;

    isSweepingRef.current = true;
    const el = cardRef.current;
    let start: number | null = null;
    const duration = 1600;

    const sweep = (timestamp: number) => {
      if (!isSweepingRef.current) return;
      if (!start) start = timestamp;
      const t = Math.min((timestamp - start) / duration, 1);
      const { width, height } = el.getBoundingClientRect();
      const [px, py] = getBorderPosition(t, width, height);
      const fade = Math.sin(t * Math.PI) * glowIntensity;
      applyGlow(px, py, fade);

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
  }, [animated, glowIntensity, applyGlow, hideGlow]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || isSweepingRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const distToEdge = Math.min(
        x,
        rect.width - x,
        y,
        rect.height - y,
      );
      const proximity = Math.max(
        0,
        1 - distToEdge / Math.max(edgeSensitivity, 1),
      );
      applyGlow(x, y, proximity * glowIntensity);
    },
    [edgeSensitivity, glowIntensity, applyGlow],
  );

  const handleMouseLeave = useCallback(() => {
    if (!isSweepingRef.current) hideGlow();
  }, [hideGlow]);

  return (
    <div
      ref={cardRef}
      className={cn('relative', className)}
      style={{ borderRadius }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Outer ambient halo — behind the card, not clipped ── */}
      <div
        ref={outerGlowRef}
        aria-hidden
        className='pointer-events-none absolute -z-10'
        style={{
          inset: -glowRadius,
          borderRadius: borderRadius + glowRadius,
          opacity: 0,
          transition: 'opacity 0.18s ease',
          filter: `blur(${Math.round(glowRadius * 0.55)}px)`,
        }}
      />

      {/* ── Border glow ring — masked to 1px border, crisp colored line ── */}
      <div
        ref={borderGlowRef}
        aria-hidden
        className='pointer-events-none absolute inset-0 z-10'
        style={{
          borderRadius,
          opacity: 0,
          transition: 'opacity 0.18s ease',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* ── Inner soft glow — blurred, not masked, creates the visible light spread ── */}
      <div
        ref={innerGlowRef}
        aria-hidden
        className='pointer-events-none absolute inset-0 z-10'
        style={{
          borderRadius,
          opacity: 0,
          transition: 'opacity 0.18s ease',
          filter: 'blur(14px)',
        }}
      />

      {/* ── Card or any children ── */}
      {children}
    </div>
  );
}
