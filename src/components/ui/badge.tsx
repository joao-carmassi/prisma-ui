import './style.css';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

/*
 * @author: @joao-carmassi
 * @description: Enhanced badge component with multiple variants, sizes, and visual effects
 * @version: 1.0.0
 * @date: 2026-08-03
 * @license: MIT
 * @website: https://joao-carmassi.github.io/enhanced-button-v4/
 * @github: https://github.com/joao-carmassi/enhanced-button-v4
 */

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
        outline:
          'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 [a&]:hover:underline',
      },
      effect: {
        shine:
          'before:animate-shine relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat',
        pulsating: 'animate-button-pulsating',
        rainbow:
          'relative animate-rainbow hover:brightness-110 border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,oklch(66.2%_0.225_25.9),oklch(90.7%_0.231_133),oklch(69.6%_0.165_251),oklch(80.2%_0.134_225),oklch(60.4%_0.26_302))] bg-[length:200%] text-primary-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.125rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,oklch(66.2%_0.225_25.9),oklch(90.7%_0.231_133),oklch(69.6%_0.165_251),oklch(80.2%_0.134_225),oklch(60.4%_0.26_302))] before:[filter:blur(0.75rem)] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,oklch(66.2%_0.225_25.9),oklch(90.7%_0.231_133),oklch(69.6%_0.165_251),oklch(80.2%_0.134_225),oklch(60.4%_0.26_302))]',
      },
      size: {
        default: 'px-2 py-0.5 text-xs [&>svg]:size-3',
        lg: 'px-3 py-1 text-sm [&>svg]:size-4',
        icon: 'size-5 [&>svg]:size-3',
        'icon-lg': 'size-7 [&>svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Badge({
  className,
  variant = 'default',
  size = 'default',
  effect,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot='badge'
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size, effect }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
