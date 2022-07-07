import type {
  QueryResolvers,
  MutationResolvers,
  EventResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const events: QueryResolvers['events'] = () => {
  return db.event.findMany()
}

export const event: QueryResolvers['event'] = ({ id }) => {
  return db.event.findUnique({
    where: { id },
  })
}

export const createEvent: MutationResolvers['createEvent'] = ({ input }) => {
  return db.event.create({
    data: input,
  })
}

export const updateEvent: MutationResolvers['updateEvent'] = ({
  id,
  input,
}) => {
  return db.event.update({
    data: input,
    where: { id },
  })
}

export const deleteEvent: MutationResolvers['deleteEvent'] = ({ id }) => {
  return db.event.delete({
    where: { id },
  })
}

export const Event: EventResolvers = {
  days: (_obj, { root }) =>
    db.event.findUnique({ where: { id: root.id } }).days(),
  user: (_obj, { root }) =>
    db.event.findUnique({ where: { id: root.id } }).user(),
}
