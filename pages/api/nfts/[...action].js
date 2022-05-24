import { wrapAsync } from "../../../utils";
import { NFTs, User, Notifications } from "../../../db";
//this will also be used for buying.
const transferNFT = wrapAsync(async (req, res) => {
  const { owner } = req.body;
  const [, id] = req.query.action;
  const {owner:oldOwner, name:nftName, buyoutPrice:nftPrice} = await NFTs.findOne({where:{id}})
  const {id:oldOwnerId} = await User.findOne({where: {wallet:oldOwner}})
  const newNotification = {
    title: 'You sold an NFT!',
    content: `Your NFT ${nftName} was sold for ${nftPrice} ETH!`,
    userId: oldOwnerId,
  }
  await Notifications.create(newNotification)
  const [, transferredNFT] = await NFTs.update(
    { owner, listingId: null, buyoutPrice: null, expirationDate: null },
    { where: { id }, returning: true }
  );
  return res.status(200).json({ status: "success", data: transferredNFT });
});

const sellNFT = wrapAsync(async (req, res) => {
  const { listingId, buyoutPrice, expirationDate } = req.body;
  const [, id] = req.query.action;

  const [, sellingNFT] = await NFTs.update(
    { listingId, buyoutPrice, expirationDate },
    { where: { id }, returning: true }
  );
  return res.status(200).json({ status: "success", data: sellingNFT });
});

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "PATCH":
        const [action] = req.query.action;
        if (action === "transfer") {
          return await transferNFT(req, res);
        }
        if (action === "sell") {
          return await sellNFT(req, res);
        }
      default:
        throw new Error("Not a route.");
    }
  } catch (e) {
    return res.status(400).json({ status: "error", message: e.message });
  }
}
