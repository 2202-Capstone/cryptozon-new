/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS:
      "0x57645d225490558AACDb60E2503d8daC55AE9D0b",
    NFT_COLECTION_CONTRACT_ADDRESS:
      "0xFe1d218b269D5f202961d1C6F72C0101ad10848c",
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
