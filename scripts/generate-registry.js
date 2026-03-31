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

// 8. Transition Panel
writeRegistry('transition-panel', {
  dependencies: ['motion'],
  files: [makeFile('transition-panel.tsx', read('transition-panel.tsx'))],
});

// 9. Floating Label Input
writeRegistry('floating-label-input', {
  registryDependencies: ['input', 'label'],
  files: [
    makeFile('floating-label-input.tsx', read('floating-label-input.tsx')),
  ],
});

// 10. Animated Background
writeRegistry('animated-background', {
  dependencies: ['motion'],
  files: [makeFile('animated-background.tsx', read('animated-background.tsx'))],
});

// 11. Progressive Blur
writeRegistry('progressive-blur', {
  dependencies: ['motion'],
  files: [makeFile('progressive-blur.tsx', read('progressive-blur.tsx'))],
});

// 12. Infinite Slider
writeRegistry('infinite-slider', {
  dependencies: ['motion'],
  files: [makeFile('infinite-slider.tsx', read('infinite-slider.tsx'))],
});

// 13. Glow Effect
writeRegistry('glow-effect', {
  dependencies: ['motion'],
  files: [makeFile('glow-effect.tsx', read('glow-effect.tsx'))],
});

// 14. Tilt
writeRegistry('tilt', {
  dependencies: ['motion'],
  files: [makeFile('tilt.tsx', read('tilt.tsx'))],
});

// 15. Magnetic
writeRegistry('magnetic', {
  dependencies: ['motion'],
  files: [makeFile('magnetic.tsx', read('magnetic.tsx'))],
});

// 16. Scroll Progress
writeRegistry('scroll-progress', {
  dependencies: ['motion'],
  files: [makeFile('scroll-progress.tsx', read('scroll-progress.tsx'))],
});

// 17. Backlight
writeRegistry('backlight', {
  files: [makeFile('backlight.tsx', read('backlight.tsx'))],
});

// 18. Tracing Beam
writeRegistry('tracing-beam', {
  dependencies: ['motion'],
  files: [makeFile('tracing-beam.tsx', read('tracing-beam.tsx'))],
});

console.log(
  `\nAll ${registryCounter} registry JSON files created successfully!\n`,
);
