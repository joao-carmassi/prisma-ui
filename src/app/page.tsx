import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  RainbowBorder,
  rainbowCardClasses,
} from '@/components/ui/rainbow-border';
import { ShineBorder } from '@/components/ui/shine-border';
import Shader from '@/components/shader';
import { JsonLd } from '@/components/seo/json-ld';
import Link from 'next/link';
import {
  ArrowRight,
  Accessibility,
  Sparkles,
  Code2,
  Github,
  Package,
  Layers,
  Palette,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getGithubUrl, getSiteUrl } from '@/lib/env';
import type { SoftwareApplication, WithContext } from 'schema-dts';
import { TracingBeam } from '@/components/ui/tracing-beam';

const softwareAppSchema: WithContext<SoftwareApplication> = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Prisma UI',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description:
    'An advanced React component library built on Radix UI and Tailwind CSS. Accessible variants, animated effects, and typed APIs — production-ready.',
  url: getSiteUrl(),
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const features = [
  {
    icon: Accessibility,
    title: 'Accessible by default',
    description:
      'Built on Radix UI primitives — keyboard navigation, ARIA attributes, and focus management handled for you.',
  },
  {
    icon: Sparkles,
    title: 'Rich visual effects',
    description:
      'Shimmer, rainbow, pulsating, border-beam and more — expressive animations with zero configuration.',
  },
  {
    icon: Code2,
    title: 'Fully typed API',
    description:
      'Every prop, variant, and effect is typed with TypeScript. Better autocomplete, fewer bugs, faster builds.',
  },
];

const components = [
  {
    label: 'Variants',
    preview: (
      <div className='flex flex-wrap items-center gap-4 justify-center'>
        <Button size='sm'>Default</Button>
        <Button size='sm' variant='outline'>
          Outline
        </Button>
        <Button size='sm' variant='destructive'>
          Destructive
        </Button>
        <Button size='sm' variant='ghost'>
          Ghost
        </Button>
      </div>
    ),
  },
  {
    label: 'Sizes',
    preview: (
      <div className='flex flex-wrap items-center gap-4 justify-center'>
        <Button size='xs'>Extra Small</Button>
        <Button size='sm'>Small</Button>
        <Button>Medium</Button>
        <Button size='lg'>Large</Button>
      </div>
    ),
  },
  {
    label: 'Feedback',
    preview: (
      <div className='flex flex-wrap items-center gap-4 justify-center'>
        <Button loading size='sm' effect='ringHover'>
          Default
        </Button>
        <Button loading size='sm' variant='outline'>
          Outline
        </Button>
        <Button loading size='sm' variant='destructive'>
          Destructive
        </Button>
        <Button loading size='sm' variant='ghost'>
          Ghost
        </Button>
      </div>
    ),
  },
  {
    label: 'Effects',
    preview: (
      <div className='flex flex-wrap items-center gap-4 justify-center'>
        <Button size='sm' effect='pulsating'>
          Pulsating
        </Button>
        <Button size='sm' effect='rainbow' variant='outline'>
          Rainbow
        </Button>
        <Button size='sm' effect='shine' variant='ghost'>
          Shine
        </Button>
        <Button size='sm' effect='ringHover'>
          Ring Hover
        </Button>
      </div>
    ),
  },
];

const techStack = [
  { icon: Package, name: 'Radix UI', color: 'text-violet-400' },
  { icon: Layers, name: 'shadcn/ui', color: 'text-slate-300' },
  { icon: Palette, name: 'Tailwind CSS', color: 'text-cyan-400' },
  { icon: Zap, name: 'Next.js', color: 'text-white' },
  { icon: Code2, name: 'TypeScript', color: 'text-blue-400' },
];

