export function getGithubUrl(): string {
  return (
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    'https://github.com/joao-carmassi/prisma-ui'
  );
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prismaui.com';
}

export function getDocsRepositoryBase(): string {
  return (
    process.env.NEXT_PUBLIC_DOCS_REPOSITORY_BASE ??
    'https://github.com/joao-carmassi/prisma-ui'
  );
}
