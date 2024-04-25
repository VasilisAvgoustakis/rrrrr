import type { Record } from '../circular-economy-model';

import { CircularEconomyModel } from '../circular-economy-model';

export type Condition<T> = (v: T) => boolean;

const conditionParameters = `{ ${CircularEconomyModel.elementIds.join(', ')} }`;

export function compile(condition: string): (r: Record) => boolean {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function(
    conditionParameters,
    `return (${condition}) === true;`,
  ) as Condition<Record>;
}
