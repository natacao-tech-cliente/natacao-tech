export const formatDays = (
  days: string[] | string | null | undefined
): string[] => {
  if (!days) return []

  const daysArray: string[] = Array.isArray(days)
    ? days
    : String(days)
        .split(',')
        .map((d) => d.trim())

  if (daysArray.length === 0) return []

  const map: Record<string, string> = {
    SEGUNDA: 'Seg',
    TERCA: 'Ter',
    QUARTA: 'Qua',
    QUINTA: 'Qui',
    SEXTA: 'Sex',
    SABADO: 'Sáb',
    DOMINGO: 'Dom',
  }

  const order = [
    'SEGUNDA',
    'TERCA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SABADO',
    'DOMINGO',
  ]

  return [...daysArray]
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((d) => map[d] ?? d)
}
