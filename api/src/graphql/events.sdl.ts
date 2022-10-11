export const schema = gql`
  type Event {
    id: Int!
    name: String
    createdAt: DateTime!
    times: [TimeRange]!
    owner: User!
    ownerId: String!
  }

  type Query {
    events(userId: String, selectPastEvents: Boolean): [Event!]! @requireAuth
    event(id: Int!): Event @skipAuth
  }

  input CreateEventInput {
    ownerId: String!
    name: String!
  }

  input CreateTimeRangeInputForEvent {
    startTime: Int!
    endTime: Int!
  }

  input UpdateEventInput {
    name: String
    ownerId: String
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    createEventWithTimes(
      eventInput: CreateEventInput!
      timeInput: [CreateTimeRangeInputForEvent!]!
    ): Event! @requireAuth

    addTimesToEvent(
      id: Int!
      input: [CreateTimeRangeInputForEvent!]!
      unAuthUserDisplay: String
    ): Event! @skipAuth
    updateEvent(id: Int!, input: UpdateEventInput!): Event! @requireAuth

    deleteEvent(id: Int!): Event! @requireAuth
  }
`
