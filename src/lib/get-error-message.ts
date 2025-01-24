export function getErrorMessage(error: unknown) {
  if (!error) return ''
  console.error(error)
  if (error instanceof Error) return error.message
  if (typeof error === 'object' && 'message' in error)
    return String(error.message)
  if (typeof error === 'string') return error
}
