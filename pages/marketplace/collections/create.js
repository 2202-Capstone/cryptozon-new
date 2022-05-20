import React, { useEffect, useState } from "react";
import { Container, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CollectionForm from "../../../components/marketplace/CreateCollectionForm";
export default function CreateCollectionPage() {
  const { user } = useSelector((state) => state.user);

  if (!user.id)
    return (
      <Heading p="5rem" textAlign="center">
        Please connect to wallet first.
      </Heading>
    );
  return (
    <Container maxW="container.sm">
      <Heading my={4}>Create a Collection</Heading>
      <CollectionForm address={user.wallet} />
    </Container>
  );
}
