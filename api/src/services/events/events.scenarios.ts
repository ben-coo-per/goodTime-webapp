import type { Prisma } from "@prisma/client";

export const standard = defineScenario<Prisma.EventCreateArgs>({
  event: {
    one: {
      data: {
        owner: {
          create: {
            phoneNumber: "String759720",
            hashedPassword: "String",
            salt: "String",
          },
        },
      },
    },
    two: {
      data: {
        owner: {
          create: {
            phoneNumber: "String6405916",
            hashedPassword: "String",
            salt: "String",
          },
        },
      },
    },
  },
});

export type StandardScenario = typeof standard;
