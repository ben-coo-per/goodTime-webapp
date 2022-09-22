import type { Prisma, FeedbackSubmission } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FeedbackSubmissionCreateArgs>({
  feedbackSubmission: {
    one: { data: { message: 'String' } },
    two: { data: { message: 'String' } },
  },
})

export type StandardScenario = ScenarioData<
  FeedbackSubmission,
  'feedbackSubmission'
>
