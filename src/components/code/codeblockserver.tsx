import { getHighlightedCode } from '@/components/code/code'
import { availableLanguages } from '@/lib/shiki/highlighter'
import { CodeBlock } from './codeblock'

export async function CodeBlockServer({
  code,
  language,
  title,
}: {
  code: string
  language: (typeof availableLanguages)[number]
  title?: string
}) {
  // Perform server-side syntax highlighting
  const highlightedHtml = await getHighlightedCode(code, language)

  // Pass the pre-highlighted code to the client-side component
  return (
    <CodeBlock
      code={code}
      highlightedHtml={highlightedHtml}
      title={title}
      isGrouped={false} // Adjust based on context
    />
  )
}
