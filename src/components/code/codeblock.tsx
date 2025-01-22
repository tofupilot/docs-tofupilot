'use client'

import { useEffect, useState } from 'react'
import { ButtonCopy } from './button-copy'
import { availableLanguages, languageMap } from '@/lib/shiki/highlighter'
import { fetchContentFromUrl, getHighlightedCode } from '@/actions/code'

export function CodeBlock({
  code,
  language,
}: {
  code: string
  language: (typeof availableLanguages)[number]
}) {
  const [highlightedHtml, setHighlightedHtml] = useState('')

  useEffect(() => {
    getHighlightedCode(code, language).then((html) => {
      setHighlightedHtml(html)
    })
  }, [])

  return (
    // Out of "prose" for <pre> custom styling
    <div className="not-prose my-6 overflow-hidden rounded-lg bg-zinc-900 text-sm shadow-md dark:ring-1 dark:ring-white/10">
      <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 pl-4 pr-2">
        <h3 className="py-4 text-xs font-semibold text-white">{language}</h3>
      </div>
      <div className="group relative">
        {/* Rendering the pre-highlighted HTML */}
        <pre
          className="overflow-x-auto p-0 text-sm [&>pre]:w-full [&>pre]:overflow-x-auto [&>pre]:!py-4 [&>pre]:px-4 [&>pre]:leading-snug"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
        <ButtonCopy value={code} />
      </div>
    </div>
  )
}

const getContentUrl = (path: string) =>
  `https://raw.githubusercontent.com/tofupilot/examples/main/${path}`

// Takes the path of a file in main branch of public tofupilot/examples repository and display it with syntax highlighting
export function CodeBlockFile({ path }: { path: string }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)

  const contentUrl = getContentUrl(path)

  const fileName = path.split('/').pop() || 'Unknown file'

  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  const language = languageMap[extension] || 'plaintext'

  useEffect(() => {
    fetchContentFromUrl(contentUrl).then((result) => {
      if (result.error) {
        setError(result.error)
      }
      if (result.code) {
        setCode(result.code)
      }
    })
  }, [])

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400">
        <p>Error loading code: {error}</p>
      </div>
    )
  }

  if (code) {
    return <CodeBlock code={code} language={language} />
  }
}
