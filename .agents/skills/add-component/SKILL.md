---
name: add-component
description: Full workflow for adding a new component to Prisma UI or updating an existing one. Use this skill whenever someone asks to add, create, or update a component in this project. Covers component implementation, documentation, registry generation, README, and versioning. Also use when asked to "contribute a component", "create a new component", or "update component X".
---

# Add Component — Prisma UI

This skill drives the full lifecycle for shipping a component in the Prisma UI project, from source file to published documentation and registry entry.

## Key paths and scripts

| What                | Where                                     |
| ------------------- | ----------------------------------------- |
| Component source    | `src/components/ui/<name>.tsx`            |
| Docs page           | `src/app/docs/components/<name>/page.mdx` |
| Docs sidebar config | `src/app/docs/components/_meta.ts`        |
| Registry script     | `scripts/generate-registry.js`            |
| Generated JSON      | `public/components/<name>.json`           |
| Sitemap             | `src/app/sitemap.ts`                      |
| README              | `README.md`                               |
| Package version     | `package.json` → `version`                |

To regenerate all registry JSON files, run:

```bash
npm run build-components
```

---

## Project conventions

- **Framework**: Next.js with App Router, RSC enabled
- **Styling**: Tailwind CSS v4 with `@theme inline` blocks
- **Component lib**: shadcn/ui (`new-york` style)
- **Variants**: `class-variance-authority` (cva)
- **Animation**: `motion/react` (Framer Motion), CSS keyframes in `src/components/ui/style.css`
- **Icons**: `lucide-react`
- **Imports**: Use `@/` alias (e.g., `@/components/ui/button`, `@/lib/utils`)
- **React hooks**: Always import directly — `import { useState } from 'react'`, never `React.useState`
- **Return types**: React component functions always return `React.ReactNode`
- **Semantic colors**: Use design tokens (`bg-primary`, `text-muted-foreground`), never raw values like `bg-blue-500`
- **Spacing**: Use `flex` with `gap-*`, never `space-x-*` or `space-y-*`
- **Merge classes**: Always use `cn()` from `@/lib/utils` for conditional/merged class names
- **Default animation props**: When a component accepts `transition` or `variants` props (Framer Motion), always provide sensible defaults so the component works out of the box. Users should be able to override them, but should never be forced to pass them. For example:

```tsx
const DEFAULT_TRANSITION = { type: 'spring', bounce: 0, duration: 0.4 };
const DEFAULT_VARIANTS = {
  enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
};

export function MyPanel({ transition = DEFAULT_TRANSITION, variants = DEFAULT_VARIANTS, ...props }) { ... }
```

---

## Core rules

### 1. Every code block in docs MUST have a `<ComponentPreview>` above it

Every non-import code block in a `.mdx` doc page must be preceded by a `<ComponentPreview>` block showing the rendered result. This applies to all variant/size/prop sections.

**Pattern:**

````mdx
<ComponentPreview>
  <MyComponent variant='default'>Example</MyComponent>
</ComponentPreview>

```tsx
<MyComponent variant='default'>Example</MyComponent>
```
````

If the component requires `useState` or other interactivity for a demo, extract it into a `_demo-<variant>.tsx` client component next to the doc page and import it.

