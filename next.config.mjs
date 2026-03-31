import nextra from 'nextra';

// Set up Nextra with its configuration
const withNextra = nextra({
  search: {
    codeblocks: false,
  },
});

// Export the final Next.js config with Nextra included
export default withNextra({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      // Path to your `mdx-components` file with extension
      'next-mdx-import-source-file': './src/mdx-components.tsx',
    },
  },
  reactCompiler: true,
});
