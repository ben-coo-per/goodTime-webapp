import {
  timeRanges,
  timeRange,
  createTimeRange,
  updateTimeRange,
  deleteTimeRange,
} from './timeRanges'
import type { StandardScenario } from './timeRanges.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('timeRanges', () => {
  scenario('returns all timeRanges', async (scenario: StandardScenario) => {
    const result = await timeRanges()

    expect(result.length).toEqual(Object.keys(scenario.timeRange).length)
  })

  scenario('returns a single timeRange', async (scenario: StandardScenario) => {
    const result = await timeRange({ id: scenario.timeRange.one.id })

    expect(result).toEqual(scenario.timeRange.one)
  })

  scenario('creates a timeRange', async (scenario: StandardScenario) => {
    const result = await createTimeRange({
      input: {
        startTime: 'String',
        endTime: 'String',
        dayId: scenario.timeRange.two.dayId,
      },
    })

    expect(result.startTime).toEqual('String')
    expect(result.endTime).toEqual('String')
    expect(result.dayId).toEqual(scenario.timeRange.two.dayId)
  })

  scenario('updates a timeRange', async (scenario: StandardScenario) => {
    const original = await timeRange({ id: scenario.timeRange.one.id })
    const result = await updateTimeRange({
      id: original.id,
      input: { startTime: 'String2' },
    })

    expect(result.startTime).toEqual('String2')
  })

  scenario('deletes a timeRange', async (scenario: StandardScenario) => {
    const original = await deleteTimeRange({ id: scenario.timeRange.one.id })
    const result = await timeRange({ id: original.id })

    expect(result).toEqual(null)
  })
})
