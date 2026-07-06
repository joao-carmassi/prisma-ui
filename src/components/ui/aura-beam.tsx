import './style.css';

import * as React from 'react';

import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: Ambient aura wrapper that projects a conic-gradient glow around any component.
 * Wrap any Card (or element) with <AuraBeam> to get a diffuse, rotating light effect inspired by daisyUI's Aura.
 * Combine with .aura-beam-rainbow, .aura-beam-holo, and .aura-beam-glow modifier classes.
 * @version: 1.0.0
 * @date: 2026-06-07
 * @license: MIT
 */

interface AuraBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to wrap with the aura effect.
   */
  children: React.ReactNode;
}

export function AuraBeam({
  className,
  children,
  ...props
}: AuraBeamProps): React.ReactNode {
  return (
    <div className={cn('aura-beam', className)} {...props}>
      {children}
    </div>
  );
}
