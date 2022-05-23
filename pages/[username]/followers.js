import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Container, Image, Text, Button, Flex } from "@chakra-ui/react";
import { fetchFollowers } from "../../store/followers";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Followers() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { followers } = useSelector((state) => state.followers);
  const { username } = router.query;

  useEffect(() => {
    if (username) {
      dispatch(fetchFollowers(username));
    }
  }, [username]);

  return (
    <>
      <Head>
        <title>{`${username}'s followers`} | Cryptozon</title>
      </Head>
      <Button ml={5} onClick={() => router.push(`/${router.query.username}`)}>
        {<ArrowBackIcon w={8} h={8} mr={1} />}Back
      </Button>
      <Text fontSize={20} fontWeight="bold" textAlign="center" mb={5}>
        Followers
      </Text>
      <Container>
        {followers.length ? (
          followers.map((f) => (
            <Link key={f.username} href={`/${f.username}`} passHref>
              <Flex
                w="100%"
                borderWidth={1}
                alignItems="center"
                cursor="pointer"
                mb={2}
              >
                <Image
                  alt="user"
                  src={f.imageUrl}
                  h={100}
                  w={100}
                  borderRadius={100}
                  m={2}
                />
                <Text fontSize={30} ml={5}>
                  @{f.username}
                </Text>
              </Flex>
            </Link>
          ))
        ) : (
          <Text textAlign="center">None</Text>
        )}
      </Container>
    </>
  );
}
