import { MutationTree } from "vuex";
import { AuthState } from "./state";

const mutations: MutationTree<AuthState> = {
  setCurrentRole(state: AuthState, role: string): void {
    state.currentRole = role;
  },
};

export default mutations;
