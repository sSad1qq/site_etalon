type LogLevel = 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  [key: string]: unknown
}

function formatEntry(level: LogLevel, message: string, meta?: Record<string, unknown>): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  }
}

function emit(entry: LogEntry) {
  const out = JSON.stringify(entry)
  if (entry.level === 'error') {
    console.error(out)
  } else if (entry.level === 'warn') {
    console.warn(out)
  } else {
    console.log(out)
  }
}

export const logger = {
  info(message: string, meta?: Record<string, unknown>) {
    emit(formatEntry('info', message, meta))
  },
  warn(message: string, meta?: Record<string, unknown>) {
    emit(formatEntry('warn', message, meta))
  },
  error(message: string, meta?: Record<string, unknown>) {
    emit(formatEntry('error', message, meta))
  },
}
