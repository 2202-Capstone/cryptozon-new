/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS:
      "0x34d93E2f645bDe7773e0Ffa40d2454B0A5baEbcC",
    NFT_COLECTION_CONTRACT_ADDRESS:
      "0x739A3E33fBd1Ce9f88b4e2588445818485730Ddc",
    MORALIS_SERVER_URL:
      "https://mixtowg6gzx7.usemoralis.com:2053/server",
    MORALIS_APP_ID:
      "rP7p98Lr9FFmhiQEX9GsZoMRlQA6QwHqVvkCdHRI",
    MORALIS_MASTER_KEY:
      "EWj2dIJWjzW7BzqD1Qnv90idnTBjXfbB8eVRJO0k",
    CLOUDINARY_PRESET:
      "cryptozon-prod",
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
