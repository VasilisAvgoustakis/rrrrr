<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

import { HOTKEYS } from '../../ts/builtin-config';
import { useAppStore } from '../../ts/stores/app';
import { useModelStore } from '../../ts/stores/model';

const uuid = uuidv4();

const togglePlayingBtnId = `btn-toggle-playing-${uuid}`;
const toggleFullscreenBtnId = `btn-toggle-fullscreen-${uuid}`;
const toggleDeveloperModeBtnId = `btn-toggle-dev-mode-${uuid}`;
const toggleHighlightDerivativesBtnId = `btn-toggle-highlight-derivatives-${uuid}`;
const toggleMarkerSlotLabelsBtnId = `btn-toggle-marker-slot-labels-${uuid}`;
const toggleAutoResetBtnId = `btn-toggle-auto-reset-${uuid}`;

const appStore = useAppStore();
const modelStore = useModelStore();

const togglePlaying = () => appStore.$patch({ isPlaying: !appStore.isPlaying });

const toggleFullscreen = () =>
  appStore.$patch({ isFullscreen: !appStore.isFullscreen });

const toggleDeveloperMode = () =>
  appStore.$patch({ isDeveloperModeActive: !appStore.isDeveloperModeActive });

const toggleHighlightDerivatives = () =>
  appStore.$patch({
    highlightDerivatives: !appStore.highlightDerivatives,
  });

const toggleMarkerSlotLabels = () =>
  appStore.$patch({
    showMarkerSlotLabels: !appStore.showMarkerSlotLabels,
  });

const resetModel = () => modelStore.reset();

const toggleAutoReset = () => {
  appStore.$patch({ autoReset: !appStore.autoReset });
};
</script>

<template>
  <input
    type="checkbox"
    class="btn-check"
    :id="togglePlayingBtnId"
    :class="() => (appStore.isFullscreen ? 'active' : '')"
    autocomplete="off"
    @click="togglePlaying"
  />
  <label class="btn btn-primary" :for="togglePlayingBtnId"
    >Run ({{ HOTKEYS.run.label }})</label
  ><br />
  <input
    type="checkbox"
    class="btn-check"
    :id="toggleFullscreenBtnId"
    :class="() => (appStore.isFullscreen ? 'active' : '')"
    autocomplete="off"
  />
  <label
    class="btn btn-primary"
    :for="toggleFullscreenBtnId"
    @click="toggleFullscreen"
    >Fullscreen ({{ HOTKEYS.fullscreen.label }})</label
  ><br />
  <input
    type="checkbox"
    class="btn-check"
    :id="toggleDeveloperModeBtnId"
    :class="() => (appStore.isDeveloperModeActive ? 'active' : '')"
    autocomplete="off"
  />
  <label
    class="btn btn-primary"
    :for="toggleDeveloperModeBtnId"
    @click="toggleDeveloperMode"
    >Developer mode ({{ HOTKEYS.developerMode.label }})</label
  ><br />
  <input
    type="checkbox"
    class="btn-check"
    :id="toggleHighlightDerivativesBtnId"
    :class="() => (appStore.highlightDerivatives ? 'active' : '')"
    autocomplete="off"
  />
  <label
    class="btn btn-primary"
    :for="toggleHighlightDerivativesBtnId"
    @click="toggleHighlightDerivatives"
    >Highlight derivatives ({{ HOTKEYS.highlightDerivatives.label }})</label
  ><br />
  <input
    type="checkbox"
    class="btn-check"
    :id="toggleMarkerSlotLabelsBtnId"
    :class="() => (appStore.showMarkerSlotLabels ? 'active' : '')"
    autocomplete="off"
  />
  <label
    class="btn btn-primary"
    :for="toggleMarkerSlotLabelsBtnId"
    @click="toggleMarkerSlotLabels"
    >Show marker slot labels</label
  ><br />
  <button type="button" class="btn btn-primary" @click="resetModel">
    Reset model ({{ HOTKEYS.reset.label }})</button
  ><br />
  <input
    type="checkbox"
    class="btn-check"
    :id="toggleAutoResetBtnId"
    :class="() => (appStore.autoReset ? 'active' : '')"
    autocomplete="off"
  />
  <label
    class="btn btn-primary"
    :for="toggleAutoResetBtnId"
    @click="toggleAutoReset"
    >Enable auto-reset</label
  >
</template>

<style scoped lang="scss">
.btn,
.btn-check {
  margin-bottom: 0.5rem;
}
</style>
