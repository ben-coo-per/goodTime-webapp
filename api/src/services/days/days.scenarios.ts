import type { Prisma } from "@prisma/client";

export const standard = defineScenario<Prisma.DayCreateArgs>({
  day: {
    one: {
      data: {
        date: "2022-07-09T15:55:01Z",
        event: {
          create: {
            user: {
              create: {
                phoneNumber: "String3134198",
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
        date: "2022-07-09T15:55:01Z",
        event: {
          create: {
            user: {
              create: {
                phoneNumber: "String8479577",
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
