import type {
  QueryResolvers,
  MutationResolvers,
  EventRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const events: QueryResolvers['events'] = ({
  userId,
  selectPastEvents = false,
}) => {
  const now = Math.floor(Date.now() / 1000) // Get current unix time
  const timeFilter = selectPastEvents
    ? {
        lte: now,
      }
    : {
        gte: now,
      }

  return db.event.findMany({
    where: {
      times: {
        some: {
          endTime: timeFilter,
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
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

export const createEventWithTimes: MutationResolvers['createEventWithTimes'] =
  ({ eventInput, timeInput }) => {
    const timeRanges = timeInput.map((tr) => ({
      ...tr,
      userId: eventInput.ownerId,
    }))
    return db.event.create({
      data: {
        ...eventInput,
        times: {
          create: [...timeRanges],
        },
      },
    })
  }

export const addTimesToEvent: MutationResolvers['addTimesToEvent'] = ({
  id,
  input,
}) => {
  const timeRanges = input.map((tr) => ({
    ...tr,
    userId: context?.currentUser?.id,
  }))
  return db.event.update({
    data: {
      times: {
        create: [...timeRanges],
      },
    },
    where: { id },
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

export const Event: EventRelationResolvers = {
  times: (_obj, { root }) =>
    db.event.findUnique({ where: { id: root.id } }).times(),
  owner: (_obj, { root }) =>
    db.event.findUnique({ where: { id: root.id } }).owner(),
}
