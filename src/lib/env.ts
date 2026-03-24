export function getGithubUrl(): string {
  return process.env.NEXT_PUBLIC_GITHUB_URL ?? '';
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? '';
}

export function getDocsRepositoryBase(): string {
  return process.env.NEXT_PUBLIC_DOCS_REPOSITORY_BASE ?? '';
}
