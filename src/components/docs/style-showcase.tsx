import { ComponentPreview } from '@/components/docs/component-preview';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FloatingLabel } from '@/components/ui/floating-label-input';
import { Button as NovaButton } from '@/components/ui/styles/radix-nova/button';
import { Badge as NovaBadge } from '@/components/ui/styles/radix-nova/badge';
import { FloatingLabel as NovaFloatingLabel } from '@/components/ui/styles/radix-nova/floating-label-input';
import { Button as MaiaButton } from '@/components/ui/styles/radix-maia/button';
import { Badge as MaiaBadge } from '@/components/ui/styles/radix-maia/badge';
import { FloatingLabel as MaiaFloatingLabel } from '@/components/ui/styles/radix-maia/floating-label-input';
import { Button as LyraButton } from '@/components/ui/styles/radix-lyra/button';
import { Badge as LyraBadge } from '@/components/ui/styles/radix-lyra/badge';
import { FloatingLabel as LyraFloatingLabel } from '@/components/ui/styles/radix-lyra/floating-label-input';
import { Button as MiraButton } from '@/components/ui/styles/radix-mira/button';
import { Badge as MiraBadge } from '@/components/ui/styles/radix-mira/badge';
import { FloatingLabel as MiraFloatingLabel } from '@/components/ui/styles/radix-mira/floating-label-input';
import { Button as LumaButton } from '@/components/ui/styles/radix-luma/button';
import { Badge as LumaBadge } from '@/components/ui/styles/radix-luma/badge';
import { FloatingLabel as LumaFloatingLabel } from '@/components/ui/styles/radix-luma/floating-label-input';
import { Button as RheaButton } from '@/components/ui/styles/radix-rhea/button';
import { Badge as RheaBadge } from '@/components/ui/styles/radix-rhea/badge';
import { FloatingLabel as RheaFloatingLabel } from '@/components/ui/styles/radix-rhea/floating-label-input';
import { Button as SeraButton } from '@/components/ui/styles/radix-sera/button';
import { Badge as SeraBadge } from '@/components/ui/styles/radix-sera/badge';
import { FloatingLabel as SeraFloatingLabel } from '@/components/ui/styles/radix-sera/floating-label-input';

const styles = [
  { name: 'radix-vega', Button, Badge, FloatingLabel },
  {
    name: 'radix-nova',
    Button: NovaButton,
    Badge: NovaBadge,
    FloatingLabel: NovaFloatingLabel,
  },
  {
    name: 'radix-maia',
    Button: MaiaButton,
    Badge: MaiaBadge,
    FloatingLabel: MaiaFloatingLabel,
  },
  {
    name: 'radix-lyra',
    Button: LyraButton,
    Badge: LyraBadge,
    FloatingLabel: LyraFloatingLabel,
  },
  {
    name: 'radix-mira',
    Button: MiraButton,
    Badge: MiraBadge,
    FloatingLabel: MiraFloatingLabel,
  },
  {
    name: 'radix-luma',
    Button: LumaButton,
    Badge: LumaBadge,
    FloatingLabel: LumaFloatingLabel,
  },
  {
    name: 'radix-rhea',
    Button: RheaButton,
    Badge: RheaBadge,
    FloatingLabel: RheaFloatingLabel,
  },
  {
    name: 'radix-sera',
    Button: SeraButton,
    Badge: SeraBadge,
    FloatingLabel: SeraFloatingLabel,
  },
] as const;

interface StyleShowcaseProps {
  component: 'button' | 'badge' | 'floating-label-input';
}

export function StyleShowcase({
  component,
}: StyleShowcaseProps): React.ReactNode {
  return (
    <div className='flex flex-col'>
      {styles.map((s) => (
        <div key={s.name}>
          <span className='font-mono text-xs text-muted-foreground'>
            {s.name}
          </span>
          <ComponentPreview className='mt-1.5'>
            {component === 'button' && (
              <>
                <s.Button>Default</s.Button>
                <s.Button variant='outline'>Outline</s.Button>
                <s.Button variant='secondary' size='sm'>
                  Small
                </s.Button>
                <s.Button size='lg'>Large</s.Button>
              </>
            )}
            {component === 'badge' && (
              <>
                <s.Badge>Default</s.Badge>
                <s.Badge variant='outline'>Outline</s.Badge>
                <s.Badge variant='secondary' size='lg'>
                  Large
                </s.Badge>
              </>
            )}
            {component === 'floating-label-input' && (
              <div className='w-72'>
                <s.FloatingLabel>
                  <s.FloatingLabel.Input
                    className='bg-muted!'
                    id={`style-demo-${s.name}`}
                    type='email'
                  />
                  <s.FloatingLabel.Label
                    className='bg-muted'
                    htmlFor={`style-demo-${s.name}`}
                  >
                    Email
                  </s.FloatingLabel.Label>
                </s.FloatingLabel>
              </div>
            )}
          </ComponentPreview>
        </div>
      ))}
    </div>
  );
}
