import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.FeedbackSubmissionCreateArgs>({
  feedbackSubmission: {
    one: { data: { message: 'String', email: 'String' } },
    two: { data: { message: 'String', email: 'String' } },
  },
})

export type StandardScenario = typeof standard
