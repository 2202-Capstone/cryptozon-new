import React, { Fragment as Fr, useRef, useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { collectionActions } from "../../store/collections";
import { sellNFT } from "../../utils";

export default function SellButton({ marketplace, nft }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const priceRef = useRef();
  const toast = useToast();
  const handleSell = async (e) => {
    e.preventDefault();

    try {
      const priceVal = priceRef.current.value.trim();
      if (!parseFloat(priceVal)) throw new Error("Please input proper price.");
      setLoading(true);
      const {
        data: {
          data: [{ listingId, expirationDate, buyoutPrice }],
        },
      } = await sellNFT(marketplace, nft, priceVal);

      dispatch(
        collectionActions.changeNFTListing({
          id: nft.id,
          listingId,
          expirationDate,
          buyoutPrice,
        })
      );
      setLoading(false);

      toast({
        title: "Successfully listed nft",
        description: `Listed your nft for ${priceVal} eth`,
        position: "bottom",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      let errorMessage = "Something went wrong";
      console.log(err);
      if (err.message.includes("wallet"))
        errorMessage = "You are not connected to the wallet";
      toast({
        title: "Error selling nft",
        position: "top",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Fr>
      <Button onClick={onOpen}>Sell</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSell}>
          <ModalHeader>Set Price</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NumberInput step={0.001} min={0}>
              <NumberInputField ref={priceRef} placeholder="ETH" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="outline" type="submit">
              {loading ? <Spinner /> : "Sell"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fr>
  );
}
