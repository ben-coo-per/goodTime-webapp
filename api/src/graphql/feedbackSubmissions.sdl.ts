export const schema = gql`
  type FeedbackSubmission {
    id: Int!
    message: String!
    email: String
    createdAt: DateTime!
  }

  type Query {
    feedbackSubmissions: [FeedbackSubmission!]! @requireAuth
    feedbackSubmission(id: Int!): FeedbackSubmission @requireAuth
  }

  input CreateFeedbackSubmissionInput {
    message: String!
    email: String
  }

  input UpdateFeedbackSubmissionInput {
    message: String
    email: String
  }

  type Mutation {
    createFeedbackSubmission(
      input: CreateFeedbackSubmissionInput!
    ): FeedbackSubmission! @requireAuth
    updateFeedbackSubmission(
      id: Int!
      input: UpdateFeedbackSubmissionInput!
    ): FeedbackSubmission! @requireAuth
    deleteFeedbackSubmission(id: Int!): FeedbackSubmission! @requireAuth
  }
`
