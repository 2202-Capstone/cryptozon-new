import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Image,
  Container,
  Flex,
  Divider,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { followUser } from "../store/selectedUser";
import { useDispatch, useSelector } from "react-redux";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchSelectedUser } from "../store/selectedUser";
import axios from "axios";
import SocialCard from "./SocialCard";
import { fetchNfts } from "../store/nfts";
import CollectionList from "./marketplace/CollectionList";

/*
  this pg is nearly identical to the profile pg, but this is specifically for other users when you visit their profile;
  functionality and display are a bit different, you can't edit their pg and you can't view their hidden nfts
*/

export default function Users() {
  const router = useRouter();
  const dispatch = useDispatch();
  const wallet = useAddress();
  const {user} = useSelector(state => state.user)
  const { selectedUser } = useSelector((state) => state.selectedUser);
  const { nfts } = useSelector((state) => state.nfts);
  const { AllPost: post, status } = useSelector((state) => state.socialPost);
  const [isFollowing, setIsFollowing] = useState(false);
  const [display, setDisplay] = useState("NFT");
  const { username } = router.query;
  const selectedUserWallet = !!selectedUser ? selectedUser.wallet : null;

  useEffect(() => {
    if (username) {
      dispatch(fetchSelectedUser(router.query.username));
    }
    if (selectedUserWallet) {
      dispatch(fetchNfts(selectedUserWallet));
      if (wallet) {
        checkIfFollowing();
      }
    }
  }, [wallet, username, selectedUserWallet, post]);

  // functions as both a follow and unfollow (if the current user is already following them)
  function follow(wallet, username) {
    dispatch(followUser({ wallet, username }));
    if (isFollowing) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  }

  // checking initially if signed-in user is following this user, and then set state for the button
  async function checkIfFollowing() {
    let info = wallet;
    const { data } = await axios.get("/api/user/following", {
      params: { info },
    });
    data.forEach((f) => {
      if (f.username == selectedUser.username) {
        setIsFollowing(true);
      }
    });
  }

  const buttonTitle = isFollowing ? "Unfollow" : "Follow";

  if (!username || !nfts.data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" textAlign="center" />
      </Box>
    );
  }

  if (!!wallet && wallet == selectedUser.wallet) {
    router.push("/profile");
  }

  return (
    <>
      <Container>
        <Box
          margin={10}
          padding={10}
          display="flex"
          flexDirection="column"
          width={600}
        >
          <Image
            alt={selectedUser.username}
            w={200}
            h={200}
            borderRadius={100}
            src={selectedUser.imageUrl}
            mr={10}
          />
          <Flex direction="column" w={500} mt="15px">
            <Stack direction="row" spacing={220}>
              <Text fontWeight="bold" fontSize={26}>
                @{selectedUser.username}
              </Text>
              <Box>
                {!!wallet && !!user.username ? (
                  <Button
                    w={100}
                    borderRadius={50}
                    onClick={() => follow(wallet, selectedUser.username)}
                  >
                    {buttonTitle}
                  </Button>
                ) : null}
              </Box>
            </Stack>
            <Text mt={5}>{selectedUser.bio}</Text>
            <Stack direction="row" fontSize={12} mt={10} spacing={5}>
              <Link href={`/${selectedUser.username}/following`}>
                {"Following " + selectedUser.following}
              </Link>
              <Link href={`/${selectedUser.username}/followers`}>
                {"Followers " + selectedUser.followers}
              </Link>
            </Stack>
          </Flex>
        </Box>
      </Container>
      <Stack
        direction="row"
        textAlign="center"
        spacing={10}
        display="flex"
        justifyContent="center"
        mb={2}
      >
        <Button variant="ghost" onClick={() => setDisplay("NFT")}>
          NFTs
        </Button>
        <Button variant="ghost" onClick={() => setDisplay("POST")}>
          Posts
        </Button>
        <Button variant="ghost" onClick={() => setDisplay("COLLECTION")}>
          Collections
        </Button>
      </Stack>
      <Divider mb={7} />

      {!!nfts && nfts.data.length && display === "NFT" ? (
        <Container
          maxW={1100}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            flex={1}
            display="flex"
            flexWrap="wrap"
            width={500}
            justifyContent="center"
          >
            {nfts.data
              .filter((n) => n.hidden === false)
              .map((nft) => (
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
                  <Image src={nft.image} alt={nft.name} w="290px" h="250px" />
                  <Box p="6">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                      fontSize={20}
                    >
                      {nft.name}
                    </Box>
                    <Box>{nft.description}</Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Container>
      ) : display !== "NFT" ? null : (
        <Text textAlign="center">~ no nfts to display ~</Text>
      )}
      {display === "POST" && selectedUser.posts.length ? (
        <Box display="flex" justifyContent="center">
          <SocialCard posts={selectedUser.posts} user={selectedUser} />
        </Box>
      ) : display === "POST" && selectedUser.posts.length === 0 ? (
        <Text textAlign="center">~ no posts to display ~</Text>
      ) : null}
      {display === "COLLECTION" && selectedUser.collections.length ? (
        <CollectionList collections={selectedUser.collections} />
      ) : display === "COLLECTION" && selectedUser.collections.length === 0 ? (
        <Text textAlign="center">~ no collections to display ~</Text>
      ) : null}
    </>
  );
}
