import React, { Fragment as Fr, useState } from "react";
import {
  Box,
  Image,
  Tooltip,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ProfileNFTPostAlert from "./ProfileNFTPostAlert";
import { useSelector, useDispatch } from "react-redux";
import { newPost } from "../store/post";

export default function ProfileNftsItem({ nft, toggle, iconHover }) {
  const [loading, setLoading] = useState(false);
  const {
    user: { id: userId },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handlePost = async (textInput) => {
    const defaultErrMessage = "Something went wrong posting your nft.";
    const errorToast = (message = defaultErrMessage) => ({
      title: "Error Posting NFT",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });

    try {
      if (!textInput.trim())
        throw errorToast("Please input some text for the post.");
      if (!userId) throw errorToast("The user is not recognized");
      setLoading(true);
      const postData = {
        content: textInput,
        userId,
        subscribedUsers: [userId],
        imageUrl: nft.image,
        postImage: true,
        isNFT: nft.assetContractAddress,
      };
      await dispatch(newPost(postData));
      setLoading(false);
      toast({
        title: "Posted NFT",
        description: "You can now view your post in the home page",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      let errOp = errorToast();
      if (err.status === "error") errOp = err;
      toast(errOp);
      setLoading(false);
    }
  };

  return (
    <Fr>
      <Box
        _hover={{ border: "1px solid black" }}
        key={nft.id}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m="10px"
        maxW="290px"
        shadow="md"
      >
        <Image
          src={nft.image}
          alt={nft.name}
          w="290px"
          h="260px"
          objectFit="cover"
        />
        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            fontSize={20}
            display="flex"
          >
            {nft.name}
            <Tooltip hasArrow label="Post NFT">
              <Text
                as="span"
                ml="auto"
                fontWeight="light"
                cursor="pointer"
                onClick={() => onOpen()}
              >
                +
              </Text>
            </Tooltip>
          </Box>
          <Box as={Text} noOfLines="2">
            {nft.description}
          </Box>

          <Tooltip hasArrow label={iconHover}>
            <HamburgerIcon
              display="block"
              ml="225px"
              onClick={() => toggle(nft)}
              cursor="pointer"
            />
          </Tooltip>
        </Box>
      </Box>
      <ProfileNFTPostAlert
        isOpen={isOpen}
        onClose={onClose}
        handlePost={handlePost}
        loading={loading}
      />
    </Fr>
  );
}
