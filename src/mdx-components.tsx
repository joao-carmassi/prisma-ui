/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'; // nextra-theme-blog or your custom theme
import { ComponentPreview } from '@/components/docs/component-preview';

// Get the default MDX components
const themeComponents = getThemeComponents();

// Merge components
export function useMDXComponents(components: any) {
  return {
    ...themeComponents,
    ComponentPreview,
    ...components,
  };
}
