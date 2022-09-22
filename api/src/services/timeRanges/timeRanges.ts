import type {
  QueryResolvers,
  MutationResolvers,
  TimeRangeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const timeRanges: QueryResolvers['timeRanges'] = () => {
  return db.timeRange.findMany()
}

export const timeRange: QueryResolvers['timeRange'] = ({ id }) => {
  return db.timeRange.findUnique({
    where: { id },
  })
}

export const createTimeRange: MutationResolvers['createTimeRange'] = ({
  input,
}) => {
  return db.timeRange.create({
    data: input,
  })
}

export const updateTimeRange: MutationResolvers['updateTimeRange'] = ({
  id,
  input,
}) => {
  return db.timeRange.update({
    data: input,
    where: { id },
  })
}

export const deleteTimeRange: MutationResolvers['deleteTimeRange'] = ({
  id,
}) => {
  return db.timeRange.delete({
    where: { id },
  })
}

export const deleteTimeRanges: MutationResolvers['deleteTimeRanges'] = async ({
  userId,
  eventId,
}) => {
  if (context?.currentUser?.id === userId) {
    try {
      await db.$queryRaw`
    delete from "TimeRange"
    where "userId" = ${userId}
    and "eventId" = ${eventId}
  `
      return true
    } catch {
      return false
    }
  }
  return false // todo: throw a 401 Error
}

export const TimeRange: TimeRangeRelationResolvers = {
  event: (_obj, { root }) =>
    db.timeRange.findUnique({ where: { id: root.id } }).event(),
  user: (_obj, { root }) =>
    db.timeRange.findUnique({ where: { id: root.id } }).user(),
}
