import { useState } from "react";
import { Button, useToast, Spinner } from "@chakra-ui/react";
import { buyNFT } from "../../utils";
import { useDispatch } from "react-redux";
import { collectionActions } from "../../store/collections";
export default function BuyButton({ marketplace, nft, wallet }) {
  console.log(wallet);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleBuy = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await buyNFT(marketplace, nft, wallet);
      dispatch(collectionActions.changeNFTOwner({ wallet, id: nft.id }));
      setLoading(false);
      toast({
        title: "Bought NFT!",
        description: "You have successfully bought the nft.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
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
    <Button mt="2" onClick={handleBuy}>
      {loading ? <Spinner /> : "Buy"}
    </Button>
  );
}
