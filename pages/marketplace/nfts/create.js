import React, { useState, useRef, Fragment as Fr } from "react";
import axios from "axios";
import Head from "next/head";
import NextLink from "next/link";
import {
  Container,
  Heading,
  Input,
  FormControl,
  Text,
  FormLabel,
  VStack,
  Button,
  useColorModeValue,
  Spinner,
  useToast,
  Select,
} from "@chakra-ui/react";
import ImageInput from "../../../components/ImageInput";
import { useSelector } from "react-redux";
import { useNFTCollection } from "@thirdweb-dev/react";

export default function CreateNFTPage() {
  const [image, setImage] = useState();
  const formRef = useRef();
  const toast = useToast();

  const user = useSelector((state) => state.user);

  const [mintStatus, setMintStatus] = useState("idle");

  const btnColor = useColorModeValue("white", "black");

  const nftCollection = useNFTCollection(
    process.env.NFT_COLECTION_CONTRACT_ADDRESS ||
      "0xFe1d218b269D5f202961d1C6F72C0101ad10848c"
  );

  const address = user.user.wallet; // replace with user's state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = formRef.current;

    const {
      description = "",
      file,
      name,
      supply,
      collection,
    } = Object.fromEntries([...new FormData(formEl)]);
    if (!(name && file.name && supply && isFinite(collection)))
      return toast({
        title: "Inputs Missing",
        description: "Name, collection, and nft picture are required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

    if (!address)
      return toast({
        title: "Not Signed In",
        description: "Connect to your metamask wallet",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

    const metadata = {
      name,
      description,
      image: file,
    };
    try {
      setMintStatus("loading");
      const tx = await nftCollection.mintTo(address, metadata);
      // const receipt = tx.receipt;
      const tokenId = tx.id;
      const {
        owner,
        metadata: { description = "", image, name, uri },
      } = await tx.data();
      // console.log("NFT DATA", nft);
      // console.log("NFT TOKEN ID", tokenId);
      await axios.post("/api/nfts", {
        owner,
        tokenId: tokenId._hex,
        description,
        image,
        name,
        uri,
        collection,
      });
      setMintStatus("success");
      toast({
        title: "Successfully Minted!",
        description: "You can now view your NFT in your profile.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      formEl.elements.description.value = "";
      formEl.elements.name.value = "";
      formEl.elements.collection.value = "default";
      formEl.elements.file.value = "";
      setImage(null);
    } catch (e) {
      setMintStatus("idle");
      console.log(e.message);
      let description = "Something went wrong";
      if (e.message.includes("denied"))
        description = "You denied the transaction request.";
      toast({
        title: "Minting Failed",
        description,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Fr>
      <Head>
        <title>Create an NFT | Cryptozon</title>
      </Head>
      <Container maxW="container.sm">
        <VStack spacing={3} as="form" onSubmit={handleSubmit} ref={formRef}>
          <Heading mb={4}>Create your NFT!</Heading>
          <ImageInput image={image} setImage={setImage} />
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input name="name" id="name" type="text" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input name="description" id="description" type="text" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="supply">Supply</FormLabel>
            <Input
              name="supply"
              id="supply"
              type="number"
              value={1}
              isReadOnly={true}
            />
          </FormControl>
          {/** this collection input is still for display. once the collection api route is running we could use it */}
          <FormControl pb={2}>
            {user.user.collections && !!user.user.collections.length ? (
              <Fr>
                <FormLabel htmlFor="collection">Collection</FormLabel>
                <Select
                  name="collection"
                  id="collection"
                  defaultValue="default"
                >
                  <option value="default" disabled>
                    Collection
                  </option>
                  {user.user.collections.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </Select>
              </Fr>
            ) : (
              <Fr>
                <NextLink href="/marketplace/collections/create" passHref>
                  <Text
                    fontSize="lg"
                    cursor="pointer"
                    textTransform="uppercase"
                    color="red"
                    textDecoration="underline"
                  >
                    Please create a collection first! Click here.
                  </Text>
                </NextLink>
              </Fr>
            )}
          </FormControl>

          <Button
            colorScheme="cyan"
            color={btnColor}
            alignSelf="flex-start"
            type="submit"
            isDisabled={
              mintStatus === "loading" ||
              (user.user.collections && !user.user.collections.length)
            }
          >
            {mintStatus === "loading" ? <Spinner /> : "Create"}
          </Button>
        </VStack>
      </Container>
    </Fr>
  );
}
