import { events, event, createEvent, updateEvent, deleteEvent } from "./events";
import type { StandardScenario } from "./events.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("events", () => {
  scenario("returns all events", async (scenario: StandardScenario) => {
    const result = await events();

    expect(result.length).toEqual(Object.keys(scenario.event).length);
  });

  scenario("returns a single event", async (scenario: StandardScenario) => {
    const result = await event({ id: scenario.event.one.id });

    expect(result).toEqual(scenario.event.one);
  });

  scenario("creates a event", async (scenario: StandardScenario) => {
    const result = await createEvent({
      input: { ownerId: scenario.event.two.ownerId },
    });

    expect(result.ownerId).toEqual(scenario.event.two.ownerId);
  });

  scenario("updates a event", async (scenario: StandardScenario) => {
    const original = await event({ id: scenario.event.one.id });
    const result = await updateEvent({
      id: original.id,
      input: { ownerId: scenario.event.two.ownerId },
    });

    expect(result.ownerId).toEqual(scenario.event.two.ownerId);
  });

  scenario("deletes a event", async (scenario: StandardScenario) => {
    const original = await deleteEvent({ id: scenario.event.one.id });
    const result = await event({ id: original.id });

    expect(result).toEqual(null);
  });
});
