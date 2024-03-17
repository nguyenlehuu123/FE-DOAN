import { defineStore } from "pinia";

export const showDialogStore = defineStore('showDialog', {
  state: () => ({
    showDialogLogin: false,
    showDialogRegister: false
  }),
  getters: {
    isShowDialogLogin: (state) => state.showDialogLogin,
    isShowDialogRegister: (state) => state.showDialogRegister
  },
  actions: {
    handleToggleShowDialogLogin() {
      this.showDialogLogin = !this.showDialogLogin
    },
    handleToggleShowDialogRegister() {
      this.showDialogRegister = !this.showDialogRegister
    }
  }
})
