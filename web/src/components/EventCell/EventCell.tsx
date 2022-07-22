import type { FindEventQuery, FindEventQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindEventQuery($id: Int!) {
    event: event(id: $id) {
      id
      name
      createdAt
      times {
        id
        startTime
        endTime
        createdAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindEventQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  event,
}: CellSuccessProps<FindEventQuery, FindEventQueryVariables>) => {
  return <div>{JSON.stringify(event)}</div>
}
