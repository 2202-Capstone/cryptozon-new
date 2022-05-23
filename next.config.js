/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS:
      "0x57645d225490558AACDb60E2503d8daC55AE9D0b",
    NFT_COLECTION_CONTRACT_ADDRESS:
      "0xFe1d218b269D5f202961d1C6F72C0101ad10848c",
    MORALIS_SERVER_URL:
      "https://mixtowg6gzx7.usemoralis.com:2053/server",
    MORALIS_APP_ID:
      "rP7p98Lr9FFmhiQEX9GsZoMRlQA6QwHqVvkCdHRI",
    MORALIS_MASTER_KEY:
      "EWj2dIJWjzW7BzqD1Qnv90idnTBjXfbB8eVRJO0k",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/post",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
