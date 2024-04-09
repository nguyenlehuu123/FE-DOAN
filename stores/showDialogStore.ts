import { defineStore } from "pinia";

export const showDialogStore = defineStore('showDialog', {
  state: () => ({
    showDialogLogin: false,
    showDialogRegister: false,
    showDialogRegisterChapter: true
  }),
  getters: {
    isShowDialogLogin: (state) => state.showDialogLogin,
    isShowDialogRegister: (state) => state.showDialogRegister,
    isShowDialogRegisterChapter: (state) => state.showDialogRegisterChapter
  },
  actions: {
    handleToggleShowDialogLogin() {
      this.showDialogLogin = !this.showDialogLogin
    },
    handleToggleShowDialogRegister() {
      this.showDialogRegister = !this.showDialogRegister
    },
    handleToggleShowDialogRegisterChapter() {
      this.showDialogRegisterChapter = !this.showDialogRegisterChapter
    }
  }
})
