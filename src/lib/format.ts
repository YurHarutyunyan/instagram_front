export function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
}
