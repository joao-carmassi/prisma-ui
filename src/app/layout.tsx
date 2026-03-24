import type { Metadata } from 'next';
import { Geist, Geist_Mono, Syne } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { getDocsRepositoryBase, getGithubUrl, getSiteUrl } from '@/lib/env';
import { Banner, Head } from 'nextra/components';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import { JsonLd } from '@/components/seo/json-ld';
import type { Organization, WebSite, WithContext } from 'schema-dts';

interface RootLayoutProps {
  children: React.ReactNode;
}

const syne = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = getSiteUrl() || 'https://prisma-ui-xi.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Prisma UI — React Component Library',
    template: '%s | Prisma UI',
  },
  description:
    'An advanced React component library built on Radix UI and Tailwind CSS. Accessible variants, animated effects, and fully typed APIs — ready for production.',
  keywords: [
    'React',
    'component library',
    'UI components',
    'Radix UI',
    'Tailwind CSS',
    'Next.js',
    'TypeScript',
    'accessible',
    'animated',
    'shadcn',
  ],
  authors: [{ name: 'Prisma UI' }],
  creator: 'Prisma UI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Prisma UI',
    title: 'Prisma UI — React Component Library',
    description:
      'An advanced React component library built on Radix UI and Tailwind CSS. Accessible variants, animated effects, and fully typed APIs.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Prisma UI — React Component Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prisma UI — React Component Library',
    description:
      'Accessible, animated, and fully typed React components. Built on Radix UI and Tailwind CSS.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Prisma UI',
  url: siteUrl,
  description:
    'An advanced React component library built on Radix UI and Tailwind CSS.',
};

const orgSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Prisma UI',
  url: siteUrl,
  sameAs: [getGithubUrl()],
};

const banner = (
  <Banner storageKey='prisma-ui-banner'>
    Prisma UI - React component library
  </Banner>
);

const navbar = <Navbar logo={<b>Prisma UI</b>} projectLink={getGithubUrl()} />;
const footer = <Footer>MIT {new Date().getFullYear()} © Prisma UI.</Footer>;

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      dir='ltr'
      suppressHydrationWarning
      className={cn(
        'dark',
        syne.variable,
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <Head>
        <JsonLd data={websiteSchema} />
        <JsonLd data={orgSchema} />
      </Head>
      <body className='antialiased'>
        <TooltipProvider delayDuration={300}>
          <Layout
            banner={banner}
            navbar={navbar}
            pageMap={await getPageMap()}
            docsRepositoryBase={getDocsRepositoryBase()}
            footer={footer}
          >
            {children}
          </Layout>
        </TooltipProvider>
      </body>
    </html>
  );
}
