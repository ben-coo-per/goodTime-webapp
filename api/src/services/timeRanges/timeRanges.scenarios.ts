import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TimeRangeCreateArgs>({
  timeRange: {
    one: {
      data: {
        startTime: 1312901,
        endTime: 234373,
        event: {
          create: {
            owner: {
              create: {
                phoneNumber: 'String5855136',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        user: {
          create: {
            phoneNumber: 'String5008585',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        startTime: 7083272,
        endTime: 2645731,
        event: {
          create: {
            owner: {
              create: {
                phoneNumber: 'String8764420',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        user: {
          create: {
            phoneNumber: 'String9711026',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
