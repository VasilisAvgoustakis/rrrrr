import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ScaleFactors = {
  stock: number;
  stockHighlight: number;
  flow: number;
  flowHighlight: number;
};

export const useVisualizationStore = defineStore('visualization', () => {
  const scaleFactors = ref<ScaleFactors>({
    stock: 30000,
    stockHighlight: 1,
    flow: 0.4,
    flowHighlight: 10,
  });

  return {
    scaleFactors,
  };
});
