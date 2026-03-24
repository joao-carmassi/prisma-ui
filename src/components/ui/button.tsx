import './style.css';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

/*
 * @author: @joao-carmassi
 * @description: Enhanced button component with multiple variants, sizes, visual effects, icon support, and loading state
 * @version: 1.0.0
 * @date: 2026-22-02
 * @license: MIT
 * @website: https://joao-carmassi.github.io/enhanced-button-v4/
 * @github: https://github.com/joao-carmassi/enhanced-button-v4
 */

interface IconProps {
  icon: React.ComponentType<Record<string, never>>;
  iconPlacement: 'left' | 'right';
}

interface IconRefProps {
  icon?: never;
  iconPlacement?: undefined;
}

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export type ButtonIconProps = IconProps | IconRefProps;

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/80 hover:ring-primary/90',
        destructive:
          'border-none bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 hover:ring-destructive/40',
        outline:
          'border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 hover:ring-muted',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground hover:ring-secondary/90',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 hover:ring-accent/90',
        link: 'text-primary underline-offset-4 hover:underline hover:ring-primary/90',
      },
      effect: {
        expandIcon: 'group gap-0 relative',
        ringHover:
          'transition-all duration-300 hover:ring-2 hover:ring-offset-2 ring-offset-background',
        shine:
          'before:animate-shine relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat',
        shineHover:
          'relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] before:duration-1000',
        gooeyRight:
          'relative z-0 overflow-hidden duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r before:from-white/40 before:transition-transform before:duration-1000  hover:before:translate-x-[0%] hover:before:translate-y-[0%]',
        gooeyLeft:
          'relative z-0 overflow-hidden duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l after:from-white/40 after:transition-transform after:duration-1000  hover:after:translate-x-[0%] hover:after:translate-y-[0%]',
        underline:
          'relative !no-underline after:absolute after:bg-primary after:bottom-1.5 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300',
        hoverUnderline:
          'relative !no-underline after:absolute after:bg-primary after:bottom-1.5 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300',
        pulsating: 'animate-button-pulsating',
        rainbow:
          'relative animate-rainbow hover:brightness-110 hover:text-card border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,oklch(66.2%_0.225_25.9),oklch(90.7%_0.231_133),oklch(69.6%_0.165_251),oklch(80.2%_0.134_225),oklch(60.4%_0.26_302))] bg-[length:200%] text-primary-foreground ![background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.125rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,oklch(66.2%_0.225_25.9),oklch(90.7%_0.231_133),oklch(69.6%_0.165_251),oklch(80.2%_0.134_225),oklch(60.4%_0.26_302))] before:[filter:blur(0.75rem)] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,oklch(66.2%_0.225_25.9),oklch(90.7%_0.231_133),oklch(69.6%_0.165_251),oklch(80.2%_0.134_225),oklch(60.4%_0.26_302))]',
      },
      size: {
        default:
          'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-9',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  effect,
  icon: Icon,
  iconPlacement,
  asChild = false,
  loading = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> &
  ButtonIconProps & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';
  const isIconSize = size?.startsWith('icon');

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonVariants({ variant, effect, size, className }),
        effect === 'expandIcon' && (loading ? 'gap-2' : 'gap-0'),
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {!loading &&
        Icon &&
        iconPlacement === 'left' &&
        (effect === 'expandIcon' ? (
          <div className='w-0 overflow-hidden translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-6 group-hover:translate-x-0 group-hover:pr-2 group-hover:opacity-100'>
            <Icon />
          </div>
        ) : (
          <Icon />
        ))}
      {!(loading && isIconSize) && (
        <Slot.Slottable>{props.children}</Slot.Slottable>
      )}
      {loading && <Spinner />}
      {!loading &&
        Icon &&
        iconPlacement === 'right' &&
        (effect === 'expandIcon' ? (
          <div className='w-0 overflow-hidden translate-x-full pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1.5 group-hover:opacity-100'>
            <Icon />
          </div>
        ) : (
          <Icon />
        ))}
    </Comp>
  );
}

export { Button, buttonVariants };
