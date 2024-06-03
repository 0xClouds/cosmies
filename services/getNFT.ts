import { Alchemy, Network } from "alchemy-sdk";

class AlchemyWrap {
  public userWallet: string;
  private config: any;

  constructor(userWallet: string) {
    this.userWallet = userWallet;
    this.config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: Network.ETH_SEPOLIA,
    };
  }

  public async getNFT() {
    const alchemy = new Alchemy(this.config);
    try {
      let owner = "0xb373365b10b4619c4FD56dBBFB47c974fEed0c3B";
      let options = {
        contractAddresses: ["0xd127262169333a1Bc3Ff01755CbbE22d06F293de"],
      };
      let response = await alchemy.nft.getNftsForOwner(owner, options);
      let nftMetadata = await alchemy.nft.getNftMetadata(
        owner,
        response.ownedNfts[0].tokenId
      );
      return nftMetadata.name?.toLowerCase();
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
      throw error; // Rethrowing the error is important if you need to handle it further up in your application.
    }
  }
}

export default AlchemyWrap;
