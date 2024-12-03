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
const { scoreLabels } = general;

const modelStore = useModelStore();

interface ScoreInfo {
  id: string;
  score: Ref<number>;
  primaryLabel: Ref<string>;
  secondaryLabel: Ref<string>;
}

const scoreIds = ['circularity', 'coverage'] as const;
const scoreCssClasses = {
  circularity: ['score', 'score-bottom-right'],
  coverage: ['score', 'score-top-left'],
};

function createScoreInfo(id: ElementOf<typeof scoreIds>): ScoreInfo {
  return {
    id,
    score: computed(() => Scores[id](modelStore.record)),
    primaryLabel: getPrimary(scoreLabels[id]),
    secondaryLabel: getSecondary(scoreLabels[id]),
    cssClasses: scoreCssClasses[id],
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
  <template
    v-for="{ id, score, primaryLabel, secondaryLabel, cssClasses } in scores"
    :key="id"
  >
    <div :class="cssClasses">
      <div class="score-content">
        <div class="score-labels">
          <div class="primary-text">{{ primaryLabel.value }}</div>
          <div class="secondary-text">{{ secondaryLabel.value }}</div>
        </div>
        <div class="primary-text score-value">
          {{ format(score.value) }}
        </div>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.score {
  position: absolute;
  width: 990px;
  height: 990px;
  background-color: #e10984;
  border-radius: 50%;
  color: white;
  font-size: 30px;
}

.score-top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%) rotate(135deg);
}

.score-bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%) rotate(-45deg);
}

.score-content {
  position: absolute;
  top: 143px;
  left: 452px;
  text-align: left;
  text-transform: uppercase;
}

.score-labels {
  font-size: 21pt;
}

.score-value {
  font-size: 43pt;
  line-height: 1.74;
  position: relative;
  left: -9px;
}
</style>
