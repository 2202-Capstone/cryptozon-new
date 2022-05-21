import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ImageInput from "../ImageInput";
import { uploadImage } from "../../utils";
export default function EditCollectionForm({
  name,
  description,
  profileImg,
  bannerImg,
  slug,
}) {
  const formRef = useRef();
  const toast = useToast();
  const router = useRouter();
  const [image, setImage] = useState(profileImg);
  const [image2, setImage2] = useState(bannerImg);
  const [nameInput, setNameInput] = useState(name);
  const [descriptionInput, setDescriptionInput] = useState(description);

  const handleChangeName = (e) => {
    setNameInput(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescriptionInput(e.target.value);
  };

  const [loadingColl, setLoadingColl] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = formRef.current;
    const { profile, banner = "" } = Object.fromEntries([
      ...new FormData(formEl),
    ]);
    try {
      let profilePic;
      let bannerPic;
      if (image === profileImg) {
        profilePic = image;
      } else {
        profilePic = profile;
      }
      if (image2 === bannerImg) {
        bannerPic = image2;
      } else {
        bannerPic = banner;
      }

      if (
        !nameInput ||
        !(
          profilePic.name ||
          (typeof profilePic === "string" && profilePic.includes("https://"))
        )
      )
        return toast({
          title: "Required Input",
          description: "Please provide a name and a profile picture",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      setLoadingColl(true);
      let profileUrl,
        bannerUrl = "";
      if (profilePic.name) profileUrl = await uploadImage(profilePic);
      if (bannerPic.name) bannerUrl = await uploadImage(bannerPic);

      await axios.patch(`/api/collections/${slug}`, {
        name: nameInput,
        description: descriptionInput.trim(),
        profileImg: profileUrl || profilePic,
        bannerImg: bannerUrl ? bannerUrl : bannerPic.name ? bannerPic : "",
      });
      setLoadingColl(false);
      toast({
        title: "Success",
        description: "Successfully edited collecton. Redirecting to profile.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.replace("/profile");
    } catch (err) {
      setLoadingColl(false);
      toast({
        title: "Editing Error",
        description: "There was an error editing the collection",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
        <Input
          id="name"
          name="name"
          type="text"
          value={nameInput}
          onChange={handleChangeName}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          name="description"
          value={descriptionInput}
          onChange={handleChangeDescription}
        />
      </FormControl>
      <Button
        colorScheme="cyan"
        alignSelf="start"
        color="white"
        type="submit"
        isDisabled={loadingColl}
      >
        {loadingColl ? <Spinner /> : "Edit"}
      </Button>
    </VStack>
  );
}
