export const sanitizeHtml = (value: string) => value.replace(/<[^>]*>/g, '').trim()
