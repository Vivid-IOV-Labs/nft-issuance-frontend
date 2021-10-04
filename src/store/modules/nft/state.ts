import { NFT } from "../../../models/NFT";

export interface NFTState {
  all: Array<NFT>;
  totalItems: number;
  query: Record<string, string | number>;
  current?: NFT;
}

const state = (): NFTState => ({
  all: [],
  totalItems: 0,
  query: {},
  current: undefined,
});

export default state;
