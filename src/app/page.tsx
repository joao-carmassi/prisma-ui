import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Sparkles, Palette, Zap } from 'lucide-react';

export default function Home(): React.ReactNode {
  return (
    <main className='flex flex-col items-center'>
      {/* Hero */}
      <section className='flex flex-col items-center gap-6 px-4 py-24 text-center'>
        <Badge variant='outline' size='lg'>
          v1.0.0 — Disponível agora
        </Badge>

        <h1 className='max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl'>
          Componentes React com{' '}
          <span className='bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
            estilo e propósito
          </span>
        </h1>

        <p className='max-w-2xl text-lg text-muted-foreground'>
          Prisma UI é uma biblioteca de componentes avançados construída sobre
          Radix UI e Tailwind CSS. Variantes, efeitos visuais, ícones e estados
          de carregamento — tudo pronto para usar.
        </p>

        <div className='flex gap-4'>
          <Link href='/docs/button'>
            <Button size='lg' effect='ringHover'>
              Documentação
              <ArrowRight />
            </Button>
          </Link>
          <a
            href='https://github.com/joao-carmassi'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button variant='outline' size='lg'>
              GitHub
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section className='grid w-full max-w-5xl grid-cols-1 gap-6 px-4 pb-24 sm:grid-cols-3'>
        <div className='flex flex-col gap-3 rounded-lg border p-6'>
          <Palette className='size-8 text-purple-500' />
          <h3 className='text-lg font-semibold'>Variantes ricas</h3>
          <p className='text-sm text-muted-foreground'>
            Default, destructive, outline, secondary, ghost e link. Cada
            componente com variantes pensadas para cobrir todos os cenários.
          </p>
        </div>

        <div className='flex flex-col gap-3 rounded-lg border p-6'>
          <Sparkles className='size-8 text-pink-500' />
          <h3 className='text-lg font-semibold'>Efeitos visuais</h3>
          <p className='text-sm text-muted-foreground'>
            Shine, rainbow, gooey, pulsating, underline e mais. Efeitos CSS
            puros, sem JavaScript extra.
          </p>
        </div>

        <div className='flex flex-col gap-3 rounded-lg border p-6'>
          <Zap className='size-8 text-yellow-500' />
          <h3 className='text-lg font-semibold'>Acessível e leve</h3>
          <p className='text-sm text-muted-foreground'>
            Construído sobre Radix UI para acessibilidade nativa. Totalmente
            tipado com TypeScript e tree-shakeable.
          </p>
        </div>
      </section>

      {/* Component preview */}
      <section className='flex w-full max-w-5xl flex-col gap-8 px-4 pb-24'>
        <h2 className='text-center text-3xl font-bold'>Veja em ação</h2>

        <div className='flex flex-wrap items-center justify-center gap-4 rounded-lg border p-8'>
          <Button variant='default'>Default</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='link'>Link</Button>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-4 rounded-lg border p-8'>
          <Button effect='shine'>Shine</Button>
          <Button effect='ringHover'>Ring Hover</Button>
          <Button effect='shineHover'>Shine Hover</Button>
          <Button effect='pulsating'>Pulsating</Button>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-4 rounded-lg border p-8'>
          <Badge>Default</Badge>
          <Badge variant='secondary'>Secondary</Badge>
          <Badge variant='destructive'>Destructive</Badge>
          <Badge variant='outline'>Outline</Badge>
          <Badge effect='shine'>Shine</Badge>
          <Badge effect='rainbow'>Rainbow</Badge>
        </div>
      </section>
    </main>
  );
}
