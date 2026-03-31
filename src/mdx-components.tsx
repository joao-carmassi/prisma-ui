/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'; // nextra-theme-blog or your custom theme
import Image from 'next/image';
import { ComponentPreview } from '@/components/docs/component-preview';
import { CodeBlock } from '@/components/docs/code-block';
import {
  MdxTable,
  MdxThead,
  MdxTbody,
  MdxTr,
  MdxTh,
  MdxTd,
} from '@/components/docs/mdx-table';

// Get the default MDX components
const themeComponents = getThemeComponents();

// Merge components
export function useMDXComponents(components: any) {
  return {
    ...themeComponents,
    ComponentPreview,
    Image,
    pre: CodeBlock,
    table: MdxTable,
    thead: MdxThead,
    tbody: MdxTbody,
    tr: MdxTr,
    th: MdxTh,
    td: MdxTd,
    ...components,
  };
}
