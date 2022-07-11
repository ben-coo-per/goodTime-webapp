export const schema = gql`
  type Day {
    id: Int!
    date: DateTime!
    createdAt: DateTime!
    times: [TimeRange]!
    event: Event!
    eventId: Int!
  }

  type Query {
    days(eventId: Int): [Day!]! @requireAuth
    day(id: Int!): Day @skipAuth
  }

  input CreateDayInput {
    date: DateTime!
    eventId: Int!
  }

  input CreateTimeRangeForDayInput {
    startTime: String!
    endTime: String!
  }

  input UpdateDayInput {
    date: DateTime
    eventId: Int
  }

  type Mutation {
    createDay(input: CreateDayInput!): Day! @requireAuth
    createDayWithTimes(
      dayInput: CreateDayInput!
      times: [CreateTimeRangeForDayInput!]
    ): Day! @skipAuth

    updateDay(id: Int!, input: UpdateDayInput!): Day! @requireAuth
    deleteDay(id: Int!): Day! @requireAuth
  }
`
