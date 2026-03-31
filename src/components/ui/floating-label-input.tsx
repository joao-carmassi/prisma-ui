import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/*
 * @author: @joao-carmassi
 * @description: Floating label input — the label floats above the input when focused or filled.
 *               Uses a compound component pattern: FloatingLabel as root, .Input and .Label as children.
 * @version: 2.0.0
 * @date: 2026-31-03
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
        'absolute inset-s-2 top-0.5 z-10 origin-left -translate-y-4 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-300',
        'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
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
}: React.ComponentProps<'fieldset'>): React.ReactNode {
  return (
    <fieldset className={cn('relative', className)} {...props}>
      {children}
    </fieldset>
  );
}

const FloatingLabel = Object.assign(FloatingLabelRoot, {
  Input: FloatingInput,
  Label: FloatingLabelText,
});

export { FloatingLabel };
