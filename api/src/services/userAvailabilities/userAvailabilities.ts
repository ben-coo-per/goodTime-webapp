import type {
  QueryResolvers,
  MutationResolvers,
  UserAvailabilityResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userAvailabilities: QueryResolvers['userAvailabilities'] = () => {
  return db.userAvailability.findMany()
}

export const userAvailability: QueryResolvers['userAvailability'] = ({
  id,
}) => {
  return db.userAvailability.findUnique({
    where: { id },
  })
}

export const createUserAvailability: MutationResolvers['createUserAvailability'] =
  ({ input }) => {
    return db.userAvailability.create({
      data: input,
    })
  }

export const updateUserAvailability: MutationResolvers['updateUserAvailability'] =
  ({ id, input }) => {
    return db.userAvailability.update({
      data: input,
      where: { id },
    })
  }

export const deleteUserAvailability: MutationResolvers['deleteUserAvailability'] =
  ({ id }) => {
    return db.userAvailability.delete({
      where: { id },
    })
  }

export const UserAvailability: UserAvailabilityResolvers = {
  user: (_obj, { root }) =>
    db.userAvailability.findUnique({ where: { id: root.id } }).user(),
  time: (_obj, { root }) =>
    db.userAvailability.findUnique({ where: { id: root.id } }).time(),
}
