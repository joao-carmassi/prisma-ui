import { cn } from '@/lib/utils';

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({
  children,
  className,
}: ComponentPreviewProps): React.ReactNode {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-4 rounded-xl p-6 my-4 bg-muted inset-shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
