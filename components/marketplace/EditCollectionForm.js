import { useState, useRef } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import ImageInput from "../ImageInput";
import { uploadImage } from "../../utils";
export default function EditCollectionForm({
  name,
  description,
  profileImg,
  bannerImg,
}) {
  const formRef = useRef();
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
    const { profile: profileImg, banner: bannerImg = "" } = Object.fromEntries([
      ...new FormData(formEl),
    ]);
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
        {loadingColl ? <Spinner /> : "Create"}
      </Button>
    </VStack>
  );
}
