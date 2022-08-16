import { Moment } from 'moment'

const CalendarHeaderCell = ({ day }: { day: Moment }) => {
  const d = day.format('ddd-MMM DD-YYYY').split('-')
  return (
    <th className="calendar-table-cell">
      <p className="text-sm font-normal leading-3 text-text-subtle">{d[0]}</p>
      <p>{d[1]}</p>
      <p className="text-sm font-normal leading-3 text-text-subtle">{d[2]}</p>
    </th>
  )
}

export default CalendarHeaderCell
