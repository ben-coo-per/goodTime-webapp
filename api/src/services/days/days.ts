import type {
  QueryResolvers,
  MutationResolvers,
  DayResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const days: QueryResolvers['days'] = ({ eventId }) => {
  if (eventId) {
    return db.day.findMany({
      where: { eventId: eventId },
    })
  }
  return db.day.findMany()
}

export const day: QueryResolvers['day'] = ({ id }) => {
  return db.day.findUnique({
    where: { id },
  })
}

export const createDay: MutationResolvers['createDay'] = ({ input }) => {
  return db.day.create({
    data: input,
  })
}

export const createDayWithTimes: MutationResolvers['createDayWithTimes'] = ({
  dayInput,
  times,
}) => {
  const res = db.day.create({
    data: {
      ...dayInput,
      times: { create: times },
    },
  })
  return res
}

export const updateDay: MutationResolvers['updateDay'] = ({ id, input }) => {
  return db.day.update({
    data: input,
    where: { id },
  })
}

export const deleteDay: MutationResolvers['deleteDay'] = ({ id }) => {
  return db.day.delete({
    where: { id },
  })
}

export const Day: DayResolvers = {
  times: (_obj, { root }) =>
    db.day.findUnique({ where: { id: root.id } }).times(),
  event: (_obj, { root }) =>
    db.day.findUnique({ where: { id: root.id } }).event(),
}
