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
import SellButton from "./SellButton";

const NFTItem = (props) => {
  const { nft, collName, user } = props;
  const { user: signedUser } = user;

  const isExpired = Date.now() > new Date(nft.expirationDate);
  const isOwner = nft.owner === signedUser.wallet;
  const couldSell = isOwner && (isExpired || !nft.listingId);
  const couldBuy = signedUser.wallet && !isOwner && !isExpired && nft.listingId;
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );

  const buyNFT = async () => {
    try {
      await marketplace.buyoutListing(id, 1);
      alert("NFT purchased");
      window.location.reload();
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
      <Image src={nft.image} alt="nft pic" objectFit="cover" w="100%" />
      <Grid templateColumns="repeat(2,1fr)" p="4">
        <Gi>
          <Text color="gray.500">{collName || "NFT"}</Text>
        </Gi>
        <Gi justifySelf="end">
          <Text color="gray.500">&nbsp;</Text>
        </Gi>
        <Gi>
          <Text>{nft.name}</Text>
        </Gi>
        <Gi justifySelf="end">
          <Text>
            {/*<Image
              src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
              alt="eth"
              boxSize="12.5px"
              display="inline-block"
            />{" "}
            price*/}
          </Text>
        </Gi>
        <Gi gridColumn="span 2" justifySelf="end">
          <Text></Text>
        </Gi>
        <Gi gridColumn="span 2" justifySelf="end">
          {couldBuy ? (
            <Button>Buy</Button>
          ) : couldSell ? (
            <SellButton marketplace={marketplace} nft={nft} />
          ) : (
            ""
          )}
        </Gi>
      </Grid>
    </Box>
  );
};

export default React.memo(NFTItem);