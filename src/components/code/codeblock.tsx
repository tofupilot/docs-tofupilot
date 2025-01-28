'use client'

import { getHighlightedCode } from '@/actions/code'
import { availableLanguages } from '@/lib/shiki/highlighter'
import { useContext, useEffect, useState } from 'react'
import { CodeGroupContext, CopyButton } from '../Code'

export function CodeBlock({
  code,
  language,
  title,
}: {
  code: string
  language: (typeof availableLanguages)[number]
  title?: string
}) {
  // Keeping track of the highlighted HTML
  let [highlightedHtml, setHighlightedHtml] = useState(code)

  // Checking if we are in a code group
  let isGrouped = useContext(CodeGroupContext)

  // Fetching highlighted code on mount
  useEffect(() => {
    getHighlightedCode(code, language).then((html) => {
      setHighlightedHtml(html)
    })
  }, [code, language])

  // If grouped, just returning a <code> block with HTML
  if (isGrouped) {
    // Ensuring we got back a string from highlight
    if (typeof highlightedHtml !== 'string') {
      throw new Error('`CodeBlock` expects highlighted HTML as a string.')
    }
    return <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
  }

  // Otherwise, returning the labeled panel with copy button
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
      {/* Rendering a header bar only if a label is present */}
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
