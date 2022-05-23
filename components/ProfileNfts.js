import React from "react";
import {
  Container,
  Box,
  Divider,
  Image,
  Button,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import ProfileNftsItem from "./ProfileNftsItem";

export default function ProfileNfts({ nfts, hidden, toggle, setHidden }) {
  const isEmpty = nfts.length === 0 ? true : false;
  const iconHover = hidden === true ? "Display NFT" : "Hide NFT";

  return (
    <>
      {!isEmpty ? (
        <Container
          maxW={1100}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            w={100}
            textAlign="center"
            alignSelf="flex-start"
            mt="20px"
            mr="15px"
          >
            <Button variant="ghost" onClick={() => setHidden(false)}>
              Owned
            </Button>
            <Divider m="5px" />
            <Button variant="ghost" onClick={() => setHidden(true)}>
              Hidden
            </Button>
          </Box>
          <Box
            flex={1}
            display="flex"
            flexWrap="wrap"
            width={500}
            justifyContent="flex-start"
          >
            {nfts.data
              .filter((n) => n.hidden === hidden)
              .map((nft) => (
                <ProfileNftsItem
                  key={nft.id}
                  nft={nft}
                  toggle={toggle}
                  iconHover={iconHover}
                />
              ))}
          </Box>
        </Container>
      ) : (
        <Text textAlign="center">~ no nfts to display ~</Text>
      )}
    </>
  );
}
