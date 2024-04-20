import { defineStore } from "pinia";
import { getTokenFromCookie } from "~/common/cookie";

interface IUserInfo {
  avatar?: string,
  email?: string
}

export const userStore = defineStore('useStore', {
  state: () => {
    return {
      useRole: localStorage.getItem('useRole') ?? '',
      userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
      authorization: getTokenFromCookie() ?? ''
    }
  },
  getters: {
    getUserRole(): string {
      return this.useRole
    },
    getUserInfo(): IUserInfo {
      return this.userInfo
    },
    getAuthorization(): string {
      return this.authorization
    }
  },
  actions: {
    updateUserRole(role: string) {
      localStorage.setItem('useRole', role);
      this.useRole = role
    },
    updateUserInfo(userInfo: IUserInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.userInfo = userInfo
    },
    updateAuthorization(authorization: string) {
      this.authorization = authorization
    }
  }
})
