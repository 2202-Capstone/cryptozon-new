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
import { HamburgerIcon } from "@chakra-ui/icons";

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
                  <Image src={nft.image} alt={nft.name} w="290px" h="260px" />
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
                    <Tooltip hasArrow label={iconHover}>
                      <HamburgerIcon ml="225px" onClick={() => toggle(nft)} cursor='pointer'/>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
          </Box>
        </Container>
      ) : (
        <Text textAlign="center">~ no nfts to display ~</Text>
      )}
    </>
  );
}
