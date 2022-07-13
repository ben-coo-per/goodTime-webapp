import type { Prisma } from "@prisma/client";

export const standard = defineScenario<Prisma.TimeRangeCreateArgs>({
  timeRange: {
    one: {
      data: {
        startTime: 1028643,
        endTime: 2262296,
        event: {
          create: {
            user: {
              create: {
                phoneNumber: "String3025754",
                hashedPassword: "String",
                salt: "String",
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        startTime: 1501775,
        endTime: 8933886,
        event: {
          create: {
            user: {
              create: {
                phoneNumber: "String2433747",
                hashedPassword: "String",
                salt: "String",
              },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = typeof standard;
