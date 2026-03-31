'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: A beam that traces an SVG path, always positioned at the viewport center
 *               within the container. Wraps page content with a left-side animated beam.
 * @version: 1.1.0
 * @date: 2026-31-03
 * @license: MIT
 * @reference: https://ui.aceternity.com/components/tracing-beam
 */

interface TracingBeamProps {
  /** The page content to render alongside the beam. */
  children: React.ReactNode;
  /** Additional CSS classes. */
  className?: string;
}

export function TracingBeam({
  children,
  className,
}: TracingBeamProps): React.ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const containerTopRef = useRef(0);

  // Measure content height
  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // Track container's distance from the page top so we can compute relative position
  useEffect(() => {
    const updateTop = () => {
      if (containerRef.current) {
        containerTopRef.current =
          containerRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };
    updateTop();
    window.addEventListener('resize', updateTop);
    return () => window.removeEventListener('resize', updateTop);
  }, [svgHeight]);

  const { scrollY } = useScroll();

  // Map global scrollY to the beam's Y position within the SVG:
  // beam center = viewport center position relative to container top
  const beamPosition = useTransform(scrollY, (v) => {
    const viewportCenter = v + window.innerHeight * 0.5;
    const relativePos = viewportCenter - containerTopRef.current;
    return Math.max(50, Math.min(svgHeight - 50, relativePos));
  });

  const y1 = useSpring(beamPosition, { stiffness: 800, damping: 80 });
  const y2 = useTransform(y1, (v) => v + 200);

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative mx-auto h-full w-full max-w-4xl', className)}
    >
      <div className='absolute top-3 -left-4 md:-left-20'>
        <div className='ml-6.75 flex h-4 w-4 items-center justify-center rounded-full border border-neutral-200 shadow-sm'>
          <div className='h-2 w-2 rounded-full border border-emerald-600 bg-emerald-500' />
        </div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width='20'
          height={svgHeight}
          className='ml-4 block'
          aria-hidden='true'
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill='none'
            stroke='#9091A0'
            strokeOpacity='0.16'
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill='none'
            stroke='url(#gradient)'
            strokeWidth='1.25'
            className='motion-reduce:hidden'
          />
          <defs>
            <motion.linearGradient
              id='gradient'
              gradientUnits='userSpaceOnUse'
              x1='0'
              x2='0'
              y1={y1}
              y2={y2}
            >
              <stop stopColor='#18CCFC' stopOpacity='0' />
              <stop stopColor='#18CCFC' />
              <stop offset='0.325' stopColor='#6344F5' />
              <stop offset='1' stopColor='#AE48FF' stopOpacity='0' />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
