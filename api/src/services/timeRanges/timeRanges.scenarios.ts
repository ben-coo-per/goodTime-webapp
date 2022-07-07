import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TimeRangeCreateArgs>({
  timeRange: {
    one: {
      data: {
        startTime: 'String',
        endTime: 'String',
        day: {
          create: {
            date: '2022-07-07T00:13:55Z',
            event: {
              create: {
                user: {
                  create: {
                    phoneNumber: 'String2588008',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        startTime: 'String',
        endTime: 'String',
        day: {
          create: {
            date: '2022-07-07T00:13:55Z',
            event: {
              create: {
                user: {
                  create: {
                    phoneNumber: 'String8532840',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
