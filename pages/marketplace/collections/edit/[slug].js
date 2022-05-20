import { useEffect } from "react";
import { fetchCollection } from "../../../../store/collections";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Heading, Container } from "@chakra-ui/react";
import CollectionForm from "../../../../components/marketplace/EditCollectionForm";

export default function EditCollectionPage() {
  const { user } = useSelector((state) => state.user);
  const collection = useSelector((state) => state.collection);
  const {
    singleCollection: { name, profileImg, bannerImg, description, ...others },
  } = collection;

  const dispatch = useDispatch();
  const {
    query: { slug },
  } = useRouter();

  useEffect(() => {
    if (slug) dispatch(fetchCollection(slug));
  }, [dispatch, slug]);

  if (!collection.status || collection.status === "loading")
    return (
      <Heading p="5rem" textAlign="center">
        Loading..
      </Heading>
    );
  if (collection.status === "error")
    return (
      <Heading p="5rem" textAlign="center">
        Collection not found.
      </Heading>
    );
  if (user.wallet && others.user.wallet !== user.wallet)
    return (
      <Heading p="5rem" textAlign="center">
        This is not your collection.
      </Heading>
    );
  if (!user.id)
    return (
      <Heading p="5rem" textAlign="center">
        Please connect to wallet first.
      </Heading>
    );

  return (
    <Container maxW="container.sm">
      <Heading my={4}>Editing Collection</Heading>
      <CollectionForm
        name={name}
        profileImg={profileImg}
        bannerImg={bannerImg}
        description={description}
      />
    </Container>
  );
}
