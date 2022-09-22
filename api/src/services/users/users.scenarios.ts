import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        phoneNumber: 'String5928520',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        phoneNumber: 'String7783237',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
