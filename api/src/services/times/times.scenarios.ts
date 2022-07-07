import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TimeCreateArgs>({
  time: {
    one: {
      data: {
        startTime: 'String',
        endTime: 'String',
        day: {
          create: {
            date: '2022-07-07T00:07:07Z',
            event: {
              create: {
                user: {
                  create: {
                    phoneNumber: 'String985376',
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
            date: '2022-07-07T00:07:07Z',
            event: {
              create: {
                user: {
                  create: {
                    phoneNumber: 'String1443011',
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
