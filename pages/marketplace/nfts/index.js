import React, { useEffect, useState, Fragment as Fr } from "react";
import { Box, Heading, Grid } from "@chakra-ui/react";
import Head from "next/head";
import { useSelector } from "react-redux";
import NFTActiveItem from "../../../components/marketplace/NFTActiveItem";

const Marketplace = () => {
  const { activeNfts } = useSelector((store) => store);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(activeNfts.activeNfts.length);
    let timer;
    if (!activeNfts.activeNfts.length)
      timer = setTimeout(() => setIsLoading(false), 8500);
    if (activeNfts.activeNfts.length) setIsLoading(false);
    return () => {
      clearTimeout(timer);
    };
  }, [activeNfts.activeNfts.length]);

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
          <Box textAlign="center" fontSize="lg" fontWeight="bold">
            Fetching listings from the blockchain...
          </Box>
        ) : (
          <Grid
            templateColumns="repeat(auto-fill, 22.5rem)"
            gap="8"
            justifyContent={"center"}
          >
            {activeNfts.activeNfts.length > 0 ? (
              activeNfts.activeNfts[0].map((nft) => {
                const { name, description, image } = nft.asset;
                const { id, buyoutPrice, tokenId, sellerAddress } = nft;
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
                    sellerAddress={sellerAddress}
                  />
                );
              })
            ) : (
              <Box textAlign="center" fontSize="lg" fontWeight="bold">
                No listings
              </Box>
            )}
          </Grid>
        )}
      </Box>
    </Fr>
  );
};

export default Marketplace;
