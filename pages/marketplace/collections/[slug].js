import React, { useEffect, Fragment as Fr } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollection } from "../../../store/collections";
import { Text, Container, Grid, Heading, Divider } from "@chakra-ui/react";
import Head from "next/head";
import CollectionDetails from "../../../components/marketplace/CollectionDetails";
import NFTList from "../../../components/marketplace/NFTList";
export default function SingleCollectionPage() {
  const router = useRouter();
  const collection = useSelector((state) => state.collection);
  const { singleCollection } = collection;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!router.query.slug) return;
    dispatch(fetchCollection(router.query.slug));
  }, [router.query.slug, dispatch]);
  if (collection.status === "loading") return <Text>Loading...</Text>;
  if (!singleCollection.id) return <Text>Not found</Text>;
  return (
    <Fr>
      <Head>
        <title>{singleCollection.name} | Cryptozon</title>
      </Head>
      <Grid mt={4} justifyItems="center">
        <CollectionDetails
          coll={singleCollection}
          bannerImgH={"15rem"}
          profileImgSize="155px"
          marginTitle="5.3rem"
          titleSize="3rem"
          authorSize="1.2rem"
          descSize="1.2rem"
        />
      </Grid>

      <Container maxW="container.xl">
        <Divider my={8} />
        <Heading textAlign="center" mb={6}>
          NFTs
        </Heading>
        <NFTList
          nfts={singleCollection.nfts}
          collectionName={singleCollection.name}
        />
      </Container>
    </Fr>
  );
}
/**
 bannerImg: "https://lh3.googleusercontent.com/FtZWWUOArzD6WPyQ97rumWFhxm8IxFHNYg0Jucx0TdJ31q3VVDqnJ4nFu1RdC68fYEnFtvvtdoT2PrqFhyxDb3jcVXA3c_QfJnpiBNM=h600"
createdAt: "2022-05-14T20:11:16.057Z"
description: "The friends are invisible"
id: 1
name: "Invi Friends"
nfts: [{…}]
profileImg: "https://lh3.googleusercontent.com/lW22aEwUE0IqGaYm5HRiMS8DwkDwsdjPpprEqYnBqo2s7gSR-JqcYOjU9LM6p32ujG_YAEd72aDyox-pdCVK10G-u1qZ3zAsn2r9=s130"
slug: "invi_friends"
updatedAt: "2022-05-14T20:11:16.057Z"
userId: 4
 */
