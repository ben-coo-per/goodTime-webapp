import moment from 'moment'
import CalendarHeaderCell from './CalendarHeaderCell'

export const Default = () => {
  const today = moment()
  return <CalendarHeaderCell day={today} />
}

export default { title: 'Components/Calendars/Components/CalendarHeaderCell' }
