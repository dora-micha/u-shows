interface ErrorContext {
  component?: string
  action?: string
  lifecycleHook?: string
}

export function logError(message: string, error: Error, context?: ErrorContext): void {
  // TODO: In production, send to monitoring service
  console.error(`[${new Date().toISOString()}] ${message}`, {
    error: error.message,
    stack: error.stack,
    ...context
  })
}
