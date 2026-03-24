import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { getDocsRepositoryBase, getGithubUrl } from '@/lib/env';
import { Banner, Head } from 'nextra/components';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Prisma UI',
  description:
    'A React component library with advanced variants, visual effects, and accessibility.',
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
      // Not required, but good for SEO
      lang='en'
      // Required to be set
      dir='ltr'
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
      className={cn('font-sans', inter.variable)}
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase={getDocsRepositoryBase()}
          footer={footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
