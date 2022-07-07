import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DayCreateArgs>({
  day: {
    one: {
      data: {
        date: '2022-07-07T00:07:04Z',
        event: {
          create: {
            user: {
              create: {
                phoneNumber: 'String8973083',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        date: '2022-07-07T00:07:04Z',
        event: {
          create: {
            user: {
              create: {
                phoneNumber: 'String9015930',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
