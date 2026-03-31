import { getSiteUrl } from '@/lib/env';
import type { MetadataRoute } from 'next';

const baseUrl = getSiteUrl();

const components = [
  'button',
  'badge',
  'border-beam-card',
  'confetti-wrapper',
  'flip-card',
  'rainbow-card',
  'shine-border-card',
  'transition-panel',
  'floating-label-input',
  'animated-background',
  'progressive-blur',
  'infinite-slider',
  'tilt-card',
  'magnetic',
  'scroll-progress',
  'backlight',
  'tracing-beam',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/component-generator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs/references`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...components.map((slug) => ({
      url: `${baseUrl}/docs/components/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
