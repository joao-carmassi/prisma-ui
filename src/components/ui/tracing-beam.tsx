'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: A beam that traces an SVG path as the user scrolls. The gradient
 *               follows the center of the viewport within the container.
 * @version: 1.2.0
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end start'],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 },
  );

  return (
    <motion.div
      ref={ref}
      className={cn('relative mx-auto h-full w-full max-w-4xl', className)}
    >
      <div className='absolute top-3 -left-4 md:-left-20'>
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? 'none'
                : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
          className='ml-6.75 flex h-4 w-4 items-center justify-center rounded-full border border-border shadow-sm'
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? 'white' : '#10b981',
              borderColor: scrollYProgress.get() > 0 ? 'white' : '#059669',
            }}
            className='h-2 w-2 rounded-full border border-border bg-background'
          />
        </motion.div>
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
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill='none'
            stroke='url(#gradient)'
            strokeWidth='1.25'
            className='motion-reduce:hidden'
            transition={{ duration: 10 }}
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
