import NFTService from "../../../services/NFTService";
import { ActionTree } from "vuex";
import { NFT } from "../../../models/NFT";

interface MediaState {
  all: Array<NFT>;
}

const actions: ActionTree<NFT, MediaState> = {
  async fetchAll({ commit, rootGetters }, params): Promise<void> {
    const { media, total } = await NFTService.list({
      ...params,
      status: rootGetters["auth/canSee"],
    });
    commit("setAll", media);
    commit("setTotalItems", total);
  },
  async fetchById({ commit }, id): Promise<void> {
    const nft = await NFTService.findById(id);
    commit("setCurrent", nft);
  },
  setQuery({ commit }, query) {
    commit("setQuery", query);
  },
  async create({ commit }, newNFTH: NFT["details"]): Promise<void> {
    const newAddedMedia = await NFTService.create(newNFTH);
    commit("add", newAddedMedia);
  },
  async update({ commit }, { details, id }): Promise<void> {
    const updatedNFT = await NFTService.update(details, id);
    commit("set", updatedNFT);
  },
  async approve({ commit }, NFT: NFT): Promise<void> {
    const approvedNFT = await NFTService.approve(NFT);
    commit("set", approvedNFT);
  },
  async reject({ commit }, NFT: NFT): Promise<void> {
    const rejectedNFT = await NFTService.reject(NFT);
    commit("set", rejectedNFT);
  },
  async issue({ commit }, NFT: NFT): Promise<void> {
    const issuedNFT = await NFTService.issue(NFT);
    commit("set", issuedNFT);
  },
  async claim({ commit }, NFT: NFT): Promise<void> {
    const claimedNFT = await NFTService.claim(NFT);
    commit("set", claimedNFT);
  },
  async remove({ commit }, ids: string[]): Promise<void> {
    await NFTService.remove(ids);
    commit("remove", ids);
  },
};
export default actions;