export default function Home(): React.ReactNode {
  return (
    <main className='flex flex-col'>
      <JsonLd data={softwareAppSchema} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className='relative flex min-h-[calc(100svh-6.5rem)] flex-col items-center justify-center overflow-hidden bg-[#0a0a12] animate-in fade-in duration-1000 delay-500 fill-mode-both transition-opacity'>
        <Shader />

        {/* Dark radial gradient overlay so text reads clearly */}
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-radial-[ellipse_70%_60%_at_50%_50%] from-transparent via-transparent to-[#0a0a12]/80 pointer-events-none'
        />

        {/* Content */}
        <div className='relative z-10 flex flex-col items-center gap-6 px-4 text-center'>
          <Badge
            variant='outline'
            size='lg'
            className='border-violet-500/40 bg-violet-950/40 text-violet-300 backdrop-blur-sm'
            effect={'shine'}
          >
            v1.0.0 — Available now
          </Badge>

          <h1 className='font-display max-w-3xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl'>
            React components with{' '}
            <span className='bg-linear-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
              style and purpose
            </span>
          </h1>

          <p className='max-w-2xl text-base text-slate-300 sm:text-lg text-shadow-lg'>
            Prisma UI is an advanced component library built on top of Radix UI
            and Tailwind CSS. Variants, visual effects, icons, and loading
            states&nbsp;— all ready to use.
          </p>

          <div className='flex flex-wrap justify-center gap-4 pt-2'>
            <Link href='/docs'>
              <Button
                size='lg'
                effect='ringHover'
                className='bg-violet-600 hover:bg-violet-500 ring-violet-500! text-white border-0'
              >
                Get Started
                <ArrowRight />
              </Button>
            </Link>
            <a href={getGithubUrl()} target='_blank' rel='noopener noreferrer'>
              <Button
                effect='pulsating'
                variant='outline'
                size='lg'
                className='border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10'
              >
                <Github />
                GitHub
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom fade into the next section */}
        <div
          aria-hidden='true'
          className='absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-background pointer-events-none'
        />
      </section>

      <section className='px-4 py-28 grid place-items-center'>
        <TracingBeam>
          <article className='space-y-20'>
            <h2>Section One</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              nesciunt rerum quisquam, dolorum temporibus esse quis nemo
              adipisci impedit laudantium enim incidunt pariatur quia minima
              explicabo molestias earum. Perspiciatis, ipsa!
            </p>
            <h2>Section Two</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              nesciunt rerum quisquam, dolorum temporibus esse quis nemo
              adipisci impedit laudantium enim incidunt pariatur quia minima
              explicabo molestias earum. Perspiciatis, ipsa!
            </p>
            <h2>Section Three</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              nesciunt rerum quisquam, dolorum temporibus esse quis nemo
              adipisci impedit laudantium enim incidunt pariatur quia minima
              explicabo molestias earum. Perspiciatis, ipsa!
            </p>{' '}
          </article>
        </TracingBeam>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className='px-4 py-28'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-14 text-center'>
            <Badge variant='outline' className='mb-4'>
              Why Prisma UI
            </Badge>
            <h2 className='font-display text-3xl font-bold tracking-tight sm:text-4xl'>
              Everything you need, nothing you don&apos;t
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-muted-foreground'>
              Opinionated defaults that disappear when you need them to. Ship
              polished interfaces without wrestling with primitives.
            </p>
          </div>

          <div className='grid gap-6 sm:grid-cols-3'>
            {features.map(({ icon: Icon, title, description }, i) =>
              i === 1 ? (
                <Card
                  key={title}
                  className={cn('relative p-7 gap-0', rainbowCardClasses)}
                >
                  <RainbowBorder />
                  <CardContent className='p-0'>
                    <div className='mb-4 inline-flex rounded-xl border border-violet-500/20 bg-violet-500/10 p-3'>
                      <Icon
                        className='size-5 text-violet-400'
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className='font-display text-foreground mb-2 text-lg font-semibold'>
                      {title}
                    </h3>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {description}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card key={title} className='relative p-7 gap-0'>
                  <ShineBorder shineColor={['#a855f7', '#818cf8', '#22d3ee']} />
                  <CardContent className='p-0'>
                    <div className='mb-4 inline-flex rounded-xl border border-violet-500/20 bg-violet-500/10 p-3'>
                      <Icon
                        className='size-5 text-violet-400'
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className='font-display mb-2 text-lg font-semibold'>
                      {title}
                    </h3>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {description}
                    </p>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Component Showcase ────────────────────────────── */}
      <section className='bg-muted/30 px-4 py-28'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-14 text-center'>
            <Badge variant='outline' className='mb-4'>
              Component Library
            </Badge>
            <h2 className='font-display text-3xl font-bold tracking-tight sm:text-4xl'>
              Built to be used
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-muted-foreground'>
              Every component ships with thoughtful variants, sizes, and
              effects. Copy paste, customize, and ship.
            </p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            {components.map(({ label, preview }) => (
              <div
                key={label}
                className='rounded-2xl border border-border/60 bg-card p-6'
              >
                <div className='mb-4 flex items-center justify-between'>
                  <span className='font-display font-semibold'>{label}</span>
                </div>
                <div className='flex min-h-12 items-center'>{preview}</div>
              </div>
            ))}
          </div>

          <div className='mt-8 text-center'>
            <Link href='/docs'>
              <Button variant='outline' effect='hoverUnderline'>
                View all components
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────────── */}
      <section className='border-y border-border/40 px-4 py-16'>
        <div className='mx-auto max-w-6xl'>
          <p className='mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground'>
            Built with best-in-class tools
          </p>
          <div className='flex flex-wrap items-center justify-center gap-8 sm:gap-14'>
            {techStack.map(({ icon: Icon, name, color }) => (
              <div
                key={name}
                className='flex items-center gap-2 transition-opacity hover:opacity-70'
              >
                <Icon className={`size-5 ${color}`} strokeWidth={1.5} />
                <span className='font-display text-sm font-medium'>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className='relative overflow-hidden px-4 py-28'>
        {/* Subtle glowing accent */}
        <div
          aria-hidden='true'
          className='absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl'
        />
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
            Start building{' '}
            <span className='bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent'>
              today
            </span>
          </h2>
          <p className='mt-5 text-lg text-muted-foreground'>
            Open-source, MIT-licensed, and ready to drop into your Next.js
            project. No configuration required.
          </p>
          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <Link href='/docs'>
              <Button size='lg' effect='ringHover'>
                Read the docs
                <ArrowRight />
              </Button>
            </Link>
            <a href={getGithubUrl()} target='_blank' rel='noopener noreferrer'>
              <Button variant='outline' size='lg' effect='pulsating'>
                <Github />
                Star on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
