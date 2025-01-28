import { fetchContentFromUrl } from '@/actions/code'
import { languageMap } from '@/lib/shiki/highlighter'
import { CodeBlock } from './codeblock'

// Helper function building the raw GitHub URL
const getContentUrl = (branch: string, path: string) =>
  `https://raw.githubusercontent.com/tofupilot/examples/${branch}/${path}`

export async function CodeBlockFile({
  path,
  branch = 'main',
  title,
}: {
  path: string
  branch?: string
  title?: string
}) {
  const contentUrl = getContentUrl(branch, path)
  const fileName = path.split('/').pop() || 'Unknown file'
  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  const language = languageMap[extension] || 'plaintext'

  try {
    const result = await fetchContentFromUrl(contentUrl)
    if (result.error) {
      throw new Error(result.error)
    }
    const code = result.code || ''

    return (
      <CodeBlock code={code} language={language} title={title ?? fileName} />
    )
  } catch (error) {
    return (
      <div className="text-red-600 dark:text-red-400">
        <p>Error loading code example.</p>
      </div>
    )
  }
}
