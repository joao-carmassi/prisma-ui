'use client';

import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from '@/components/kibo-ui/snippet';
import { useManager, useSetManager } from '@/store/store-managers';

const managers = [
  { label: 'npm', value: 'npm', command: 'npx shadcn@latest add' },
  { label: 'pnpm', value: 'pnpm', command: 'pnpm dlx shadcn@latest add' },
  { label: 'yarn', value: 'yarn', command: 'npx shadcn@latest add' },
  { label: 'bun', value: 'bun', command: 'bunx --bun shadcn@latest add' },
] as const;

interface InstallSnippetProps {
  registryUrl: string;
}

export function InstallSnippet({
  registryUrl,
}: InstallSnippetProps): React.ReactNode {
  const active = useManager();
  const setManager = useSetManager();
  const activeCommand =
    managers.find((m) => m.value === active)?.command ?? managers[0].command;

  return (
    <Snippet value={active} onValueChange={setManager}>
      <SnippetHeader>
        <SnippetTabsList>
          {managers.map((m) => (
            <SnippetTabsTrigger key={m.value} value={m.value}>
              {m.label}
            </SnippetTabsTrigger>
          ))}
        </SnippetTabsList>
        <SnippetCopyButton value={`${activeCommand} ${registryUrl}`} />
      </SnippetHeader>
      {managers.map((m) => (
        <SnippetTabsContent key={m.value} value={m.value}>
          {m.command} {registryUrl}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
}
