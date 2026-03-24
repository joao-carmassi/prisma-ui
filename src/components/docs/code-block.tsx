'use client';

import { useState, useRef } from 'react';
import { Pre, withIcons } from 'nextra/components';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

function CodeBlockInner({
  children,
  ...props
}: React.ComponentProps<typeof Pre>): React.ReactNode {
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    const text =
      wrapperRef.current?.querySelector('pre code')?.textContent ?? '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={wrapperRef} className='relative group/codeblock'>
      <Pre {...props}>{children}</Pre>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            aria-label='Copy code'
            className={cn(
              'absolute top-3 right-3',
              'size-7 rounded-full',
              'flex items-center justify-center',
              'bg-background/80 backdrop-blur-sm',
              'border border-border',
              'text-muted-foreground hover:text-foreground',
              'hover:bg-muted cursor-pointer',
              'transition-all duration-150',
              'opacity-0 group-hover/codeblock:opacity-100 focus-visible:opacity-100',
            )}
          >
            {copied ? (
              <Check className='size-3.5 text-green-500' />
            ) : (
              <Copy className='size-3.5' />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side='left' sideOffset={6}>
          {copied ? 'Copied!' : 'Click to copy'}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export const CodeBlock = withIcons(CodeBlockInner);
