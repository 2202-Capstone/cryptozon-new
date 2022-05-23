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
import { useRouter } from "next/router";
import { buyNFTInShop } from "../../utils";

const NFTSingleItem = (props) => {
  const [loading, setLoading] = useState(false);
  const { name, image, price, id, tokenId, sellerAddress } = props;
  const toast = useToast();

  const address = useAddress();
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );
  const router = useRouter();

  const buyNFT = async () => {
    try {
      setLoading(true);
      const nftId = await buyNFTInShop(marketplace, name, id, address);

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
      maxW="max-content"
      margin="0 auto"
      overflow="hidden"
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
    >
      <Image src={image} alt="nft pic" objectFit="contain" boxSize="350px" />
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
        <Gi gridColumn="1 / -1" justifySelf="end">
          {address !== sellerAddress && (
            <Button mt="2" onClick={buyNFT} isDisabled={loading}>
              {loading ? <Spinner /> : "Buy"}
            </Button>
          )}
        </Gi>
      </Grid>
    </Box>
  );
};

export default NFTSingleItem;
