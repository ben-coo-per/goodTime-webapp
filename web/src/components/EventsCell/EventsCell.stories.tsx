import { Loading, Empty, Failure, Success } from './EventsCell'
import { standard } from './EventsCell.mock'

export const loading = (args) => {
  return Loading ? <Loading {...args} /> : null
}

export const empty = (args) => {
  return Empty ? <Empty {...args} /> : null
}

export const failure = (args) => {
  return Failure ? <Failure error={new Error('Oh no')} {...args} /> : null
}

export const success = (args) => {
  mockCurrentUser({
    displayName: 'Ben',
    id: 'cl8bkm95l0172j50qmf9phatt',
    phoneNumber: '7132546843',
  })
  return Success ? <Success {...standard()} {...args} /> : null
}

export default { title: 'Cells/EventsCell' }
