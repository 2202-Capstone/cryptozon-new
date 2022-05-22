import React from "react";
import { Grid } from "@chakra-ui/react";
import CollectionItem from "./CollectionItem";

export default function CollectionList({ collections, isProfile = false }) {
  // collections = collections.filter((el) => !!el.nfts.length);
  return (
    <Grid
      templateColumns="repeat(auto-fill, 24rem)"
      gap="1.5rem"
      autoRows="minmax(24rem,max-content)"
      justifyContent="center"
    >
      {!!collections.length &&
        collections.map((coll) => (
          <CollectionItem key={coll.id} coll={coll} isProfile={isProfile} />
        ))}
    </Grid>
  );
}
