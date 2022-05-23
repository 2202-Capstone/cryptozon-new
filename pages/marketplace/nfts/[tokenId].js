import { useRouter } from "next/router";
import { Fragment as Fr } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import NFTSingleItem from "../../../components/marketplace/NFTSingleItem";

const NFTDetails = () => {
  const router = useRouter();
  const { activeNfts } = useSelector((store) => store);
  const activeNow = activeNfts.activeNfts[0];
  const singleNFTData = [];
  if (!!activeNow) {
    singleNFTData = activeNow.filter((nft) => {
      const tokenCheck = router.query.tokenId;
      if (tokenCheck == nft.tokenId) {
        return nft;
      }
    });
  }
  // console.log('singlenftdata: ',singleNFTData[0])
  if (!!singleNFTData[0]) {
    const { name, description, image } = singleNFTData[0].asset;
    const { id, buyoutPrice, tokenId, sellerAddress } = singleNFTData[0];
    const price = buyoutPrice / 1e18;
    return (
      <Fr>
        <Head>
          <title>{name} | Cryptozon</title>
        </Head>
        <NFTSingleItem
          key={tokenId}
          name={name}
          description={description}
          image={image}
          price={price}
          id={id}
          tokenId={tokenId}
          sellerAddress={sellerAddress}
        />
      </Fr>
    );
  } else {
    return null;
  }
};

export default NFTDetails;
