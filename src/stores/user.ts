import { defineStore } from 'pinia';

interface UserState {
  isOrgMember: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isOrgMember: false
  }),
  actions: {
    setIsOrgMember(isOrgMember: boolean) {
      this.isOrgMember = isOrgMember;
    }
  }
});
