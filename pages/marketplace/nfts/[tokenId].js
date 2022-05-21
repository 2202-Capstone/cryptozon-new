import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NFTSingleItem from "../../../components/marketplace/NFTSingleItem";

const NFTDetails = () => {
  const router = useRouter();
  const { activeNfts } = useSelector((store) => store);
  const activeNow = activeNfts.activeNfts[0];
  const singleNFTData = []
  if(!!activeNow)
  {
    singleNFTData = activeNow.filter((nft) => {
    const tokenCheck = router.query.tokenId
    if (tokenCheck == nft.tokenId) {
      return nft;
    }
  })}
  // console.log('singlenftdata: ',singleNFTData[0])
  if(!!singleNFTData[0]){
    const { name, description, image } = singleNFTData[0].asset;
    const { id, buyoutPrice, tokenId } = singleNFTData[0];
    const price = buyoutPrice / 1e18;
    return (
      <NFTSingleItem
        key={tokenId}
        name={name}
        description={description}
        image={image}
        price={price}
        id={id}
        tokenId={tokenId}
      />
    )
  }
  else{
    return (null)
  }
}


export default NFTDetails;
