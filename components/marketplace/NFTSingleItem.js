import React from "react";
import {
  Box,
  Image,
  Grid,
  GridItem as Gi,
  Text,
  Button,
} from "@chakra-ui/react";
import { useMarketplace } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";

const NFTSingleItem = (props) => {
  const { name, image, price, id, tokenId } = props;
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );
  const router = useRouter();
    // console.log(router.query)
  const buyNFT = async () => {
    try {
      await marketplace.buyoutListing(id, 1);
      alert("NFT purchased");
      router.push("/marketplace/nfts");
    } catch (error) {
      console.log(error);
      alert("Error buying NFT");
    }
  };

  return (
    <Box
        boxShadow="lg"
        borderRadius="10px"
        overflow="hidden"
        cursor="pointer"
        border="1px solid"
        borderColor="gray.300"
      >
        <Image src={image} alt="nft pic" objectFit="contain" boxSize="350px"/>
        <Grid templateColumns="repeat(2,1fr)" p="4">
          <Gi>
            <Text color="gray.500">{name}</Text>
          </Gi>
          <Gi justifySelf="end">
            <Text color="gray.500">Price</Text>
          </Gi>
          <Gi>
            <Text>Bean #8055</Text>
          </Gi>
          <Gi justifySelf="end">
            <Text>
              <Image
                src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                alt="test"
                boxSize="12.5px"
                display="inline-block"
              />{" "}
              {price}
            </Text>
          </Gi>
          <Gi>
            <Button onClick={buyNFT}>Buy</Button>
          </Gi>
          <Gi gridColumn="span 2" justifySelf="end">
            <Text>1 day left</Text>
          </Gi>
        </Grid>
      </Box>
  )
};

export default NFTSingleItem;
