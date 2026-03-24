import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getGithubUrl } from '@/lib/env';

export default function Home(): React.ReactNode {
  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100svh-4rem)]'>
      {/* Hero */}
      <section className='flex flex-col items-center gap-6 px-4 py-24 text-center'>
        <Badge variant='outline' size='lg'>
          v1.0.0 — Available now
        </Badge>

        <h1 className='max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl'>
          React components with{' '}
          <span className='bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
            style and purpose
          </span>
        </h1>

        <p className='max-w-2xl text-lg text-muted-foreground'>
          Prisma UI is an advanced component library built on top of Radix UI
          and Tailwind CSS. Variants, visual effects, icons, and loading states
          — all ready to use.
        </p>

        <div className='flex gap-4'>
          <Link href='/docs'>
            <Button size='lg' effect='ringHover'>
              Documentation
              <ArrowRight />
            </Button>
          </Link>
          <a href={getGithubUrl()} target='_blank' rel='noopener noreferrer'>
            <Button effect={'shineHover'} variant='outline' size='lg'>
              GitHub
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
