'use client'

import { useEffect, useState, useContext } from 'react'
import { availableLanguages, languageMap } from '@/lib/shiki/highlighter'
import { fetchContentFromUrl, getHighlightedCode } from '@/actions/code'
import { CodeGroupContext, CopyButton } from '../Code'

// Importing the CodeGroupContext so we know if we're in a grouped context

// Doing CodeBlock similarly to "Code" in the old file:
// - If inside a group => returning just a <code> with dangerouslySetInnerHTML
// - Otherwise => returning the labeled + copyable container
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

  // If grouped, just returning a <code> block with HTML (like old "Code" did)
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

// Helper function building the raw GitHub URL
const getContentUrl = (branch: string, path: string) =>
  `https://raw.githubusercontent.com/tofupilot/examples/${branch}/${path}`

// Doing CodeBlockFile similarly. If in a group => returning <code> directly,
// else => returning the usual container with label + copy button
export function CodeBlockFile({
  path,
  branch = 'main',
}: {
  path: string
  branch?: string
}) {
  let [code, setCode] = useState('')
  let [error, setError] = useState<string | null>(null)

  let isGrouped = useContext(CodeGroupContext)
  let contentUrl = getContentUrl(branch, path)
  let fileName = path.split('/').pop() || 'Unknown file'

  let extension = fileName.split('.').pop()?.toLowerCase() || ''
  let language = languageMap[extension] || 'plaintext'

  // Fetching code from GitHub on mount
  useEffect(() => {
    fetchContentFromUrl(contentUrl).then((result) => {
      if (result.error) {
        setError(result.error)
      }
      if (result.code) {
        setCode(result.code)
      }
    })
  }, [contentUrl])

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400">
        <p>Error loading code: {error}</p>
      </div>
    )
  }

  // If we have the raw code, proceed
  if (code) {
    // If in group, returning a simplified <code> (like old "Code")
    if (isGrouped) {
      return <CodeBlock code={code} language={language} />
    }

    // Otherwise, using the standard container for CodeBlock with label
    return <CodeBlock code={code} language={language} label={fileName} />
  }

  // If we're still loading, or no code yet, rendering nothing or a simple loader
  return null
}
