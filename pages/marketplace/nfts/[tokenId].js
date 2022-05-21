// cryptozon.com/marketplace/nfts/[tokenID]
//useRouter hook next/router
//will use same NFTActiveItem component for single NFT display
//tokenId is the id of the NFT
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NFTSingleItem from "../../../components/marketplace/NFTSingleItem";
import NoSsr from "../../../components/NoSsr";

const NFTDetails = () => {
  const { activeNfts } = useSelector((store) => store);
  const activeNow = activeNfts.activeNfts[0];
  const singleNFTData = []
  if(!!activeNow)
  {
    singleNFTData = activeNow.filter((nft) => {
    const URL_PREFIX = "http://localhost:3000/marketplace/nfts/";
    const WINDOW_URL = window.location.href;
    const testURL = URL_PREFIX + nft.tokenId
    if (WINDOW_URL == testURL) {
      // console.log(nft);
      return nft;
    }
  })}
  console.log('singlenftdata: ',singleNFTData[0])
  if(!!singleNFTData[0]){
    const { name, description, image } = singleNFTData[0].asset;
    const { id, buyoutPrice, tokenId } = singleNFTData[0];
    const price = buyoutPrice / 1e18;
    return (
      <NoSsr>
      <NFTSingleItem
        key={tokenId}
        name={name}
        description={description}
        image={image}
        price={price}
        id={id}
        tokenId={tokenId}
      />
      </NoSsr>
    )
  }
  else{
    return (null)
  }

}


export default NFTDetails;
