import {
  userAvailabilities,
  userAvailability,
  createUserAvailability,
  updateUserAvailability,
  deleteUserAvailability,
} from './userAvailabilities'
import type { StandardScenario } from './userAvailabilities.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userAvailabilities', () => {
  scenario(
    'returns all userAvailabilities',
    async (scenario: StandardScenario) => {
      const result = await userAvailabilities()

      expect(result.length).toEqual(
        Object.keys(scenario.userAvailability).length
      )
    }
  )

  scenario(
    'returns a single userAvailability',
    async (scenario: StandardScenario) => {
      const result = await userAvailability({
        id: scenario.userAvailability.one.id,
      })

      expect(result).toEqual(scenario.userAvailability.one)
    }
  )

  scenario('creates a userAvailability', async (scenario: StandardScenario) => {
    const result = await createUserAvailability({
      input: {
        userId: scenario.userAvailability.two.userId,
        timeId: scenario.userAvailability.two.timeId,
      },
    })

    expect(result.userId).toEqual(scenario.userAvailability.two.userId)
    expect(result.timeId).toEqual(scenario.userAvailability.two.timeId)
  })

  scenario('updates a userAvailability', async (scenario: StandardScenario) => {
    const original = await userAvailability({
      id: scenario.userAvailability.one.id,
    })
    const result = await updateUserAvailability({
      id: original.id,
      input: { userId: scenario.userAvailability.two.userId },
    })

    expect(result.userId).toEqual(scenario.userAvailability.two.userId)
  })

  scenario('deletes a userAvailability', async (scenario: StandardScenario) => {
    const original = await deleteUserAvailability({
      id: scenario.userAvailability.one.id,
    })
    const result = await userAvailability({ id: original.id })

    expect(result).toEqual(null)
  })
})
