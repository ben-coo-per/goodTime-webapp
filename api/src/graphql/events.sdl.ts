export const schema = gql`
  type Event {
    id: Int!
    name: String
    createdAt: DateTime!
    days: [Day]!
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

  input UpdateEventInput {
    name: String
    userId: String
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: Int!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: Int!): Event! @requireAuth
  }
`
