import { defineStore } from 'pinia';

export const useScreenStore = defineStore('screen', {
  state: () => ({
    width: window.innerWidth,
    height: window.innerHeight,
    get orientation() {
        return this.width > this.height ? 'landscape' : 'portrait';
    },
    get isTabletOrLarger() {
        return this.width >= 768; // Based on Tailwind's 'md' breakpoint
    }
  }),
  actions: {
    updateDimensions() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
  }
});
