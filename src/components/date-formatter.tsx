import { parseISO, format } from 'date-fns'

interface DateFormatterProps {
  dateString: string
}

const DateFormatter: React.FC<DateFormatterProps> = ({ dateString }) => {
  const date = parseISO(dateString)
  // date.setDate(date.getDate() + 1)
  // TODO: Fix date | Shows wrong date after date picker updates
  return <time dateTime={dateString}>{format(date, 'LLL d, yyyy')}</time>
}

export default DateFormatter
