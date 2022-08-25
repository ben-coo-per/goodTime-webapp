import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const feedbackSubmissions: QueryResolvers['feedbackSubmissions'] =
  () => {
    return db.feedbackSubmission.findMany()
  }

export const feedbackSubmission: QueryResolvers['feedbackSubmission'] = ({
  id,
}) => {
  return db.feedbackSubmission.findUnique({
    where: { id },
  })
}

export const createFeedbackSubmission: MutationResolvers['createFeedbackSubmission'] =
  ({ input }) => {
    return db.feedbackSubmission.create({
      data: input,
    })
  }

export const updateFeedbackSubmission: MutationResolvers['updateFeedbackSubmission'] =
  ({ id, input }) => {
    return db.feedbackSubmission.update({
      data: input,
      where: { id },
    })
  }

export const deleteFeedbackSubmission: MutationResolvers['deleteFeedbackSubmission'] =
  ({ id }) => {
    return db.feedbackSubmission.delete({
      where: { id },
    })
  }
