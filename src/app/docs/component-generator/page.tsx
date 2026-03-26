'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  HelpCircle,
  Download,
  FileCode2,
  Paintbrush,
  Package,
  Info,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/kibo-ui/dropzone';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/prisma-ui';

const REGISTRY_TYPES = [
  'registry:ui',
  'registry:component',
  'registry:block',
  'registry:hook',
  'registry:lib',
] as const;

// ---------------------------------------------------------------------------
// Zod Schema
// ---------------------------------------------------------------------------

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Must be kebab-case (e.g. "my-button")',
    ),
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  type: z.enum(REGISTRY_TYPES),
  dependencies: z.string().optional(),
  devDependencies: z.string().optional(),
  registryDependencies: z.string().optional(),
  cssVars: z.string().optional(),
  categories: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse comma-separated string into trimmed, non-empty array or undefined */
function parseList(value?: string): string[] | undefined {
  if (!value?.trim()) return undefined;
  const items = value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
}

/** Read a File as text, returns a Promise<string> */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/** Trigger JSON file download in the browser */
function downloadJson(data: Record<string, unknown>, filename: string) {
  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// FieldLabel – label + tooltip badge
// ---------------------------------------------------------------------------

function FieldLabel({
  htmlFor,
  label,
  tip,
  required,
}: {
  htmlFor: string;
  label: string;
  tip: string;
  required?: boolean;
}): React.ReactNode {
  return (
    <div className='flex items-center gap-2'>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className='text-destructive ml-0.5'>*</span>}
      </Label>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant='outline'
            size='icon'
            className='cursor-help text-muted-foreground hover:text-foreground'
          >
            <HelpCircle className='size-3' />
          </Badge>
        </TooltipTrigger>
        <TooltipContent side='right' className='max-w-xs'>
          {tip}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function DashboardPage(): React.ReactNode {
  const [componentFiles, setComponentFiles] = useState<File[]>();
  const [styleFiles, setStyleFiles] = useState<File[]>();
  const [componentError, setComponentError] = useState<string>();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      title: '',
      description: `A Prisma UI component. ${GITHUB_URL}`,
      author: 'Prisma UI',
      type: 'registry:ui',
      dependencies: '',
      devDependencies: '',
      registryDependencies: '',
      cssVars: '',
      categories: '',
    },
  });

  // -- File handlers --------------------------------------------------------

  const handleComponentDrop = useCallback((accepted: File[]) => {
    setComponentFiles(accepted);
    setComponentError(undefined);
  }, []);

  const handleStyleDrop = useCallback((accepted: File[]) => {
    setStyleFiles(accepted);
  }, []);

  // -- JSON generation ------------------------------------------------------

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (!componentFiles?.length) {
        setComponentError('A component file is required.');
        return;
      }

      setIsGenerating(true);

      try {
        const componentFile = componentFiles[0];
        const componentContent = await readFileAsText(componentFile);

        // Build files array
        const files: Record<string, unknown>[] = [
          {
            path: `ui/${componentFile.name}`,
            content: componentContent,
            type: data.type,
            target: `components/ui/${componentFile.name}`,
          },
        ];

        // Add style file if provided
        if (styleFiles?.length) {
          const styleContent = await readFileAsText(styleFiles[0]);
          files.push({
            path: 'ui/style.css',
            content: styleContent,
            type: data.type,
            target: 'components/ui/style.css',
          });
        }

        // Build final JSON, omitting empty optional fields
        const json: Record<string, unknown> = {
          $schema: 'https://ui.shadcn.com/schema/registry-item.json',
          name: data.name,
          type: data.type,
        };

        if (data.title?.trim()) json.title = data.title.trim();
        if (data.description?.trim())
          json.description = data.description.trim();
        if (data.author?.trim()) json.author = data.author.trim();

        const deps = parseList(data.dependencies);
        const devDeps = parseList(data.devDependencies);
        const registryDeps = parseList(data.registryDependencies);

        if (deps) json.dependencies = deps;
        if (devDeps) json.devDependencies = devDeps;
        if (registryDeps) json.registryDependencies = registryDeps;

        json.files = files;

        // CSS vars (parse as JSON if provided)
        if (data.cssVars?.trim()) {
          try {
            json.cssVars = JSON.parse(data.cssVars);
          } catch {
            // If invalid JSON, skip silently
          }
        }

        const cats = parseList(data.categories);
        if (cats) json.categories = cats;

        downloadJson(json, `${data.name}.json`);
      } finally {
        setIsGenerating(false);
      }
    },
    [componentFiles, styleFiles],
  );

  // -- Render ---------------------------------------------------------------

  return (
    <div className='mx-auto w-full max-w-3xl px-4 py-12'>
      <div className='mb-10 space-y-2'>
        <h1 className='font-display text-3xl font-bold tracking-tight'>
          Component JSON Generator
        </h1>
        <p className='text-muted-foreground text-base'>
          Generate a shadcn/ui-compatible registry JSON file for your custom
          component. Fill in the details below and download the JSON.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        {/* ==== Section 1 — Component Info ==== */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Info className='size-4' />
              Component Info
            </CardTitle>
            <CardDescription>
              Basic metadata for the registry entry.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            {/* Name */}
            <div className='space-y-2'>
              <FieldLabel
                htmlFor='name'
                label='Name'
                required
                tip='Unique identifier used by the CLI (e.g. "my-button"). Must be kebab-case.'
              />
              <Input
                id='name'
                placeholder='my-component'
                {...register('name')}
              />
              {errors.name && (
                <p className='text-destructive text-xs'>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Title */}
            {/* <div className='space-y-2'>
              <FieldLabel
                htmlFor='title'
                label='Title'
                tip='Human-readable display name shown in the registry. If left empty it will not be included.'
              />
              <Input
                id='title'
                placeholder='My Component'
                {...register('title')}
              />
            </div> */}

            {/* Description */}
            <div className='space-y-2'>
              <FieldLabel
                htmlFor='description'
                label='Description'
                tip='Brief description of what the component does. Pre-filled with a Prisma UI default.'
              />
              <Textarea
                id='description'
                rows={2}
                {...register('description')}
              />
            </div>

            {/* Author */}
            <div className='space-y-2'>
              <FieldLabel
                htmlFor='author'
                label='Author'
                tip='Component author. Recommended format: "name <url>".'
              />
              <Input
                id='author'
                placeholder='Prisma UI'
                {...register('author')}
              />
            </div>

            {/* Type */}
            <div className='space-y-2'>
              <FieldLabel
                htmlFor='type'
                label='Type'
                tip='Registry item type. Use "registry:ui" for most UI components. Other options: registry:component, registry:block, registry:hook, registry:lib.'
              />
              <select
                id='type'
                {...register('type')}
                className='flex h-9 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30'
              >
                {REGISTRY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* ==== Section 2 — File Uploads ==== */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <FileCode2 className='size-4' />
              File Uploads
            </CardTitle>
            <CardDescription>
              Upload the component source file and optional styles.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            {/* Component file */}
            <div className='space-y-2'>
              <FieldLabel
                htmlFor='componentFile'
                label='Component File'
                required
                tip='The main source file (.tsx, .ts, .jsx, .js). Its content will be embedded in the JSON.'
              />
              <Dropzone
                accept={{
                  'text/typescript': ['.tsx', '.ts'],
                  'text/javascript': ['.jsx', '.js'],
                }}
                maxFiles={1}
                src={componentFiles}
                onDrop={handleComponentDrop}
              >
                <DropzoneContent />
                <DropzoneEmptyState />
              </Dropzone>
              {componentFiles?.length ? (
                <button
                  type='button'
                  onClick={() => setComponentFiles(undefined)}
                  className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors'
                >
                  <X className='size-3' />
                  Remove file
                </button>
              ) : null}
              {componentError && (
                <p className='text-destructive text-xs'>{componentError}</p>
              )}
            </div>

            <Separator />

            {/* Style CSS */}
            <div className='space-y-2'>
              <FieldLabel
                htmlFor='styleFile'
                label='Style CSS'
                tip='Optional CSS file with custom styles, animations, or keyframes for the component.'
              />
              <Dropzone
                accept={{ 'text/css': ['.css'] }}
                maxFiles={1}
                src={styleFiles}
                onDrop={handleStyleDrop}
              >
                <DropzoneContent />
                <DropzoneEmptyState />
              </Dropzone>
              {styleFiles?.length ? (
                <button
                  type='button'
                  onClick={() => setStyleFiles(undefined)}
                  className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors'
                >
                  <X className='size-3' />
                  Remove file
                </button>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* ==== Section 3 — Dependencies ==== */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Package className='size-4' />
              Dependencies
            </CardTitle>
            <CardDescription>
              Specify npm packages and shadcn/ui components your component
              depends on.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            {/* dependencies */}
            <div className='space-y-2'>
              <FieldLabel
                htmlFor='dependencies'
                label='Dependencies'
                tip='NPM runtime packages, comma-separated. E.g. "motion, @radix-ui/react-dialog".'
              />
              <Input
                id='dependencies'
                placeholder='motion, @radix-ui/react-dialog'
                {...register('dependencies')}
              />
            </div>

            {/* devDependencies */}
            <div className='space-y-2'>
              <FieldLabel
                htmlFor='devDependencies'
                label='Dev Dependencies'
                tip='NPM development-only packages, comma-separated. E.g. "tailwindcss, tw-animate-css".'
              />
              <Input
                id='devDependencies'
                placeholder='tailwindcss'
                {...register('devDependencies')}
              />
            </div>

            {/* registryDependencies */}
            <div className='space-y-2'>
              <FieldLabel
                htmlFor='registryDependencies'
                label='Registry Dependencies'
                tip='Other shadcn/ui components this component uses internally, comma-separated. E.g. "button, card, tooltip".'
              />
              <Input
                id='registryDependencies'
                placeholder='button, card'
                {...register('registryDependencies')}
              />
            </div>
          </CardContent>
        </Card>

        {/* ==== Section 4 — Advanced (collapsible) ==== */}
        <Card>
          <CardHeader>
            <button
              type='button'
              onClick={() => setShowAdvanced((v) => !v)}
              className='flex w-full items-center justify-between'
            >
              <CardTitle className='flex items-center gap-2'>
                <Paintbrush className='size-4' />
                Advanced Options
              </CardTitle>
              {showAdvanced ? (
                <ChevronUp className='size-4 text-muted-foreground' />
              ) : (
                <ChevronDown className='size-4 text-muted-foreground' />
              )}
            </button>
            <CardDescription>
              CSS variables and categorization. Expand if needed.
            </CardDescription>
          </CardHeader>

          {showAdvanced && (
            <CardContent className='space-y-5'>
              {/* cssVars */}
              <div className='space-y-2'>
                <FieldLabel
                  htmlFor='cssVars'
                  label='CSS Variables'
                  tip='Custom CSS variables as JSON. Keys: "light", "dark", "theme". E.g. {"light":{"--primary":"#000"},"dark":{"--primary":"#fff"}}'
                />
                <Textarea
                  id='cssVars'
                  rows={4}
                  placeholder='{"light": {}, "dark": {}, "theme": {}}'
                  className='font-mono text-xs'
                  {...register('cssVars')}
                />
              </div>

              {/* categories */}
              <div className='space-y-2'>
                <FieldLabel
                  htmlFor='categories'
                  label='Categories'
                  tip='Comma-separated categories for organizing the component. E.g. "forms, inputs, buttons".'
                />
                <Input
                  id='categories'
                  placeholder='forms, inputs'
                  {...register('categories')}
                />
              </div>
            </CardContent>
          )}
        </Card>

        {/* ==== Submit ==== */}
        <Button
          type='submit'
          size='lg'
          className='w-full'
          disabled={isGenerating}
          loading={isGenerating}
        >
          <Download className='size-4' />
          Generate &amp; Download JSON
        </Button>
      </form>
    </div>
  );
}
