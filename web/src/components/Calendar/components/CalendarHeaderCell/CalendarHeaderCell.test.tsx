import moment from 'moment'

import { render } from '@redwoodjs/testing/web'

import CalendarHeaderCell from './CalendarHeaderCell'

describe('CalendarHeaderCell', () => {
  it('renders successfully', () => {
    const today = moment()
    expect(() => {
      render(<CalendarHeaderCell day={today} />)
    }).not.toThrow()
  })
})
