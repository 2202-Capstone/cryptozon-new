import { Fragment as Fr, useState, useEffect, useCallback } from "react";
import { Box, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Notifications from './Notifications'
import { useDispatch } from "react-redux";
// import { setNFT, } from "../../store/nfts";
import { useMarketplace } from "@thirdweb-dev/react";
import { setActiveNft } from "../../store/activeNfts";

export default function Layout({ children }) {
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );
  const [allNFTListings, setAllNFTListings] = useState([]);
  const [allActiveListings, setAllActiveListings] = useState([]);
  const dispatch = useDispatch();
  const [intersected, setIntersected] = useState(false);
  const onScrollDown = useCallback((e) => {
    setIntersected(window.scrollY > 15);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScrollDown);
    return () => window.removeEventListener("scroll", onScrollDown);
  }, [onScrollDown]);

  useEffect(() => {
    // // set redux store with all nfts from marketplace contract
    const interval = setInterval(() => {
      getAllActiveListings();
      getAllListings();
    }, 15000)

    return () => {
      clearInterval(interval)
    }
  }, []);

  const getAllListings = async () => {
    try {
      const nftList = await marketplace.getAllListings();
      setAllNFTListings(nftList);
      // dispatch(setNFT(nftList));
    } catch (error) {
      console.log(error);
    }
  }

  const getAllActiveListings = async () => {
    try {
      const nftList = await marketplace.getActiveListings();
      // console.log(nftList);
      setAllActiveListings(nftList);
      dispatch(setActiveNft(nftList));
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <Fr>
      <Navbar intersects={intersected} />
      <Notifications />
      <Box pb={16}>{children}</Box>
    </Fr>
  );
}
