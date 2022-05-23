import { Fragment as Fr, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useColorModeValue,
  Input,
  Spinner,
} from "@chakra-ui/react";
export default function ProfileNFTPostAlert({
  isOpen,
  onClose,
  handlePost,
  loading,
}) {
  const cancelRef = useRef();
  const [text, setText] = useState("");
  const textClr = useColorModeValue("white", "black");

  return (
    <Fr>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Say something about your NFT.
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="cyan"
                onClick={() => handlePost(text)}
                ml={3}
                color={textClr}
              >
                {loading ? <Spinner /> : "Post"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fr>
  );
}
