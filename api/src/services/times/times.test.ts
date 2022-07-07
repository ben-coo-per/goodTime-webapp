import { times, time, createTime, updateTime, deleteTime } from './times'
import type { StandardScenario } from './times.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('times', () => {
  scenario('returns all times', async (scenario: StandardScenario) => {
    const result = await times()

    expect(result.length).toEqual(Object.keys(scenario.time).length)
  })

  scenario('returns a single time', async (scenario: StandardScenario) => {
    const result = await time({ id: scenario.time.one.id })

    expect(result).toEqual(scenario.time.one)
  })

  scenario('creates a time', async (scenario: StandardScenario) => {
    const result = await createTime({
      input: {
        startTime: 'String',
        endTime: 'String',
        dayId: scenario.time.two.dayId,
      },
    })

    expect(result.startTime).toEqual('String')
    expect(result.endTime).toEqual('String')
    expect(result.dayId).toEqual(scenario.time.two.dayId)
  })

  scenario('updates a time', async (scenario: StandardScenario) => {
    const original = await time({ id: scenario.time.one.id })
    const result = await updateTime({
      id: original.id,
      input: { startTime: 'String2' },
    })

    expect(result.startTime).toEqual('String2')
  })

  scenario('deletes a time', async (scenario: StandardScenario) => {
    const original = await deleteTime({ id: scenario.time.one.id })
    const result = await time({ id: original.id })

    expect(result).toEqual(null)
  })
})
