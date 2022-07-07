export const schema = gql`
  type TimeRange {
    id: Int!
    startTime: String!
    endTime: String!
    createdAt: DateTime!
    day: Day!
    dayId: Int!
    userAvailabilities: [UserAvailability]!
  }

  type Query {
    timeRanges: [TimeRange!]! @requireAuth
    timeRange(id: Int!): TimeRange @requireAuth
  }

  input CreateTimeRangeInput {
    startTime: String!
    endTime: String!
    dayId: Int!
  }

  input UpdateTimeRangeInput {
    startTime: String
    endTime: String
    dayId: Int
  }

  type Mutation {
    createTimeRange(input: CreateTimeRangeInput!): TimeRange! @requireAuth
    updateTimeRange(id: Int!, input: UpdateTimeRangeInput!): TimeRange!
      @requireAuth
    deleteTimeRange(id: Int!): TimeRange! @requireAuth
  }
`
