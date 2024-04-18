import { defineStore } from "pinia";

export const useDraftingStore = defineStore('useDraftingStore', {
  state: () => {
    return {
      drafting: false,
    }
  },
  getters: {
    getDrafting: (state) => state.drafting,
  },
  actions: {
    updateDrafting(drafting: boolean) {
      this.drafting = drafting
    },
  }
})