**Image placeholders**: When a component accepts or wraps images (e.g. `Backlight`, `ProgressiveBlur`, `InfiniteSlider`), always use [Lorem Picsum](https://picsum.photos) for preview images with Next.js `<Image>`. Slightly vary the dimensions between items to ensure different images are fetched:

```tsx
import Image from 'next/image';

<Image src='https://picsum.photos/320/200' alt='Demo' width={320} height={200} className='rounded-lg' />
<Image src='https://picsum.photos/322/204' alt='Demo 2' width={322} height={204} className='rounded-lg' />
<Image src='https://picsum.photos/324/200' alt='Demo 3' width={324} height={200} className='rounded-lg' />
```

Use these same URLs in the code block below the preview (not `/example.jpg` or `/your-image.jpg`), so copy-pasted code works immediately.

### 2. Preview blocks must contain ONLY the component

`<ComponentPreview>` should show **only** the component itself — no extra explanation, no wrapping layout, no boilerplate.

**Correct** — just the component:

```mdx
<ComponentPreview>
  <div className='relative h-64 w-full overflow-hidden rounded-lg'>
    <Image
      src='https://picsum.photos/800/256'
      alt='Demo'
      width={800}
      height={256}
      className='h-full w-full object-cover'
    />
    <ProgressiveBlur className='absolute inset-0' />
  </div>
</ComponentPreview>
```

Only add extra context (page structure, state logic) when it is **essential to explain a usage pattern**, such as:

- A layout-level component that wraps `{children}` (e.g. `ScrollProgress` in a layout)
- A stateful interactive demo (e.g. `TransitionPanel` with step navigation)

Never pad a preview with minimal placeholder content just to fill space.

### 3. Split icon/external imports into a separate code block

When a code example uses icons or third-party imports alongside the component, place the imports in their own code block **before** the usage block:

````mdx
```tsx
import { ArrowRight, ChevronRight, Mail } from 'lucide-react';
```

```tsx
<Button effect="expandIcon" icon={ArrowRight} iconPlacement="right">
  Continue
</Button>
<Button effect="expandIcon" icon={ChevronRight} iconPlacement="right" variant="outline">
  Next Step
</Button>
<Button effect="expandIcon" icon={Mail} iconPlacement="left">
  Send Email
</Button>
```
````

This keeps the usage block clean and copy-pasteable. The component's own import (shown in the `## Import` section) is never repeated in variant examples.

### 4. Always check shadcn FIRST

Before writing any new UI component, verify if shadcn/ui already provides it:

```bash
npx shadcn@latest add <name>
```

- If shadcn has it → **install it**, use as-is or wrap it (see rule 3)
- If shadcn has something similar → **install it and extend via wrapper**
- If nothing exists → create from scratch following project conventions

Always preserve shadcn's original styles and API. Only add functionality on top.

### 5. Prefer wrappers over modifying base components

When extending a shadcn component, **create a wrapper file** instead of editing the base:

```
src/components/ui/button.tsx          ← shadcn base (DO NOT modify for new features)
src/components/ui/card.tsx            ← shadcn base (DO NOT modify for new features)
src/components/ui/card-hover-effect.tsx  ← wrapper (add features here)
```

**Acceptable** reasons to edit a base component:

- Fixing a bug in the base component itself
- Syncing with a shadcn upstream update
- Purely structural change (adding a `data-slot` attribute, etc.)

---

## Decision: new component vs. update

Before starting, determine which path applies.

- **New component** → follow the "Full workflow" section below
- **Update to existing component** → follow the "Update workflow" section below

---

## Full workflow (new component)

Work through all steps in order.

### Step 1 — Check shadcn availability

```bash
npx shadcn@latest add <name>
```

If a matching component is installed, use it as-is or proceed to create a wrapper (see core rule 3). If nothing exists, proceed to Step 2.

### Step 2 — Implement the component

Create `src/components/ui/<name>.tsx`. Follow existing components as reference:

- Use `class-variance-authority` for variants when the component has multiple visual options
- Use `cn()` from `@/lib/utils` for all class merging
- Forward refs where the component wraps a DOM element (`React.ComponentProps<"element">` pattern)
- Add `"use client"` if the component uses hooks, event handlers, or browser APIs
- If the component needs keyframe animations, add them to `src/components/ui/style.css` — do not create separate CSS files
- Semantic color tokens only — never raw Tailwind colors like `bg-blue-500`

### Step 3 — Write the documentation page

Create `src/app/docs/components/<name>/page.mdx`.

The page **must** follow this exact order:

1. **`metadata` export** — `title`, `description`, and `alternates.canonical` set to `/docs/components/<name>`
2. **`# Title`** — component name as heading
3. **Short description** — one paragraph explaining what the component does
4. **`## Installation`** — `<InstallSnippet registryUrl="https://prismaui.com/components/<name>.json" />`
5. **`## Import`** — single code block with the import statement
6. **`---`** separator
7. **`## Usage` / variant sections** — each with a `<ComponentPreview>` block above its code block (see core rules 1–3)
8. **`## Props`** — props table at the very end

Additionally:

- Include a `<JsonLd />` block with three-level breadcrumb structured data (Home → Docs → Component)
- Reference the badge page (`src/app/docs/components/badge/page.mdx`) as a template

### Step 4 — Register in the sidebar

In `src/app/docs/components/_meta.ts`, add:

```ts
'<name>': {
  title: '<Display Name>',
},
```

Place it under the correct separator (`-- general` or `-- cards`), or add a new one if needed.

### Step 5 — Add registry entry

In `scripts/generate-registry.js` add a `writeRegistry` call:

```js
writeRegistry('<name>', {
  dependencies: ['<npm-dep>'], // omit if none
  devDependencies: ['<@types/dep>'], // omit if none
  registryDependencies: ['card'], // omit if none
  files: [
    makeFile('<name>.tsx', read('<name>.tsx')),
    makeFile('style.css', styleCss), // only if component uses style.css
  ],
});
```

Then run:

```bash
npm run build-components
```

Confirm the file `public/components/<name>.json` exists afterward.

### Step 6 — Add to sitemap

In `src/app/sitemap.ts`, add the component slug to the `components` array:

```ts
const components = [
  // ... existing entries
  '<name>',
];
```

### Step 7 — Verify the install snippet

Open the documentation page and confirm `<InstallSnippet registryUrl="https://prismaui.com/components/<name>.json" />` is present in the `## Installation` section. Add it if it was omitted.

### Step 8 — Update README

Add a row to the Components table in `README.md`:

```md
| **<Display Name>** | <One-line description.> |
```

### Step 9 — Bump package version (minor)

In `package.json`, increment `version` by a **minor** bump (e.g. `1.0.0` → `1.1.0`). Only do this for new components, not updates.

---

## Update workflow (existing component)

1. Edit `src/components/ui/<name>.tsx` with the change.
2. Update `src/app/docs/components/<name>/page.mdx` if the API or behavior changed.
3. Run `npm run build-components` to regenerate the JSON.
4. Bump the version in the generated `public/components/<name>.json`:
   - **New feature or variant** → minor bump (e.g. `1.0.0` → `1.1.0`)
   - **Bug fix** → patch bump (e.g. `1.0.0` → `1.0.1`)

Do **not** bump `package.json` for a component update.

---

## Quality checklist

Before finishing, verify:

**Component**

- [ ] Checked shadcn registry first (`npx shadcn@latest add <name>`)
- [ ] If shadcn had it: installed via CLI, created wrapper instead of modifying base
- [ ] Component file present at `src/components/ui/<name>.tsx`
- [ ] `"use client"` directive present if component uses hooks, event handlers, or browser APIs
- [ ] `cn()` used for all class merging
- [ ] Semantic color tokens used (no raw `bg-blue-500` etc.)
- [ ] `gap-*` used for spacing (no `space-x-*` or `space-y-*`)
- [ ] React hooks imported directly (`import { useState } from 'react'`)
- [ ] Component return type is `React.ReactNode`
- [ ] Keyframe animations are in `style.css`, not inline or in separate CSS files

**Documentation**

- [ ] Docs page at `src/app/docs/components/<name>/page.mdx` with metadata, JsonLd, InstallSnippet
- [ ] Every non-import code block has a `<ComponentPreview>` block above it
- [ ] Interactive demos extracted to `_demo-<variant>.tsx` client components where needed

**Registry & project**

- [ ] Sidebar entry in `src/app/docs/components/_meta.ts`
- [ ] `writeRegistry` call in `scripts/generate-registry.js`
- [ ] `public/components/<name>.json` exists (run `npm run build-components` if not)
- [ ] Component slug added to `src/app/sitemap.ts` `components` array _(new components only)_
- [ ] README Components table updated _(new components only)_
- [ ] `package.json` version bumped by **minor** _(new components only)_
- [ ] Component registry JSON version bumped (minor for feature, patch for bug fix) _(updates only)_
