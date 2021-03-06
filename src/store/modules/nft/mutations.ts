import { MutationTree } from "vuex";
import { NFT } from "../../../models/NFT";
import { NFTState } from "./state";

const mutations: MutationTree<NFTState> = {
  setAll(state: NFTState, all: Array<NFT>): void {
    state.all = all;
  },
  setCurrent(state: NFTState, current: NFT): void {
    state.current = current;
  },
  setTotalItems(state: NFTState, total: number): void {
    state.totalItems = total;
  },
  setQuery(state: NFTState, query: Record<string, string | number>): void {
    state.query = query;
  },
  set(state: NFTState, updatedNft: NFT): void {
    const index = state.all.findIndex((nft) => {
      return nft.id === updatedNft.id;
    });
    if (index > -1) {
      state.all[index] = updatedNft;
    }
  },
  add(state: NFTState, newMedia: NFT): void {
    state.all = [newMedia, ...state.all];
  },
  remove(state: NFTState, ids: string[]): void {
    state.all = state.all.filter((nft) => !ids.includes(nft.id));
  },
  setStatus(state: NFTState, { id, status }): void {
    const index = state.all.findIndex((nft) => {
      return nft.id === id;
    });
    if (index > -1) {
      state.all[index].current_status = status;
    }
  },
  addClaimingHistory(state: NFTState, { id, claiming_status }): void {
    const index = state.all.findIndex((nft) => {
      return nft.id === id;
    });
    if (index > -1) {
      const claiming_history = state.all[index].claiming_history || []
      state.all[index].claiming_history = [...claiming_history, claiming_status];
    }
  },
  cleanClaimingHistory(state: NFTState, { id }): void {
    const index = state.all.findIndex((nft) => {
      return nft.id === id;
    });
    if (index > -1) {
      state.all[index].claiming_history = []
    }
  },
};

export default mutations;
