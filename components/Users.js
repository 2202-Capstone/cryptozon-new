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
  textDecoration,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { followUser } from "../store/selectedUser";
import { useDispatch, useSelector } from "react-redux";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchSelectedUser } from "../store/selectedUser";
import axios from "axios";
import { FcApproval } from "react-icons/fc";
/*
  this pg is nearly identical to the profile pg, but this is specifically for other users when you visit their profile;
  functionality and display are a bit different, you can't edit their pg and you can't view their hidden nfts

  when visiting this pg, we'll have to use the username to get their wallet, and from there we can grab their nfts based on their wallet
*/

// const NFTS = [
//   {
//     id: 1,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 69,
//     projectName: "BAYC",
//     hidden: false,
//   },
//   {
//     id: 2,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 420,
//     projectName: "BAYC",
//     hidden: false,
//   },
//   {
//     id: 3,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 783,
//     projectName: "BAYC",
//     hidden: false,
//   },
// ];

export default function Users({ user, nfts }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const wallet = useAddress();
  const { selectedUser } = useSelector((state) => state.selectedUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const [display, setDisplay] = useState("NFT");

  useEffect(() => {
    dispatch(fetchSelectedUser(user.username));
    if (wallet) {
      checkIfFollowing();
    }
  }, [wallet]);

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
      if (f.username == user.username) {
        setIsFollowing(true);
      }
    });
  }

  const buttonTitle = isFollowing ? "Unfollow" : "Follow";

  if (!selectedUser) {
    return <Text>Loading...</Text>;
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
            alt={user.username}
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
                <ChatIcon
                  mr={4}
                  _hover={{ cursor: "pointer", opacity: "0.8" }}
                />
                <Button
                  w={100}
                  borderRadius={50}
                  onClick={() => follow(wallet, selectedUser.username)}
                >
                  {buttonTitle}
                </Button>
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
            <Text fontSize={12}>~ other social accounts ~</Text>
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
      </Stack>
      <Divider />

      {!!nfts && nfts.length && display === "NFT" ? (
        <Container
          maxW={1000}
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
            {nfts
              .filter((n) => n.hidden === false)
              .map((nft) => (
                <Box
                  _hover={{ border: "1px solid black" }}
                  key={nft.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  m="10px"
                  maxW="250px"
                >
                  <Image src={nft.imageUrl} alt="Bored Ape" />
                  <Box p="6">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {nft.projectName}#{nft.token}
                    </Box>
                    <Box>{nft.projectName}</Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Container>
      ) : display !== "NFT" ? null : (
        <Text textAlign="center">~ no nfts to display ~</Text>
      )}
      {!!user.posts && user.posts.length && display === "POST" ? (
        <Container display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          {user.posts.map(p => (
            <Box key={p.id} w={400} borderWidth={1} mt={5}>
            <Stack direction='row' display='flex' alignItems='center'>
              <Image src={user.imageUrl} h='50px' w='50px' borderRadius={100} m={2}/>
              <Text fontSize={16} mt={5}>{user.username}</Text>
              <FcApproval />
            </Stack>
            <Image src={p.imageUrl} alt='post' w={400} h={300}/>
            <Text ml={3} p={5}>{p.content}</Text>
          </Box>
          ))}
        </Container>
      ) : display === "NFT" ? null : <Text textAlign='center'>~ no posts to display ~</Text>}
      {/* <Container
        maxW={1000}
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
          {!!nfts && nfts.length ? (
            nfts.map((nft) => (
              <Box
                _hover={{ border: "1px solid black" }}
                key={nft.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m="10px"
                maxW="250px"
              >
                <Image src={nft.imageUrl} alt="Bored Ape" />
                <Box p="6">
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {nft.projectName}#{nft.token}
                  </Box>
                  <Box>{nft.projectName}</Box>
                </Box>
              </Box>
            ))
          ) : (
            <Text>~ no nft's to display :/ ~</Text>
          )}
        </Box>
      </Container> */}
    </>
  );
}
