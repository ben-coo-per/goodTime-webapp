import type {
  QueryResolvers,
  MutationResolvers,
  TimeRangeResolvers,
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

export const TimeRange: TimeRangeResolvers = {
  day: (_obj, { root }) =>
    db.timeRange.findUnique({ where: { id: root.id } }).day(),
  userAvailabilities: (_obj, { root }) =>
    db.timeRange.findUnique({ where: { id: root.id } }).userAvailabilities(),
}
