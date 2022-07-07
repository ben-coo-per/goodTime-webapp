import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.EventCreateArgs>({
  event: {
    one: {
      data: {
        user: {
          create: {
            phoneNumber: 'String4756775',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        user: {
          create: {
            phoneNumber: 'String2782499',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
