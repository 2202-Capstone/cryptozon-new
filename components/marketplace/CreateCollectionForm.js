import React, { useState, useEffect, useRef } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import ImageInput from "../ImageInput";
import { uploadImage } from "../../utils";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/userSlice";
import axios from "axios";
export default function CollectionForm({ address }) {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [loadingColl, setLoadingColl] = useState(false);
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = formRef.current;
    const {
      name,
      profile: profileImg,
      banner: bannerImg = "",
      description = "",
    } = Object.fromEntries([...new FormData(formEl)]);
    if (!address)
      return toast({
        title: "Not Signed In",
        description: "Connect to your metamask wallet",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    if (!name || !profileImg.name)
      return toast({
        title: "Inputs Missing",
        description: "Name and profile picture are required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

    setLoadingColl(true);
    try {
      const profileUrl = await uploadImage(profileImg);
      let bannerUrl = "";
      if (bannerImg.name) {
        bannerUrl = await uploadImage(bannerImg);
      }
      await axios.post("/api/collections", {
        name,
        bannerImg: bannerUrl,
        profileImg: profileUrl,
        description,
        address,
      });

      formEl.elements.name.value = "";
      formEl.elements.description.value = "";
      formEl.elements.profile.value = "";
      formEl.elements.banner.value = "";
      setImage(null);
      setImage2(null);
      dispatch(fetchUser(address));
      toast({
        title: "Collection created.",
        description: "We successfully created your collection",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err.message);
      toast({
        title: "Creation Error",
        description: "There was an error creating the collection",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoadingColl(false);
  };

  return (
    <VStack as="form" mt={6} spacing={4} onSubmit={handleSubmit} ref={formRef}>
      <ImageInput
        title="Profile Photo"
        name="profile"
        boxSize="250px"
        image={image}
        setImage={setImage}
      />
      <ImageInput
        title="Banner Photo"
        name="banner"
        h="200px"
        w="600px"
        image={image2}
        setImage={setImage2}
      />
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" name="name" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea id="description" name="description" />
      </FormControl>
      <Button
        colorScheme="cyan"
        alignSelf="start"
        color="white"
        type="submit"
        isDisabled={loadingColl}
      >
        {loadingColl ? <Spinner /> : "Create"}
      </Button>
    </VStack>
  );
}
