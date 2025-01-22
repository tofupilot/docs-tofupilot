'use client';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { ClipboardIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';

export function ButtonCopy({ value }: { value: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value, 'Code copied to clipboard');
  };

  return (
    <button
      type="button"
      className={clsx(
        'group/button text-2xs absolute right-4 top-3.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100',
        isCopied
          ? 'bg-lime-400/10 ring-1 ring-inset ring-lime-400/20'
          : 'hover:bg-white/7.5 dark:bg-white/2.5 bg-white/5 dark:hover:bg-white/5'
      )}
      onClick={onCopy}
    >
      <span
        aria-hidden={isCopied}
        className={clsx(
          'pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300',
          isCopied && '-translate-y-1.5 opacity-0'
        )}
      >
        <ClipboardIcon className="size-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
        Copy
      </span>
      <span
        aria-hidden={!isCopied}
        className={clsx(
          'pointer-events-none absolute inset-0 flex items-center justify-center text-lime-400 transition duration-300',
          !isCopied && 'translate-y-1.5 opacity-0'
        )}
      >
        Copied!
      </span>
    </button>
  );
}
