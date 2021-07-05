import { MutationTree } from "vuex";
import { Media } from "../../../models/Media";

interface MediaState {
  all: Array<Media>;
}

const mutations: MutationTree<MediaState> = {
  setAll(state: MediaState, all: Array<Media>): void {
    state.all = all;
  },
  add(state: MediaState, newMedia: Media): void {
    state.all = [newMedia, ...state.all];
  },
  remove(state: MediaState, mediaID: string): void {
    state.all = state.all.filter((media) => media.mediaID !== mediaID);
  },
};
export default mutations;
