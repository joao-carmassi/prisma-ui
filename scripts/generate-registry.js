/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://prisma-ui-xi.vercel.app/components';
const uiDir = path.join(__dirname, '..', 'src', 'components', 'ui');
const outDir = path.join(__dirname, '..', 'public', 'components');

function read(file) {
  return fs.readFileSync(path.join(uiDir, file), 'utf8');
}

const SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';

function makeFile(fileName, content) {
  return {
    path: `ui/${fileName}`,
    content,
    type: 'registry:ui',
    target: `components/ui/${fileName}`,
  };
}

function writeRegistry(name, opts) {
  const json = {
    $schema: SCHEMA,
    name,
    type: 'registry:ui',
    description:
      'A Prisma UI component. https://github.com/joao-carmassi/prisma-ui',
    author: 'Prisma UI',
  };
  if (opts.dependencies) json.dependencies = opts.dependencies;
  if (opts.devDependencies) json.devDependencies = opts.devDependencies;
  if (opts.registryDependencies)
    json.registryDependencies = opts.registryDependencies;
  json.files = opts.files;

  fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(json));
  console.log(`  ✔ ${name}.json`);
}

fs.mkdirSync(outDir, { recursive: true });

console.log('Generating registry JSON files...\n');

const styleCss = read('style.css');

// 1. Button
writeRegistry('button', {
  dependencies: ['class-variance-authority', 'lucide-react'],
  files: [
    makeFile('button.tsx', read('button.tsx')),
    makeFile('spinner.tsx', read('spinner.tsx')),
    makeFile('style.css', styleCss),
  ],
});

// 2. Badge
writeRegistry('badge', {
  dependencies: ['class-variance-authority'],
  files: [
    makeFile('badge.tsx', read('badge.tsx')),
    makeFile('style.css', styleCss),
  ],
});

// 3. Card
writeRegistry('card', {
  files: [makeFile('card.tsx', read('card.tsx'))],
});

// 4. Confetti Wrapper
writeRegistry('confetti-wrapper', {
  dependencies: ['canvas-confetti'],
  devDependencies: ['@types/canvas-confetti'],
  files: [makeFile('confetti-wrapper.tsx', read('confetti-wrapper.tsx'))],
});

// 5. Flip Card
writeRegistry('flip-card', {
  registryDependencies: [`${BASE_URL}/card.json`],
  files: [
    makeFile('flip-card.tsx', read('flip-card.tsx')),
    makeFile('style.css', styleCss),
  ],
});

// 6. Rainbow Border
writeRegistry('rainbow-border', {
  registryDependencies: [`${BASE_URL}/card.json`],
  files: [
    makeFile('rainbow-border.tsx', read('rainbow-border.tsx')),
    makeFile('style.css', styleCss),
  ],
});

// 7. Shine Border
writeRegistry('shine-border', {
  registryDependencies: [`${BASE_URL}/card.json`],
  files: [
    makeFile('shine-border.tsx', read('shine-border.tsx')),
    makeFile('style.css', styleCss),
  ],
});

// 8. Border Beam
writeRegistry('border-beam', {
  dependencies: ['motion'],
  registryDependencies: [`${BASE_URL}/card.json`],
  files: [makeFile('border-beam.tsx', read('border-beam.tsx'))],
});

console.log('\nAll 8 registry JSON files created successfully!\n');
