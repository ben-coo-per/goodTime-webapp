export const schema = gql`
  type UserAvailability {
    id: Int!
    user: User!
    userId: String!
    time: Time!
    timeId: Int!
  }

  type Query {
    userAvailabilities: [UserAvailability!]! @requireAuth
    userAvailability(id: Int!): UserAvailability @requireAuth
  }

  input CreateUserAvailabilityInput {
    userId: String!
    timeId: Int!
  }

  input UpdateUserAvailabilityInput {
    userId: String
    timeId: Int
  }

  type Mutation {
    createUserAvailability(
      input: CreateUserAvailabilityInput!
    ): UserAvailability! @requireAuth
    updateUserAvailability(
      id: Int!
      input: UpdateUserAvailabilityInput!
    ): UserAvailability! @requireAuth
    deleteUserAvailability(id: Int!): UserAvailability! @requireAuth
  }
`
