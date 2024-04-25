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

  static coverage(record: Record) {
    const { phonesInUse } = record.stocks;
    const { phoneGoal } = record.variables;

    const coverage = phonesInUse / phoneGoal;

    if (!Number.isFinite(coverage) || Number.isNaN(coverage)) return 0;

    assert(coverage >= 0, 'userSatisfaction should be greater than 0');

    return coverage;
  }

  static all(record: Record) {
    const circularity = Scores.circularity(record);
    const coverage = Scores.coverage(record);

    return { circularity, coverage };
  }
}

export { Scores };
