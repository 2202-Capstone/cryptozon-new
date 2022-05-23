import React, { useEffect, useState, Fragment as Fr } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useSelector } from "react-redux";
import NFTActiveItem from "../../../components/marketplace/NFTActiveItem";

const Marketplace = () => {
  const { activeNfts } = useSelector((store) => store);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Fr>
      <Head>
        <title>Shop | Cryptozon</title>
      </Head>
      <Box px="12">
        <Heading textAlign="center" mb="8">
          Cryptozon Market
        </Heading>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <Flex gap="8" wrap="wrap" justifyContent={"center"}>
            {activeNfts.activeNfts.length > 0 ? (
              activeNfts.activeNfts[0].map((nft) => {
                const { name, description, image } = nft.asset;
                const { id, buyoutPrice, tokenId } = nft;
                const price = buyoutPrice / 1e18;
                // console.log("nft", tokenId);

                return (
                  <NFTActiveItem
                    key={tokenId}
                    name={name}
                    description={description}
                    image={image}
                    price={price}
                    id={id}
                    tokenId={tokenId}
                  />
                );
              })
            ) : (
              <div>No listings</div>
            )}
          </Flex>
        )}
      </Box>
    </Fr>
  );
};

export default Marketplace;
