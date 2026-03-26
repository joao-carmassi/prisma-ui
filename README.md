<div align="center">

<svg width="64" height="64" viewBox="-27 0 310 310" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
  <path d="M254.312882,235.518775 L148.000961,9.74987264 C145.309805,4.08935083 139.731924,0.359884549 133.472618,0.0359753113 C127.198908,-0.384374336 121.212054,2.71925839 117.939655,8.08838662 L2.63252565,194.847143 C-0.947129465,200.604248 -0.871814894,207.912774 2.8257217,213.594888 L59.2003287,300.896318 C63.5805009,307.626626 71.8662281,310.673635 79.5631922,308.384597 L243.161606,259.992851 C248.145475,258.535702 252.252801,254.989363 254.421072,250.271225 C256.559881,245.57581 256.523135,240.176915 254.32061,235.511047 L254.312882,235.518775 Z M230.511129,245.201761 L91.6881763,286.252058 C87.4533189,287.511696 83.388474,283.840971 84.269448,279.567474 L133.866738,42.0831633 C134.794079,37.6396542 140.929985,36.9364206 142.869673,41.0476325 L234.684164,236.021085 C235.505704,237.779423 235.515611,239.809427 234.711272,241.575701 C233.906934,243.341974 232.369115,244.667163 230.503401,245.201761 L230.511129,245.201761 Z" fill="#7c3aed"/>
</svg>

# Prisma UI

**An advanced React component library built on Radix UI and Tailwind CSS.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-prisma--ui--xi.vercel.app-7c3aed?style=flat-square)](https://prismaui.com/)
[![License](https://img.shields.io/badge/license-MIT-7c3aed?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## What is Prisma UI?

Prisma UI is a production-ready component library that ships accessible, animated, and fully typed React components. Every component is individually installable via the **shadcn CLI**, meaning you copy only what you need directly into your project — no runtime dependency, just your code.

- **Accessible by default** — Built on [Radix UI](https://www.radix-ui.com/) primitives with keyboard navigation, ARIA attributes, and focus management included.
- **Rich visual effects** — Shimmer, rainbow, pulsating, border-beam, confetti, and more — expressive animations with zero extra configuration.
- **Fully typed API** — Every prop, variant, and effect is typed with TypeScript for better autocomplete and fewer bugs.

---

## Components

| Component | Description |
|---|---|
| **Button** | Multiple variants, sizes, loading state, and animated effects (pulsating, rainbow, shine, ringHover). |
| **Badge** | Compact status labels with size and variant support. |
| **Confetti Wrapper** | Triggers a canvas-confetti burst on any action. |
| **Rainbow Border** | Cycling rainbow gradient border. |
| **Border Beam** | Animated glowing-beam border effect card. |
| **Shine Border** | Sweeping shine animation around a card border. |
| **Flip Card** | 3D flip animation with configurable front and back faces. |

---

## Installation

Components require **shadcn/ui** to be initialized in your project:

```bash
npx shadcn@latest init
```

Then add any component individually with:

```bash
npx shadcn@latest add https://prismaui.com/components/<component-name>.json
```

Example — adding the Button:

```bash
npx shadcn@latest add https://prismaui.com/components/button.json
```

The CLI automatically downloads the source file into your `components/ui/` directory and installs any required dependencies.

---

## Tech Stack

| Tool | Role |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework |
| [React 19](https://react.dev/) | UI library |
| [Radix UI](https://www.radix-ui.com/) | Accessible primitives |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Component distribution via CLI |
| [Motion](https://motion.dev/) | Animations |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| [Nextra](https://nextra.site/) | Documentation |

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Links

- **Documentation & Demo:** [prisma-ui-xi.vercel.app](https://prismaui.com/)
- **Docs — Installation:** [prisma-ui-xi.vercel.app/docs](https://prismaui.com/docs)
- **Components reference:** [prisma-ui-xi.vercel.app/docs/references](https://prismaui.com/docs/references)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
