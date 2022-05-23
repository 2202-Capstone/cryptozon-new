import React from "react";
import { useRouter } from "next/router";
import Users from "../../components/Users";
import Head from "next/head";

export default function User() {
  const {
    query: { username },
  } = useRouter();
  return (
    <>
      <Head>
        <title>{username} | Cryptozon</title>
      </Head>
      <Users />
    </>
  );
}
