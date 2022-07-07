import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        phoneNumber: 'String1963467',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        phoneNumber: 'String3730838',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
