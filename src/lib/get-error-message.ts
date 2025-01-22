import { EdgeDBError } from 'edgedb';

export function getErrorMessage(error: unknown) {
  if (!error) return '';
  console.error(error);
  if (
    typeof error === 'object' &&
    'cause' in error &&
    error.cause instanceof EdgeDBError
  ) {
    const message = error.cause.message;
    if (message.includes('no longer than'))
      return `Provided ${message.split(' ')[0]} is too long.`;
    if (message.includes('exclusivity constraint'))
      return 'This name is already taken.';
    if (message.includes('invalid `property')) return 'Incorrect name format';
    return error.cause.message;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && 'message' in error)
    return String(error.message);
  if (typeof error === 'string') return error;
}
