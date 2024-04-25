<script setup lang="ts">
import type { Ref } from 'vue';

import { computed } from 'vue';

import { useConfigStore } from '../../ts/stores/config';
import { useModelStore } from '../../ts/stores/model';
import { Scores } from '../../ts/scores';

const {
  config: { general },
  getPrimary,
  getSecondary,
} = useConfigStore();
const { scoreLabels } = general;
const { circularity: circularityLabels, coverage: coverageLabels } =
  scoreLabels;

const modelStore = useModelStore();

interface ScoreInfo {
  score: Ref<number>;
  primaryLabel: Ref<string>;
  secondaryLabel: Ref<string>;
}

const circularity: ScoreInfo = {
  score: computed(() => Scores.circularity(modelStore.record)),
  primaryLabel: getPrimary(circularityLabels),
  secondaryLabel: getSecondary(circularityLabels),
};
const coverage: ScoreInfo = {
  score: computed(() => Scores.coverage(modelStore.record)),
  primaryLabel: getPrimary(coverageLabels),
  secondaryLabel: getSecondary(coverageLabels),
};

const scores = [circularity, coverage];

const fractionDigits = 1;
const nanScoreText = `–.${''.padEnd(fractionDigits, '–')}`;
const format = (score: number) => {
  if (Number.isFinite(score))
    return `${(score * 100).toFixed(fractionDigits)}%`;

  if (score === Number.POSITIVE_INFINITY) return `∞%`;

  if (score === Number.NEGATIVE_INFINITY) return `−∞%`;

  return `${nanScoreText}%`;
};
</script>

<template>
  <div class="scores">
    <table class="score-table">
      <template v-for="{ score, primaryLabel, secondaryLabel } in scores">
        <tr>
          <td class="label-column">
            <div class="primary-text">{{ primaryLabel.value }}&nbsp;</div>
            <div class="secondary-text">{{ secondaryLabel.value }}</div>
          </td>
          <td class="primary-text score-column">
            <div class="score-value">{{ format(score.value) }}</div>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.scores {
  display: table;
  table-layout: fixed;
  margin: 44px;
  width: 376px;
  height: 376px;
  background-color: black;
  border-radius: 50%;
  color: white;
  font-size: 21px;
  line-height: 1.2;
  text-transform: uppercase;
  white-space: pre;
  position: absolute;
}

.score-table {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

table {
  border-collapse: separate;
  border-spacing: 1ex 1em;
}

td {
  vertical-align: top;
}

.score-column {
  text-align: right;
}

.score-value {
  display: inline-block;
  width: 8ex;
  text-align: right;
}
</style>
