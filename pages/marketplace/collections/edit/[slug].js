import React from "react";
import { useSelector } from "react-redux";
import { Heading, Container } from "@chakra-ui/react";
import CollectionForm from "../../../../components/marketplace/CollectionForm";

export default function EditCollectionPage() {
  const { user } = useSelector((state) => state.user);

  if (!user.id)
    return (
      <Heading p="5rem" textAlign="center">
        Please connect to wallet first.
      </Heading>
    );
  return (
    <Container maxW="container.sm">
      <Heading my={4}>Editing Collection</Heading>
      <CollectionForm address={user.wallet} />
    </Container>
  );
}
