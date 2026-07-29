/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const uiDir = path.join(__dirname, '..', 'src', 'components', 'ui');
const stylesDir = path.join(uiDir, 'styles');
const outDir = path.join(__dirname, '..', 'public', 'components');

const SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';

// Every style shipped by the registry. The shadcn CLI replaces the {style}
// placeholder in a registry URL with the style from the target components.json.
const STYLES = [
  'radix-vega',
  'radix-nova',
  'radix-maia',
  'radix-lyra',
  'radix-mira',
  'radix-luma',
  'radix-rhea',
  'radix-sera',
];

// The base style: its sources live in src/components/ui and are also used as
// the root fallback content.
const BASE_STYLE = 'radix-vega';

// Older shadcn projects still carry these style names in components.json.
// They are served vega content so {style} URLs never 404.
const LEGACY_ALIASES = {
  default: BASE_STYLE,
  'new-york': BASE_STYLE,
};

// Only these components have per-style source variants.
const STYLE_DEPENDENT_FILES = [
  'button.tsx',
  'badge.tsx',
  'floating-label-input.tsx',
];

// Component definitions: declared once, reused for every style.
const COMPONENTS = [
  {
    name: 'button',
    dependencies: ['class-variance-authority', 'lucide-react'],
    registryDependencies: ['spinner'],
    files: ['button.tsx', 'style.css'],
  },
  {
    name: 'badge',
    dependencies: ['class-variance-authority'],
    files: ['badge.tsx', 'style.css'],
  },
  {
    name: 'confetti-wrapper',
    dependencies: ['canvas-confetti'],
    devDependencies: ['@types/canvas-confetti'],
    files: ['confetti-wrapper.tsx'],
  },
  {
    name: 'rainbow-border',
    registryDependencies: ['card'],
    files: ['rainbow-border.tsx', 'style.css'],
  },
  {
    name: 'border-beam',
    dependencies: ['motion'],
    registryDependencies: ['card'],
    files: ['border-beam.tsx'],
  },
  {
    name: 'shine-border',
    registryDependencies: ['card'],
    files: ['shine-border.tsx', 'style.css'],
  },
  {
    name: 'flip-card',
    registryDependencies: ['card'],
    files: ['flip-card.tsx', 'style.css'],
  },
  {
    name: 'floating-label-input',
    registryDependencies: ['input', 'label'],
    files: ['floating-label-input.tsx'],
  },
  {
    name: 'animated-background',
    dependencies: ['motion'],
    files: ['animated-background.tsx'],
  },
  {
    name: 'tilt',
    dependencies: ['motion'],
    files: ['tilt.tsx'],
  },
  {
    name: 'magnetic',
    dependencies: ['motion'],
    files: ['magnetic.tsx'],
  },
  {
    name: 'tracing-beam',
    dependencies: ['motion'],
    files: ['tracing-beam.tsx'],
  },
  {
    name: 'depth-media',
    dependencies: ['motion'],
    files: ['depth-media.tsx'],
  },
  {
    name: 'aura-beam',
    registryDependencies: ['card'],
    files: ['aura-beam.tsx', 'style.css'],
  },
];

let filesWritten = 0;
const warnings = [];
const sourceCache = new Map();

function readCanonical(fileName) {
  return fs.readFileSync(path.join(uiDir, fileName), 'utf8');
}

// Resolves a component source for a given style. Style-dependent files come
// from src/components/ui/styles/{style}/, everything else (and the base style)
// from the canonical src/components/ui/. A missing per-style file falls back to
// the canonical source with a warning instead of failing the build.
// Per-style sources import the shared style.css relatively ('../../style.css')
// and the per-style input as './input' so they compile inside the docs site;
// installed components sit next to style.css and resolve input from
// '@/components/ui/input' (delivered in the user's style by the shadcn
// registryDependency), so both imports are rewritten for the registry payload.
function readSource(style, fileName) {
  const cacheKey = `${style}/${fileName}`;
  if (sourceCache.has(cacheKey)) return sourceCache.get(cacheKey);

  let content;
  if (style === BASE_STYLE || !STYLE_DEPENDENT_FILES.includes(fileName)) {
    content = readCanonical(fileName);
  } else {
    const stylePath = path.join(stylesDir, style, fileName);
    if (fs.existsSync(stylePath)) {
      content = fs
        .readFileSync(stylePath, 'utf8')
        .replace("import '../../style.css';", "import './style.css';")
        .replace(
          "import { Input } from './input';",
          "import { Input } from '@/components/ui/input';",
        );
    } else {
      const rel = path.relative(path.join(__dirname, '..'), stylePath);
      console.warn(`  ! missing ${rel} — falling back to canonical source`);
      warnings.push(rel);
      content = readCanonical(fileName);
    }
  }

  sourceCache.set(cacheKey, content);
  return content;
}

function makeFile(fileName, content) {
  return {
    path: `ui/${fileName}`,
    content,
    type: 'registry:ui',
    target: `components/ui/${fileName}`,
  };
}

function buildItem(component, style) {
  const json = {
    $schema: SCHEMA,
    name: component.name,
    type: 'registry:ui',
    description:
      'A Prisma UI component. https://github.com/joao-carmassi/prisma-ui',
    author: 'Prisma UI',
  };
  if (component.dependencies) json.dependencies = component.dependencies;
  if (component.devDependencies)
    json.devDependencies = component.devDependencies;
  if (component.registryDependencies)
    json.registryDependencies = component.registryDependencies;
  json.files = component.files.map((fileName) =>
    makeFile(fileName, readSource(style, fileName)),
  );
  return json;
}

// Writes the full component set into `dir`, using `style` sources.
function writeStyle(dir, style) {
  fs.mkdirSync(dir, { recursive: true });
  COMPONENTS.forEach((component) => {
    const json = buildItem(component, style);
    fs.writeFileSync(
      path.join(dir, `${component.name}.json`),
      JSON.stringify(json),
    );
    filesWritten++;
  });
}

console.log('Generating registry JSON files...\n');

// Root fallback: vega content at public/components/{name}.json so existing
// direct-URL installs keep working.
writeStyle(outDir, BASE_STYLE);
console.log(`  ✔ root (${BASE_STYLE}) — ${COMPONENTS.length} items`);

// Per-style folders consumed by the {style} URL placeholder.
STYLES.forEach((style) => {
  writeStyle(path.join(outDir, style), style);
  console.log(`  ✔ ${style} — ${COMPONENTS.length} items`);
});

// Legacy style names from older components.json files.
Object.keys(LEGACY_ALIASES).forEach((alias) => {
  writeStyle(path.join(outDir, alias), LEGACY_ALIASES[alias]);
  console.log(
    `  ✔ ${alias} (alias → ${LEGACY_ALIASES[alias]}) — ${COMPONENTS.length} items`,
  );
});

const styleCount = STYLES.length + Object.keys(LEGACY_ALIASES).length;

console.log(
  `\n${filesWritten} registry JSON files created — ${COMPONENTS.length} components across ${styleCount} styles (${STYLES.length} styles + ${Object.keys(LEGACY_ALIASES).length} legacy aliases) plus the root fallback.`,
);
if (warnings.length) {
  console.log(
    `${warnings.length} per-style source(s) missing and fell back to the canonical source.`,
  );
}
console.log('');
