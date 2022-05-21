import React, { useState, useEffect } from "react";
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
  Alert,
  AlertIcon,
  GridItem as Gi,
} from "@chakra-ui/react";
import { fetchUser } from "../store/userSlice";
import { fetchNfts, toggleHidden } from "../store/nfts";
import { useAddress } from "@thirdweb-dev/react";
import { useSelector, useDispatch } from "react-redux";
import EditProfile from "./EditProfile";
import Link from "next/link";
import axios from "axios";
import ProfileNfts from "./ProfileNfts";
import ProfilePosts from "./ProfilePosts";
import CollectionList from "./marketplace/CollectionList";
import SocialCard from "./SocialCard";

export default function UserProfile() {
  const dispatch = useDispatch();
  const address = useAddress();
  const { user } = useSelector((state) => state.user);
  const [usernames, setUsernames] = useState([]);
  const { nfts } = useSelector((state) => state.nfts);
  const [hidden, setHidden] = useState(false);
  const [display, setDisplay] = useState("NFT"); // switch bw post and nft
  const { AllPost: post, status } = useSelector((state) => state.socialPost);

  useEffect(() => {
    if (address) {
      dispatch(fetchUser(address));
      getAllUsernames();
      dispatch(fetchNfts(address));
    }
  }, [address, post]);

  // using this to compare usernames when editing and set up error handling
  async function getAllUsernames() {
    const res = await axios.get("http://localhost:3000/api/users");
    const names = res.data.map((u) => {
      if (u.username == user.username) {
        return "";
      } else {
        return u.username;
      }
    });
    setUsernames(names);
  }

  function toggle(n) {
    if (n.hidden == false) {
      dispatch(toggleHidden({ ...n, hidden: true }));
    } else {
      dispatch(toggleHidden({ ...n, hidden: false }));
    }
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" textAlign="center" />
      </Box>
    );
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
            src={user.imageUrl}
            mr={10}
          />
          <Flex direction="column" w={500} mt="15px">
            <Text fontWeight="bold" fontSize={26}>
              @{user.username ? user.username : "unnamed"}
            </Text>
            <Text mt={2}>{user.bio}</Text>
            <Stack direction="row" fontSize={12} mt={7} spacing={5}>
              <Link href="/profile/following">
                {user.following + " Following"}
              </Link>
              <Link href="/profile/followers">
                {user.followers + " Followers"}
              </Link>
            </Stack>
            <Box ml={330}>
              <EditProfile user={user} wallet={address} usernames={usernames} />
            </Box>
          </Flex>
          {!user.username && (
            <Alert justifySelf="center" status="info" mt={8} w={460}>
              <AlertIcon />
              Please set up your profile :)
            </Alert>
          )}
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
      {display === "NFT" ? (
        <ProfileNfts
          nfts={nfts}
          hidden={hidden}
          toggle={toggle}
          setHidden={setHidden}
        />
      ) : display === "POST" ? (
        <Box display="flex" justifyContent="center">
          <SocialCard posts={user.posts} me={user} />
        </Box>
      ) : null}
      {display === "COLLECTION" && user.collections.length ? (
        <CollectionList collections={user.collections} />
      ) : display === "COLLECTION" && user.collections.length === 0 ? (
        <Text textAlign="center">~ no collections to display ~</Text>
      ) : null}
    </>
  );
}
