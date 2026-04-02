import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/*
 * @author: @joao-carmassi
 * @description: Floating label input — the label floats above the input when focused or filled.
 * Uses a compound component pattern: FloatingLabel as root, .Input and .Label as children.
 * Compatible with shadcn Field component for descriptions, errors, and accessible form layouts.
 * @version: 2.1.0
 * @date: 2026-02-04
 * @license: MIT
 * @reference: https://shadcnui-expansions.typeart.cc/docs/floating-label-input
 */

function FloatingInput({
  className,
  ...props
}: React.ComponentProps<'input'>): React.ReactNode {
  return <Input placeholder=' ' className={cn('peer', className)} {...props} />;
}

function FloatingLabelText({
  className,
  ...props
}: React.ComponentProps<typeof Label>): React.ReactNode {
  return (
    <Label
      className={cn(
        'absolute inset-s-2 top-0.5 z-10 origin-left -translate-x-0.5 -translate-y-4 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-300',
        'peer-placeholder-shown:top-4.5 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
        'peer-focus:top-0.5 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-foreground',
        'cursor-text',
        className,
      )}
      {...props}
    />
  );
}

function FloatingLabelRoot({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>): React.ReactNode {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}
    </div>
  );
}

const FloatingLabel = Object.assign(FloatingLabelRoot, {
  Input: FloatingInput,
  Label: FloatingLabelText,
});

export { FloatingLabel };
