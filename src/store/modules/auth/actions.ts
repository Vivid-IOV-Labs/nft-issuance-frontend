import { ActionTree } from "vuex";
import { User } from "../../../models/User";
import { AuthState } from "./state";

const actions: ActionTree<User, AuthState> = {
    setCurrentRole({ commit }, role) {
        commit("setCurrentRole", role);
    },
};
export default actions;
