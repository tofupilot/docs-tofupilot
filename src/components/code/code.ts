'use server'

import {
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { getErrorMessage } from '@/lib/get-error-message'
import { getHighlighter } from '@/lib/shiki/highlighter'

export async function getHighlightedCode(code: string, language: string) {
  // Generating HTML with Shiki
  const highlighter = await getHighlighter()
  const html = highlighter.codeToHtml(code, {
    lang: language,
    theme: 'tofupilot-theme',
    transformers: [
      transformerNotationHighlight({ matchAlgorithm: 'v3' }),
      transformerNotationWordHighlight({ matchAlgorithm: 'v3' }),
    ],
  })
  return html
}

export async function fetchContentFromUrl(url: string) {
  try {
    // Fetch the raw file content server-side
    const response = await fetch(url, { next: { revalidate: 10 } }) // Use revalidate for ISR
    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${response.statusText}`)
    }
    const code = await response.text()

    return { code }
  } catch (error: unknown) {
    return { error: getErrorMessage(error) }
  }
}
