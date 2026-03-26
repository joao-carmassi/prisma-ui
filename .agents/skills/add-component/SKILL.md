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
| README              | `README.md`                               |
| Package version     | `package.json` → `version`                |

To regenerate all registry JSON files, run:

```bash
node scripts/generate-registry.js
```

---

## Decision: new component vs. update

Before starting, determine which path applies.

- **New component** → follow the "Full workflow" section below
- **Update to existing component** → follow the "Update workflow" section below

---

## Full workflow (new component)

Work through all steps in order.

### Step 1 — Implement the component

Create `src/components/ui/<name>.tsx`. Follow existing components as reference:

- Use `class-variance-authority` for variants
- Forward refs where the component wraps a DOM element
- If the component needs `data-variant` CSS custom properties or keyframe animations, rely on the existing `style.css` — do not duplicate its contents

### Step 2 — Write the documentation page

Create `src/app/docs/components/<name>/page.mdx`.

Every doc page needs:

- A `metadata` export with `title`, `description`, and `alternates.canonical` set to `/docs/components/<name>`
- A `<JsonLd />` block with three-level breadcrumb structured data (Home → Docs → Component)
- `## Installation` with `<InstallSnippet registryUrl="https://prismaui.com/components/<name>.json" />`
- `## Import` with the import statement
- Sections per prop/variant/size — each with a `<ComponentPreview>` block and a matching code block
- Reference the badge page (`src/app/docs/components/badge/page.mdx`) as a template

### Step 3 — Register in the sidebar

In `src/app/docs/components/_meta.ts`, add:

```ts
'<name>': {
  title: '<Display Name>',
},
```

Place it under the correct separator (`-- general` or `-- cards`), or add a new one if needed.

### Step 4 — Add registry entry

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
node scripts/generate-registry.js
```

Confirm the file `public/components/<name>.json` exists afterward.

### Step 5 — Verify the install snippet

Open the documentation page and confirm `<InstallSnippet registryUrl="https://prismaui.com/components/<name>.json" />` is present in the `## Installation` section. Add it if it was omitted.

### Step 6 — Update README

Add a row to the Components table in `README.md`:

```md
| **<Display Name>** | <One-line description.> |
```

### Step 7 — Bump package version (minor)

In `package.json`, increment `version` by a **minor** bump (e.g. `1.0.0` → `1.1.0`). Only do this for new components, not updates.

---

## Update workflow (existing component)

1. Edit `src/components/ui/<name>.tsx` with the change.
2. Update `src/app/docs/components/<name>/page.mdx` if the API or behavior changed.
3. Run `node scripts/generate-registry.js` to regenerate the JSON.
4. Bump the version in the generated `public/components/<name>.json`:
   - **New feature or variant** → minor bump (e.g. `1.0.0` → `1.1.0`)
   - **Bug fix** → patch bump (e.g. `1.0.0` → `1.0.1`)

Do **not** bump `package.json` for a component update.

---

## Quality checklist

Before finishing, verify:

- [ ] Component file present at `src/components/ui/<name>.tsx`
- [ ] Docs page at `src/app/docs/components/<name>/page.mdx` with metadata, JsonLd, InstallSnippet
- [ ] Sidebar entry in `src/app/docs/components/_meta.ts`
- [ ] `writeRegistry` call in `scripts/generate-registry.js`
- [ ] `public/components/<name>.json` exists (run script if not)
- [ ] README Components table updated _(new components only)_
- [ ] `package.json` version bumped by **minor** _(new components only)_
- [ ] Component registry JSON version bumped (minor for feature, patch for bug fix) _(updates only)_
