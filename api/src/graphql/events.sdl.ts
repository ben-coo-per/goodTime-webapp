export const schema = gql`
  type Event {
    id: Int!
    name: String
    createdAt: DateTime!
    times: [TimeRange]!
    user: User!
    userId: String!
  }

  type Query {
    events: [Event!]! @requireAuth
    event(id: Int!): Event @requireAuth
  }

  input CreateEventInput {
    name: String
    userId: String!
  }

  input CreateTimeRangeInputForEvent {
    startTime: Int!
    endTime: Int!
  }

  input UpdateEventInput {
    name: String
    userId: String
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    createEventWithTimes(
      eventInput: CreateEventInput!
      timeInput: [CreateTimeRangeInputForEvent!]!
    ): Event! @requireAuth
    updateEvent(id: Int!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: Int!): Event! @requireAuth
  }
`
