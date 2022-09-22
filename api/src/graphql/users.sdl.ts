export const schema = gql`
  type User {
    id: String!
    displayName: String
    phoneNumber: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    notifPreferences: Boolean!
    eventsOwned: [Event]!
    timeRanges: [TimeRange]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    displayName: String
    phoneNumber: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    notifPreferences: Boolean
  }

  input UpdateUserInput {
    displayName: String
    phoneNumber: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    notifPreferences: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
