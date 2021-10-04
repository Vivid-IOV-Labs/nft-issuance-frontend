import { NFTState } from "./state";
import { NFT } from "../../../models/NFT";
const getAll = (state: NFTState): Array<NFT> =>
  state.all.filter((nft) => nft.current_status !== "delivered");

export default {
  getAll,
  getTotal: (state: NFTState): number => state.totalItems,
  getById:
    (state: NFTState) =>
    (id: string): NFT | undefined =>
      getAll(state).find((n) => n.id == id),
  getCurrent: (state: NFTState): NFT | undefined => state.current,
  getQuery: (state: NFTState): Record<string, string | number> => state.query,
  byTitle:
    (state: NFTState) =>
    (title: string): Array<NFT> => {
      if (title) {
        return getAll(state).filter((media) => {
          const searchParams = title
            .toLocaleLowerCase()
            .trim()
            .split(" ")
            .join(".*$/|^.*");
          const searchString = `^.*${searchParams}.*$`;
          const normalizedTitle = media.details.title
            .toLocaleLowerCase()
            .trim();
          return new RegExp(searchString).test(normalizedTitle);
        });
      } else {
        return state.all;
      }
    },
};
