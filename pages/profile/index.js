import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import UserProfile from "../../components/UserProfile";

export default function Profile() {
  const {
    user: { username },
  } = useSelector((state) => state.user);
  return (
    <>
      <Head>
        <title>{username || "Profile"} | Cryptozon</title>
      </Head>
      <UserProfile />
    </>
  );
}
