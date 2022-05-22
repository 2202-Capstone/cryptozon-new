import React from "react";
import {
  Image,
  Text,
  Grid,
  GridItem as Gi,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import CollectionDetails from "./CollectionDetails";
import Link from "next/link";

export default function CollectionItem({ coll }) {
  const boxShadow = useColorModeValue(
    "md",
    "0px 3px 7px rgba(255,255,255,0.2)"
  );
  return (
    // <NextLink href={`collections/${coll.slug}`} passHref>
    <Link href={`/marketplace/collections/${coll.slug}`} passHref>
      <Gi
        as={Grid}
        boxShadow={boxShadow}
        overflow="hidden"
        borderRadius="xl"
        templateRows="45% repeat(3,min-content)"
        justifyItems="center"
        cursor="pointer"
      >
        <CollectionDetails
          coll={coll}
          bannerImgH="100%"
          profileImgSize="80px"
          marginTitle="2.7rem"
        />
      </Gi>
    </Link>
  );
}
