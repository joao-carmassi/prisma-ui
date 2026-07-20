/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

let registryCounter = 0;
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
  registryCounter++;
}

fs.mkdirSync(outDir, { recursive: true });

console.log('Generating registry JSON files...\n');

const styleCss = read('style.css');

// 1. Button
writeRegistry('button', {
  dependencies: ['class-variance-authority', 'lucide-react'],
  registryDependencies: ['spinner'],
  files: [
    makeFile('button.tsx', read('button.tsx')),
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

// 3. Confetti Wrapper
writeRegistry('confetti-wrapper', {
  dependencies: ['canvas-confetti'],
  devDependencies: ['@types/canvas-confetti'],
  files: [makeFile('confetti-wrapper.tsx', read('confetti-wrapper.tsx'))],
});

// 4. Rainbow Border
writeRegistry('rainbow-border', {
  registryDependencies: ['card'],
  files: [
    makeFile('rainbow-border.tsx', read('rainbow-border.tsx')),
    makeFile('style.css', styleCss),
  ],
});

// 5. Border Beam
writeRegistry('border-beam', {
  dependencies: ['motion'],
  registryDependencies: ['card'],
  files: [makeFile('border-beam.tsx', read('border-beam.tsx'))],
});

// 6. Shine Border
writeRegistry('shine-border', {
  registryDependencies: ['card'],
  files: [
    makeFile('shine-border.tsx', read('shine-border.tsx')),
    makeFile('style.css', styleCss),
  ],
});

// 7. Flip Card
writeRegistry('flip-card', {
  registryDependencies: ['card'],
  files: [
    makeFile('flip-card.tsx', read('flip-card.tsx')),
    makeFile('style.css', styleCss),
  ],
});

// 8. Floating Label Input
writeRegistry('floating-label-input', {
  registryDependencies: ['input', 'label'],
  files: [
    makeFile('floating-label-input.tsx', read('floating-label-input.tsx')),
  ],
});

// 9. Animated Background
writeRegistry('animated-background', {
  dependencies: ['motion'],
  files: [makeFile('animated-background.tsx', read('animated-background.tsx'))],
});

// 10. Tilt
writeRegistry('tilt', {
  dependencies: ['motion'],
  files: [makeFile('tilt.tsx', read('tilt.tsx'))],
});

// 11. Magnetic
writeRegistry('magnetic', {
  dependencies: ['motion'],
  files: [makeFile('magnetic.tsx', read('magnetic.tsx'))],
});

// 12. Tracing Beam
writeRegistry('tracing-beam', {
  dependencies: ['motion'],
  files: [makeFile('tracing-beam.tsx', read('tracing-beam.tsx'))],
});

// 13. Depth Media
writeRegistry('depth-media', {
  dependencies: ['motion'],
  files: [makeFile('depth-media.tsx', read('depth-media.tsx'))],
});

// 14. Border Glow
writeRegistry('border-glow', {
  files: [makeFile('border-glow.tsx', read('border-glow.tsx'))],
});

// 15. Aura Beam
writeRegistry('aura-beam', {
  registryDependencies: ['card'],
  files: [
    makeFile('aura-beam.tsx', read('aura-beam.tsx')),
    makeFile('style.css', styleCss),
  ],
});

console.log(
  `\nAll ${registryCounter} registry JSON files created successfully!\n`,
);
