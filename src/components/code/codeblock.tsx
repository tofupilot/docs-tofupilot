'use client'

import { useContext } from 'react'
import { CodeGroupContext, CopyButton } from '../Code'

export function CodeBlock({
  code,
  highlightedHtml,
  title,
  isGrouped,
}: {
  code: string
  highlightedHtml: string
  title?: string
  isGrouped?: boolean
}) {
  // Checking if we are in a code group
  const grouped = useContext(CodeGroupContext) || isGrouped

  // If grouped, render a minimal <code> block with syntax-highlighted HTML
  if (grouped) {
    return <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
  }

  // Otherwise, render the full UI with the title and copy button
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
      {title && (
        <div className="flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 bg-zinc-900 px-4 dark:border-b-white/5 dark:bg-white/1">
          <span className="font-mono text-xs text-zinc-400">{title}</span>
        </div>
      )}
      <div className="group relative">
        <pre
          className="overflow-x-auto p-4 text-xs text-white"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
        <CopyButton code={code} />
      </div>
    </div>
  )
}
