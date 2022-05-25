import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Modal,
  Spinner,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { setConfig } from "next/config";
import { uploadImage } from "../utils";

export default function PostModal(props) {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, open, closeFunc, addPost } = props;
  const [currentInput, setCurrentInput] = useState("");
  const [hasImg, setImg] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [hasError, setHasError] = useState(false);
  const [currentError, setCurrentError] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  //needs to reference current userID
  const userId = 1;
  useEffect(() => {
    if (open) {
      onOpen();
    } else {
      setCurrentInput("");
      setImgUrl("");
      setUploadButtonText("Upload Image");
      onClose();
    }
  }, [open]);
  const add = (userId, Post) => {
    if (Post.length < 1) {
      setHasError(true);
      setCurrentError("Please add some text to your post!");
    } else {
      addPost(userId, Post, imgUrl);
      setCurrentInput("");
      setImgUrl("");
      setUploadButtonText("Upload Image");
    }
  };
  const handleFile = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const url = await uploadImage(file);
    setImgUrl(url);
    setImg(true);
    setLoading(false);
    setUploadButtonText("Image Uploaded!");
  };
  return (
    <div>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={closeFunc}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column">
            <Input
              type="text"
              onChange={(e) => setCurrentInput(e.nativeEvent.target.value)}
              placeholder={"What's on your mind?"}
              value={currentInput}
            />
            <Button
              variant="ghost"
              value=""
              onClick={() => document.getElementById("upload").click()}
            >
              {uploadButtonText}
            </Button>
            <Input
              id="upload"
              display="none"
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e)}
            />
            {!!hasError ? <Text>{currentError}</Text> : null}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeFunc}>
              Close
            </Button>
            <Button
              variant="ghost"
              value=""
              onClick={() => add(data.id, currentInput)}
              isDisabled={loading}
            >
              {loading ? <Spinner /> : "Submit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
