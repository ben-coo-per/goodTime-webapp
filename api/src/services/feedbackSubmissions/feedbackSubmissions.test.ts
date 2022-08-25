import {
  feedbackSubmissions,
  feedbackSubmission,
  createFeedbackSubmission,
  updateFeedbackSubmission,
  deleteFeedbackSubmission,
} from './feedbackSubmissions'
import type { StandardScenario } from './feedbackSubmissions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('feedbackSubmissions', () => {
  scenario(
    'returns all feedbackSubmissions',
    async (scenario: StandardScenario) => {
      const result = await feedbackSubmissions()

      expect(result.length).toEqual(
        Object.keys(scenario.feedbackSubmission).length
      )
    }
  )

  scenario(
    'returns a single feedbackSubmission',
    async (scenario: StandardScenario) => {
      const result = await feedbackSubmission({
        id: scenario.feedbackSubmission.one.id,
      })

      expect(result).toEqual(scenario.feedbackSubmission.one)
    }
  )

  scenario('creates a feedbackSubmission', async () => {
    const result = await createFeedbackSubmission({
      input: { message: 'String', email: 'String' },
    })

    expect(result.message).toEqual('String')
    expect(result.email).toEqual('String')
  })

  scenario(
    'updates a feedbackSubmission',
    async (scenario: StandardScenario) => {
      const original = await feedbackSubmission({
        id: scenario.feedbackSubmission.one.id,
      })
      const result = await updateFeedbackSubmission({
        id: original.id,
        input: { message: 'String2' },
      })

      expect(result.message).toEqual('String2')
    }
  )

  scenario(
    'deletes a feedbackSubmission',
    async (scenario: StandardScenario) => {
      const original = await deleteFeedbackSubmission({
        id: scenario.feedbackSubmission.one.id,
      })
      const result = await feedbackSubmission({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
