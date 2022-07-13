import {
  timeRanges,
  timeRange,
  createTimeRange,
  updateTimeRange,
  deleteTimeRange,
} from "./timeRanges";
import type { StandardScenario } from "./timeRanges.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("timeRanges", () => {
  scenario("returns all timeRanges", async (scenario: StandardScenario) => {
    const result = await timeRanges();

    expect(result.length).toEqual(Object.keys(scenario.timeRange).length);
  });

  scenario("returns a single timeRange", async (scenario: StandardScenario) => {
    const result = await timeRange({ id: scenario.timeRange.one.id });

    expect(result).toEqual(scenario.timeRange.one);
  });

  scenario("creates a timeRange", async (scenario: StandardScenario) => {
    const result = await createTimeRange({
      input: {
        startTime: 8306353,
        endTime: 9704685,
        eventId: scenario.timeRange.two.eventId,
      },
    });

    expect(result.startTime).toEqual(8306353);
    expect(result.endTime).toEqual(9704685);
    expect(result.eventId).toEqual(scenario.timeRange.two.eventId);
  });

  scenario("updates a timeRange", async (scenario: StandardScenario) => {
    const original = await timeRange({ id: scenario.timeRange.one.id });
    const result = await updateTimeRange({
      id: original.id,
      input: { startTime: 3421115 },
    });

    expect(result.startTime).toEqual(3421115);
  });

  scenario("deletes a timeRange", async (scenario: StandardScenario) => {
    const original = await deleteTimeRange({ id: scenario.timeRange.one.id });
    const result = await timeRange({ id: original.id });

    expect(result).toEqual(null);
  });
});
