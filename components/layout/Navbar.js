import React from "react";
import { Flex, useColorModeValue, Heading } from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";
import NextLink from "next/link";

const Navbar = ({ intersects }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Flex
      py={2}
      pos="sticky"
      top="0"
      bgColor={bgColor}
      mb="4"
      transition="all 0.4s"
      zIndex="50"
      boxShadow={intersects ? "base" : "none"}
    >
      <NextLink href="/post" passHref>
        <Heading
          fontSize="2.9rem"
          fontFamily="Saira Stencil One, cursive"
          textTransform="uppercase"
          alignSelf={"center"}
          ml={8}
          bg="cyan.500"
          color="white"
          p="5px 10px"
          borderRadius="8px"
          boxShadow="lg"
          cursor="pointer"
          textShadow="2px 5.1px 3.5px rgba(0, 0, 0, 0.165)"
        >
          Cryptozon
        </Heading>
      </NextLink>
      <DarkModeSwitch />
    </Flex>
  );
};

export default Navbar;
