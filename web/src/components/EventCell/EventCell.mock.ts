// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  event: {
    createdAt: '2022-09-08T19:45:04.937Z',
    id: 70,
    name: 'test',
    owner: {
      __typename: 'User',
      id: 'cl7tgkzqk0027jk0qawvev43f',
      displayName: 'Beb',
    },
    times: [
      {
        __typename: 'TimeRange',
        id: 40,
        startTime: 1662786000,
        endTime: 1662800400,
        user: {
          __typename: 'User',
          id: 'cl7tgkzqk0027jk0qawvev43f',
          displayName: 'Beb',
          phoneNumber: '7132546843',
        },
      },
      {
        __typename: 'TimeRange',
        id: 41,
        startTime: 1662879600,
        endTime: 1662886800,
        user: {
          __typename: 'User',
          id: 'cl7tgkzqk0027jk0qawvev43f',
          displayName: 'Beb',
          phoneNumber: '7132546843',
        },
      },
    ],
  },
})
