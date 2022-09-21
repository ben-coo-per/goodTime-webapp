import moment from 'moment'

import { render, screen, within } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './EventsCell'
import { standard } from './EventsCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('EventsCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  // 1. import { screen } from '@redwoodjs/testing/web'
  // 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success events={standard().events} />)
    }).not.toThrow()
  })

  it('renders events that the user created', async () => {
    mockCurrentUser({
      displayName: 'Ben',
      id: 'cl8bkm95l0172j50qmf9phatt',
      phoneNumber: '7132546843',
    })

    render(<Success events={standard().events} />)
    const createdByStatment = await screen.findByText('created by you')
    expect(createdByStatment).toBeInTheDocument()
  })

  it('renders events that the user responded to, but didnt create', async () => {
    mockCurrentUser({
      displayName: 'Ben',
      id: 'cl8bkm95l0172j50qmf9phatt',
      phoneNumber: '7132546843',
    })

    render(<Success events={standard().events} />)
    const createdByStatment = await screen.findByText('created by Zeus')
    expect(createdByStatment).toBeInTheDocument()
  })

  it('gets the correct number of responses', async () => {
    mockCurrentUser({
      displayName: 'Ben',
      id: 'cl8bkm95l0172j50qmf9phatt',
      phoneNumber: '7132546843',
    })

    render(<Success events={standard().events} />)
    const responsesCount = await screen.findAllByTestId('responses-count')
    const countOfOne = await within(responsesCount[0]).findByText('1')
    expect(countOfOne).toBeInTheDocument()
  })

  it('gets the correct time until the event', async () => {
    mockCurrentUser({
      displayName: 'Ben',
      id: 'cl8bkm95l0172j50qmf9phatt',
      phoneNumber: '7132546843',
    })
    const firstDayInEvent = standard()
      .events[0].times.map((timeRange) => timeRange.endTime)
      .sort((a, b) => a - b)[0]

    render(<Success events={standard().events} />)
    const untilStatement = await screen.findAllByText(
      moment.unix(firstDayInEvent).fromNow()
    )
    expect(untilStatement[0]).toBeInTheDocument()
  })
})
