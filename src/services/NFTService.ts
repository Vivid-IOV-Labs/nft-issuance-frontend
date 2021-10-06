import ApiService from "./ApiService";
import { NFT } from "../models/NFT";

const API_ENDPOINT = "nft";

function serialized(params: Record<string, string | number>): string {
  return Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
}
interface listResponse {
  media: NFT[];
  total: number;
}
interface ResponseNFT {
  nft: NFT;
}

async function list(
  params: Record<string, string | number>
): Promise<listResponse> {
  const {
    data: { allNFT: media, totalNFT: total },
  } = await ApiService.get(`${API_ENDPOINT}?${serialized(params)}`);
  return { media, total };
}

async function create(newMedia: NFT["details"]): Promise<unknown> {
  const {
    data: { media },
  } = await ApiService.post(`${API_ENDPOINT}`, newMedia);
  return media;
}

async function approve(NFT: NFT): Promise<ResponseNFT> {
  const {
    data: { nft: approvedNFT },
  } = await ApiService.post(`${API_ENDPOINT}/approve`, NFT);
  return approvedNFT;
}

async function reject(NFT: NFT): Promise<ResponseNFT> {
  const {
    data: { nft: rejectedNFT },
  } = await ApiService.post(`${API_ENDPOINT}/reject`, NFT);
  return rejectedNFT;
}

async function issue(NFT: NFT): Promise<ResponseNFT> {
  const {
    data: { nft: issuedNFT },
  } = await ApiService.post(`${API_ENDPOINT}/issue`, NFT);
  return issuedNFT;
}

async function claim(NFT: NFT): Promise<ResponseNFT> {
  const {
    data: { nft: claimedNFT },
  } = await ApiService.post(`${API_ENDPOINT}/claim`, NFT);
  return claimedNFT;
}

async function remove(ids: string[]): Promise<void> {
  await ApiService.delete(
    `${API_ENDPOINT}?id=[${ids.join(",")}]`
    // , {
    //   params: { id: ids },
    // }
  );
}

async function findById(id: string): Promise<NFT> {
  const {
    data: { nft },
  } = await ApiService.get(`${API_ENDPOINT}/${id}`);
  return nft;
}

async function update(
  nftToUpdate: NFT["details"],
  id: NFT["id"]
): Promise<NFT> {
  console.log(nftToUpdate, id);
  const {
    data: { nft: updatedNFT },
  } = await ApiService.patch(`${API_ENDPOINT}?id=${id}`, {
    details: nftToUpdate,
  });
  return updatedNFT;
}

export default {
  list,
  create,
  approve,
  remove,
  update,
  issue,
  claim,
  reject,
  findById,
};
