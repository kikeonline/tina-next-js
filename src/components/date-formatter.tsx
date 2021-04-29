import { parseISO, format } from 'date-fns'

export default function DateFormatter ({ dateString }) {
  const date = parseISO(dateString)
  // date.setDate(date.getDate() + 1)
  // TODO: Fix date | Shows wrong date after date picker updates
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}
