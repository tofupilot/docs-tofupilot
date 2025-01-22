'use client'

import { useEffect, useState } from 'react'
import { availableLanguages, languageMap } from '@/lib/shiki/highlighter'
import { fetchContentFromUrl, getHighlightedCode } from '@/actions/code'
import { CopyButton } from '../Code'

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
    <div className="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
      {/* Making the inner container "group" so the CopyButton can fade in/out on hover */}
      <div className="group dark:bg-white/2.5">
        {/* Positioning the pre relative so the copy button can be absolutely placed */}
        <div className="relative">
          {/* Rendering the pre-highlighted code, applying text size/color */}
          <pre
            className="overflow-x-auto p-4 text-xs text-white"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
          {/* Using the same CopyButton */}
          <CopyButton code={code} />
        </div>
      </div>
    </div>
  )
}

const getContentUrl = (branch: string, path: string) =>
  `https://raw.githubusercontent.com/tofupilot/examples/${branch}/${path}`

// Takes the path of a file and a branch (main by default) of public tofupilot/examples repository and displays it with syntax highlighting
export function CodeBlockFile({
  path,
  branch = 'main',
}: {
  path: string
  branch?: string
}) {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)

  const contentUrl = getContentUrl(branch, path)

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
