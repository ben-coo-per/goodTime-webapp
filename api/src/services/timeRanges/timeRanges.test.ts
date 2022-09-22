import {
  timeRanges,
  timeRange,
  createTimeRange,
  updateTimeRange,
  deleteTimeRange,
  deleteTimeRanges,
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
        startTime: 9683887,
        endTime: 6396070,
        eventId: scenario.timeRange.two.eventId,
        userId: scenario.timeRange.two.userId,
      },
    })

    expect(result.startTime).toEqual(9683887)
    expect(result.endTime).toEqual(6396070)
    expect(result.eventId).toEqual(scenario.timeRange.two.eventId)
    expect(result.userId).toEqual(scenario.timeRange.two.userId)
  })

  scenario('updates a timeRange', async (scenario: StandardScenario) => {
    const original = await timeRange({ id: scenario.timeRange.one.id })
    const result = await updateTimeRange({
      id: original.id,
      input: { startTime: 6718162 },
    })

    expect(result.startTime).toEqual(6718162)
  })

  scenario('deletes a timeRange', async (scenario: StandardScenario) => {
    const original = await deleteTimeRange({ id: scenario.timeRange.one.id })
    const result = await timeRange({ id: original.id })

    expect(result).toEqual(null)
  })

  scenario(
    'deletes multiple timeRanges',
    async (scenario: StandardScenario) => {
      const userId = scenario.timeRange.one.userId
      const eventId = scenario.timeRange.one.eventId

      mockCurrentUser({
        phoneNumber: '7123445891',
        id: userId,
        displayName: 'ben',
      })

      const didDelete = await deleteTimeRanges({ userId, eventId })
      const results = await timeRanges()

      expect(didDelete).toEqual(true)
      // Result should not include deleted values
      expect(results).not.toContain(scenario.timeRange.one)
    }
  )
})
