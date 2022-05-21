import React, { Fragment as Fr } from "react";
import NextLink from "next/link";
import { GridItem as Gi, Image, Text, Box } from "@chakra-ui/react";
export default function CollectionDetails({
  coll,
  bannerImgH,
  profileImgSize,
  marginTitle,
  titleSize,
  authorSize,
  descSize,
}) {
  return (
    <Fr>
      <Gi gridRow="1 / 2" gridColumn="1 / -1" justifySelf="stretch ">
        {coll.bannerImg ? (
          <Image
            src={coll.bannerImg}
            alt="cover image"
            h={bannerImgH}
            objectFit="cover"
            w="100%"
          />
        ) : (
          <Box w="100%" h="100%" bg="gray.300"></Box>
        )}
      </Gi>
      <Gi
        gridRow="1 / 2"
        gridColumn="1 / -1"
        alignSelf="end"
        transform="translateY(50%)"
      >
        <Image
          alignSelf="center"
          src={coll.profileImg}
          alt="profile image"
          boxSize={profileImgSize}
          borderRadius="full"
          border="3.5px solid"
          borderColor="white"
          outline="1px solid"
          outlineColor="blackAlpha.400"
        />
      </Gi>
      <Gi mt={marginTitle}>
        {" "}
        <Text
          fontWeight="bold"
          fontSize={titleSize || "xl"}
          sx={{ wordSpacing: "5px" }}
        >
          {coll.name}
        </Text>
      </Gi>
      <Gi mb={2}>
        <Text fontSize={authorSize || "md"}>
          by{" "}
          <NextLink href={`/${coll.user.username}`} passHref>
            <Text
              as="span"
              color="blue.500"
              textDecor={"underline"}
              cursor="pointer"
            >
              {coll.user.username}
            </Text>
          </NextLink>
        </Text>
      </Gi>
      <Gi fontStyle="italic">
        <Text fontSize={descSize || "md"}>{coll.description}</Text>
      </Gi>
    </Fr>
  );
}
