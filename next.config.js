/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS:
      "0x4706EBDBEB43dFe087ec9a18e3de6137454C0534",
    NFT_COLECTION_CONTRACT_ADDRESS:
      "0x7D0174cFA3A20F5c9a2d5f44B43Ec7945599a201",
    MORALIS_SERVER_URL: "https://mixtowg6gzx7.usemoralis.com:2053/server",
    MORALIS_APP_ID: "rP7p98Lr9FFmhiQEX9GsZoMRlQA6QwHqVvkCdHRI",
    MORALIS_MASTER_KEY: "EWj2dIJWjzW7BzqD1Qnv90idnTBjXfbB8eVRJO0k",
    CLOUDINARY_PRESET: "cryptozon-prod",
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
