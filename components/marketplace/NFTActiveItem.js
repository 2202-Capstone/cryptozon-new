import { useState } from "react";
import {
  Box,
  Image,
  Grid,
  GridItem as Gi,
  Text,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useMarketplace, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { buyNFTInShop } from "../../utils";
import { collectionActions } from "../../store/collections";

const NFTActiveItem = (props) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { name, image, price, id, tokenId, sellerAddress } = props;

  const address = useAddress();
  const dispatch = useDispatch();
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );
  const router = useRouter();

  const buyNFT = async () => {
    try {
      setLoading(true);
      const nftId = await buyNFTInShop(marketplace, name, id, address);
      dispatch(
        collectionActions.changeNFTOwner({ wallet: address, id: nftId })
      );
      setLoading(false);
      toast({
        title: "Bought NFT!",
        description:
          "You have successfully bought the nft. You can now view it in your profile.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/profile");
    } catch (err) {
      console.log(err);
      let errorMessage = "Something went wrong";
      if (err.message.includes("wallet"))
        errorMessage = "You are not connected to the wallet";
      if (err.message.includes("insufficient funds"))
        errorMessage = "You are low on funds.";
      if (err.message.includes("denied"))
        errorMessage = "You denied the transaction request.";
      setLoading(false);
      toast({
        title: "Error buying nft",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
      <Link key={tokenId} href={`nfts/${tokenId}`} passHref>
        <Image
          src={image}
          alt="nft pic"
          objectFit="cover"
          boxSize="350px"
          w="100%"
        />
      </Link>
      <Grid templateColumns="repeat(2,1fr)" p="4">
        <Gi>
          <Text color="gray.500">NFT</Text>
        </Gi>
        <Gi justifySelf="end">
          <Text color="gray.500">Price</Text>
        </Gi>
        <Gi>
          <Text>{name}</Text>
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
        <Gi justifySelf="right" gridColumn="1 / -1" mt="2">
          {address !== sellerAddress && (
            <Button onClick={buyNFT} isDisabled={loading}>
              {loading ? <Spinner /> : "Buy"}
            </Button>
          )}
        </Gi>
      </Grid>
    </Box>
  );
};

export default NFTActiveItem;
