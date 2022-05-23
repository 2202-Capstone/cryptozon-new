import React, { useEffect, Fragment as Fr } from "react";
import Head from "next/head";
import { Container, Heading } from "@chakra-ui/react";
import { fetchAllCollections } from "../../../store/collections";
import { useDispatch, useSelector } from "react-redux";
import CollectionList from "../../../components/marketplace/CollectionList";
export default function CollectionsPage() {
  const { collections, status } = useSelector((state) => state.collection);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCollections());
  }, [dispatch]);

  return (
    <Fr>
      <Head>
        <title>Collections | Cryptozon</title>
      </Head>
      <Container pt="3" maxW="container.xl">
        <Heading mb={6} textAlign="center">
          Explore Collections
        </Heading>
        <CollectionList collections={collections} />
      </Container>
    </Fr>
  );
}

/*
bannerImg: "https://lh3.googleusercontent.com/iux3DtSFXIEtbdw89TDlvbc65GcUcZ0WFipZ_lW93GsZDkkGKQy1SYMZqXiI_Ngcmdn_kgEI6A4R8T-ptXQpEMU2NzAecZHAEs2rWw=h600"
createdAt: "2022-05-14T20:11:16.058Z"
description: "The yacht is bored"
id: 2
name: "Bored Yacht"
profileImg: "https://lh3.googleusercontent.com/Fbv0Mbut8q_MRfMB-F2stO9PzPd3zSiy0HQu-PJQszorWGU0m0QzQWUSaHt91ndBFxaWx0aTP8Pp-5-tHIrxe1dl5IASTYLRTSzx=s130"
slug: "bored_yacht"
updatedAt: "2022-05-14T20:11:16.058Z"
user: {username: 'france'}
userId: 4
*/
