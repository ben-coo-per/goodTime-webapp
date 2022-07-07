import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserAvailabilityCreateArgs>({
  userAvailability: {
    one: {
      data: {
        user: {
          create: {
            phoneNumber: 'String609137',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        time: {
          create: {
            startTime: 'String',
            endTime: 'String',
            day: {
              create: {
                date: '2022-07-07T00:07:22Z',
                event: {
                  create: {
                    user: {
                      create: {
                        phoneNumber: 'String1805852',
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
    },
    two: {
      data: {
        user: {
          create: {
            phoneNumber: 'String1209489',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        time: {
          create: {
            startTime: 'String',
            endTime: 'String',
            day: {
              create: {
                date: '2022-07-07T00:07:22Z',
                event: {
                  create: {
                    user: {
                      create: {
                        phoneNumber: 'String7944107',
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
    },
  },
})

export type StandardScenario = typeof standard
