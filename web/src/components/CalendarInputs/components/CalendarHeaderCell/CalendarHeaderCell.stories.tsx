import moment from 'moment'
import CalendarHeaderCell from './CalendarHeaderCell'

export const generated = () => {
  const today = moment()
  return <CalendarHeaderCell day={today} />
}

export default { title: 'Components/CalendarHeaderCell' }
