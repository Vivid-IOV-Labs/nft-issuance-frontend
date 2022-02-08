import { NFT } from "../../../models/NFT";
interface XummSigningHistory {
  title: string,
  text: string,
  type: string;
}
export interface NFTState {
  all: Array<NFT>;
  signinghistory: { [id: string]: XummSigningHistory[] },
  totalItems: number;
  query: Record<string, string | number>;
  current?: NFT;
}

const state = (): NFTState => ({
  all: [],
  signinghistory: {},
  totalItems: 0,
  query: {},
  current: undefined,
});

export default state;
