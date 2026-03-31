'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import type { Transition } from 'motion/react';
import { Children, cloneElement, useState, useId } from 'react';
import type { ReactElement } from 'react';

/*
 * @author: @joao-carmassi
 * @description: Highlights selected items by sliding a background into view on hover or click.
 *               Each child must have a unique `data-id` attribute. Ideal for tabs, menus, or card grids.
 * @version: 1.0.0
 * @date: 2026-31-03
 * @license: MIT
 * @reference: https://motion-primitives.com/docs/animated-background
 */

interface ChildProps {
  'data-id': string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface AnimatedBackgroundProps {
  /** Children must include a `data-id` string attribute. */
  children:
    | ReactElement<{ 'data-id': string }>[]
    | ReactElement<{ 'data-id': string }>;
  /** Default active item identifier. */
  defaultValue?: string;
  /** Callback when the active item changes. */
  onValueChange?: (newActiveId: string | null) => void;
  /** Class applied to the animated background element. */
  className?: string;
  /** Motion transition config. */
  transition?: Transition;
  /** Enable hover-based activation instead of click. */
  enableHover?: boolean;
}

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps): React.ReactNode {
  const [activeId, setActiveId] = useState<string | null>(defaultValue ?? null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  return Children.map(children, (child, index) => {
    const el = child as ReactElement<ChildProps>;
    const id = el.props['data-id'];

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : {
          onClick: () => handleSetActiveId(id),
        };

    return cloneElement(
      el,
      {
        key: index,
        className: cn('relative inline-flex', el.props.className),
        'data-checked': activeId === id ? 'true' : 'false',
        ...interactionProps,
      } as Partial<ChildProps>,
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn('absolute inset-0', className)}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <div className='z-10'>{el.props.children}</div>
      </>,
    );
  });
}
