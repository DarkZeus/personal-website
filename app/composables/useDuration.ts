export const useDuration = (startDate: string) => {
  const start = new Date(startDate)
  const now = new Date()

  const startMonth = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''
  const monthStr = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''
  const durationStr = [yearStr, monthStr].filter(Boolean).join(', ') || '1 month'

  return `${startMonth} — Current (${durationStr})`
}
