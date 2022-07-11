import { days, day, createDay, updateDay, deleteDay } from "./days";
import type { StandardScenario } from "./days.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("days", () => {
  scenario("returns all days", async (scenario: StandardScenario) => {
    const result = await days();

    expect(result.length).toEqual(Object.keys(scenario.day).length);
  });

  scenario("returns a single day", async (scenario: StandardScenario) => {
    const result = await day({ id: scenario.day.one.id });

    expect(result).toEqual(scenario.day.one);
  });

  scenario("creates a day", async (scenario: StandardScenario) => {
    const result = await createDay({
      input: {
        date: "2022-07-09T15:55:01Z",
        eventId: scenario.day.two.eventId,
      },
    });

    expect(result.date).toEqual("2022-07-09T15:55:01Z");
    expect(result.eventId).toEqual(scenario.day.two.eventId);
  });

  scenario("updates a day", async (scenario: StandardScenario) => {
    const original = await day({ id: scenario.day.one.id });
    const result = await updateDay({
      id: original.id,
      input: { date: "2022-07-10T15:55:01Z" },
    });

    expect(result.date).toEqual("2022-07-10T15:55:01Z");
  });

  scenario("deletes a day", async (scenario: StandardScenario) => {
    const original = await deleteDay({ id: scenario.day.one.id });
    const result = await day({ id: original.id });

    expect(result).toEqual(null);
  });
});
