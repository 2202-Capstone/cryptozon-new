import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

export const wrapAsync = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    throw err;
  });

export const sellNFT = async (contract, nft, price) => {
  try {
    if (nft.listingId && Date.now() < nft.expirationDate)
      throw new Error("Item is already for sale");
    console.log(contract, nft, price);
    console.log(NATIVE_TOKEN_ADDRESS);
    const listingDur = 2630000;
    const listing = {
      assetContractAddress: nft.assetContractAddress,
      tokenId: nft.tokenId,
      startTimestamp: new Date(),
      listingDurationInSeconds: listingDur,
      quantity: 1,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken: `${price}`,
    };

    const tx = await contract.direct.createListing(listing);
    // const receipt = tx.receipt; // the transaction receipt
    const expirationDate = new Date((Date.now() / 1000 + listingDur) * 1000);
    const listingId = tx.id; // the id of the newly created listing
    const data = await axios.patch(`/api/nfts/sell/${nft.id}`, {
      listingId: `${listingId._hex}`,
      buyoutPrice: price,
      expirationDate: expirationDate.toISOString(),
    });
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const buyNFT = async (contract, nft, address) => {
  try {
    const quantityDesired = 1;
    await contract.direct.buyoutListing(nft.listingId, quantityDesired);
    const data = await axios.patch(`/api/nfts/transfer/${nft.id}`, {
      owner: address,
    });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.CLOUDINARY_PRESET || "cryptozon"
    );
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dpkj75tyu/image/upload",
      formData
    );
    return data.secure_url;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong uploading.");
  }
};

//TIME
const customLabels = {
  second: {
    future: {
      one: "{0} second left",
      other: "{0} seconds left",
    },
  },
  minute: {
    future: {
      one: "{0} minute left",
      other: "{0} minutes left",
    },
  },
  hour: {
    future: {
      one: "{0} hour left",
      other: "{0} hours left",
    },
  },
  day: {
    future: {
      one: "{0} day left",
      other: "{0} days left",
    },
  },
  month: {
    future: {
      one: "{0} month left",
      other: "{0} months left",
    },
  },
};
TimeAgo.addLocale(en);
TimeAgo.addLabels("en", "custom", customLabels);
const timeAgo = new TimeAgo("en-US");
const customStyle = {
  labels: "custom",
};
export const timeFormat = (date) => timeAgo.format(date, customStyle);
