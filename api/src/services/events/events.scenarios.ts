import type { Prisma } from "@prisma/client";

export const standard = defineScenario<Prisma.EventCreateArgs>({
  event: {
    one: {
      data: {
        user: {
          create: {
            phoneNumber: "String6691225",
            hashedPassword: "String",
            salt: "String",
          },
        },
      },
    },
    two: {
      data: {
        user: {
          create: {
            phoneNumber: "String9234019",
            hashedPassword: "String",
            salt: "String",
          },
        },
      },
    },
  },
});

export type StandardScenario = typeof standard;
