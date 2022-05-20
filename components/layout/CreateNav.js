import React from "react";
import NextLink from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Link,
} from "@chakra-ui/react";
export default function CreateNav() {
  return (
    <Menu>
      <MenuButton as={Button} w="100%" variant="ghost">
        Create
      </MenuButton>
      <MenuList>
        <NextLink href="/marketplace/collections/create" passHref>
          <MenuItem as={Link}>Create Collection</MenuItem>
        </NextLink>
        <NextLink href="/marketplace/nfts/create" passHref>
          <MenuItem as={Link}>Create NFT</MenuItem>
        </NextLink>
      </MenuList>
    </Menu>
  );
}
