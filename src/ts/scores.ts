import { strict as assert } from 'assert';
import clamp from 'lodash/clamp';

import type { Record } from './circular-economy-model';

class Scores {
  static circularity(record: Record) {
    const {
      produceFromNaturalResources,
      produceFromRecycledMaterials,
      acquireUsed,
      acquireRepaired,
      acquireRefurbished,
      repair,
      refurbish,
      recycle,
      landfill,
    } = record.flows;

    /**
     * The weights of flows with the same meaning wrt the economy are defined such that they add up to 1, such that
     * flows that belong to the same aspect aren't counted multiple times.
     */
    const badFlowsWeightedSum = (produceFromNaturalResources + landfill) / 2;
    const goodFlowsWeightedSum =
      acquireUsed +
      (repair + acquireRepaired) / 2 +
      (refurbish + acquireRefurbished) / 2 +
      (recycle + produceFromRecycledMaterials) / 2;

    const goodFlowShare =
      goodFlowsWeightedSum / (goodFlowsWeightedSum + badFlowsWeightedSum);

    const circularity = clamp(goodFlowShare, 0, 1);
    return circularity;
  }

  static happiness(record: Record) {
    const { phonesInUse } = record.stocks;
    const { phoneGoal } = record.variables;

    const userSatisfaction =
      phonesInUse < phoneGoal
        ? phonesInUse / phoneGoal
        : phoneGoal / phonesInUse;

    if (!Number.isFinite(userSatisfaction) || Number.isNaN(userSatisfaction))
      return 0;

    assert(
      userSatisfaction >= 0 && userSatisfaction <= 1,
      'userSatisfaction should be between 0 and 1',
    );

    return userSatisfaction;
  }

  static all(record: Record) {
    const circularity = Scores.circularity(record);
    const happiness = Scores.happiness(record);

    return { circularity, happiness };
  }
}

export { Scores };
