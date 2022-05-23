import React from "react";
import {
  Image,
  Text,
  Grid,
  GridItem as Gi,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";

import { AiOutlineEdit } from "react-icons/ai";
import CollectionDetails from "./CollectionDetails";
import Link from "next/link";

export default function CollectionItem({ coll, isProfile }) {
  const boxShadow = useColorModeValue(
    "md",
    "0px 3px 7px rgba(255,255,255,0.2)"
  );
  const textBtnClr = useColorModeValue("white", "black");
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
        pos="relative"
      >
        <CollectionDetails
          coll={coll}
          bannerImgH="100%"
          profileImgSize="80px"
          marginTitle="2.7rem"
        />
        {isProfile && (
          <Link href={`/marketplace/collections/edit/${coll.slug}`} passHref>
            <IconButton
              pos="absolute"
              right={6}
              mt={6}
              color={textBtnClr}
              icon={<AiOutlineEdit />}
              aria-label="edit collection"
              colorScheme="cyan"
              boxShadow="base"
              borderRadius="full"
            />
          </Link>
        )}
      </Gi>
    </Link>
  );
}
