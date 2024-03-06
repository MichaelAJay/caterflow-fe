import { defineStore } from 'pinia';

export const useOrientationStore = defineStore('orientation', {
  state: () => ({
    orientation: <'portrait' | 'landscape'>'portrait'
  }),
  actions: {
    updateOrientation() {
      this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }
  }
});
