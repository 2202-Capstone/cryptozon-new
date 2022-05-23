import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newPost } from "../store/post";
import PostModal from "./PostModal";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";



export default function Addpost() {
  const sdk = new ThirdwebSDK("rinkeby");
  const contract = sdk.getNFTCollection(process.env.NFT_COLECTION_CONTRACT_ADDRESS);
  const { user: walletUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const colorBtn = useColorModeValue("white", "black");
  const dispatch = useDispatch();

  const openModal = (data) => {
    setOpen(true);
    setData(data);
  };
  const closeModal = () => {
    setOpen(false);
    setData({})
  }
  const logNFTs = async () => {
    const nfts = await contract.getAll();
    const filteredNfts = nfts.filter(nft => nft.owner === walletUser.wallet)
    console.log(filteredNfts);
  }
  const addPost = (userId,post,imgUrl) =>{
    const initialSubs = [userId]
    const data = {
      userId: userId,
      content: post,
      subscribedUsers: initialSubs
    }
    if(!!imgUrl){
      data.imageUrl = imgUrl
      data.postImage = true
    }
    dispatch(newPost(data));
  };
  return (
    <Box>
      <Button
        onClick={() => {
          openModal(walletUser);
        }}
        colorScheme="cyan"
        color={colorBtn}
        borderRadius="3xl"
      >
        Add a new post
      </Button>
      <PostModal
        open={open}
        closeFunc={closeModal}
        data={data}
        addPost={addPost}
      />
    </Box>
  );
}
