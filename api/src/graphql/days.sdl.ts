export const schema = gql`
  type Day {
    id: Int!
    date: DateTime!
    createdAt: DateTime!
    times: [Time]!
    event: Event!
    eventId: Int!
  }

  type Query {
    days: [Day!]! @requireAuth
    day(id: Int!): Day @requireAuth
  }

  input CreateDayInput {
    date: DateTime!
    eventId: Int!
  }

  input UpdateDayInput {
    date: DateTime
    eventId: Int
  }

  type Mutation {
    createDay(input: CreateDayInput!): Day! @requireAuth
    updateDay(id: Int!, input: UpdateDayInput!): Day! @requireAuth
    deleteDay(id: Int!): Day! @requireAuth
  }
`
