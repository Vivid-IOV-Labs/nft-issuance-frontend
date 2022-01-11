import { createStore, createLogger } from "vuex";
import createPersistedState from "vuex-persistedstate";

import { NFTModule } from "./modules/nft";
import { AuthModule } from "./modules/auth";
const store = createStore({
  modules: {
    nft: NFTModule,
    auth: AuthModule
  },
  strict: true,
  plugins: [
    createLogger(),
    createPersistedState({
      paths: ["auth"],
    })
  ],
});
export default store;
