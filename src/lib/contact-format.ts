export function formatRussianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  const national = digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))
    ? digits.slice(1)
    : digits

  if (national.length === 10) {
    return `+7 (${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6, 8)}-${national.slice(8)}`
  }

  return digits.startsWith('7') ? `+${digits}` : `+7 ${digits}`
}

export function formatMoscowDateTime(date = new Date()): string {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'medium',
    timeZone: 'Europe/Moscow',
  }).format(date)
}
