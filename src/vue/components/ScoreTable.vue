<script setup lang="ts">
import type { ElementOf } from 'ts-essentials';
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
const { description, scoreLabels } = general;

const modelStore = useModelStore();

interface ScoreInfo {
  id: string;
  score: Ref<number>;
  primaryLabel: Ref<string>;
  secondaryLabel: Ref<string>;
}

const scoreIds = ['circularity', 'coverage'] as const;

function createScoreInfo(id: ElementOf<typeof scoreIds>): ScoreInfo {
  return {
    id,
    score: computed(() => Scores[id](modelStore.record)),
    primaryLabel: getPrimary(scoreLabels[id]),
    secondaryLabel: getSecondary(scoreLabels[id]),
  };
}

const scores = scoreIds.map(createScoreInfo);

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
      <tr>
        <td colspan="2" class="primary-text header">
          {{ getPrimary(description).value }}
        </td>
      </tr>
      <template
        v-for="{ id, score, primaryLabel, secondaryLabel } in scores"
        :key="id"
      >
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
      <tr>
        <td colspan="2" class="secondary-text footer">
          {{ getSecondary(description).value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.scores {
  display: table;
  table-layout: fixed;
  margin: 44px;
  width: 395px;
  height: 395px;
  background-color: #e10984;
  border-radius: 50%;
  color: white;
  font-size: 20px;
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
  border-spacing: 1ex 0.5em;
}

.header {
  padding-top: 0.5em;
  padding-bottom: 1em;
}

.footer {
  padding-top: 1em;
}

tr:first-child > td,
tr:last-child > td {
  text-align: center;
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
