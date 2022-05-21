import { wrapAsync } from "../../../utils";
import { Collections, NFTs, User } from "../../../db";

const getSingleCollection = wrapAsync(async (req, res) => {
  const collection = await Collections.findOne({
    where: { slug: req.query.slug },
    include: [{ model: NFTs }, { model: User }],
  });
  if (!collection) throw new Error("Could not find the collection");
  return res.status(200).json({ status: "success", data: collection });
});

const editSingleCollection = wrapAsync(async (req, res) => {
  const collection = await Collections.findOne({
    where: { slug: req.query.slug },
  });
  if (!collection) throw new Error("Could not find the collection");
  const { profileImg, bannerImg = "", name, description = "" } = req.body;
  if (!name && !profileImg)
    throw new Error("Name and profile picture must be provided");
  await collection.update({ profileImg, bannerImg, name, description });

  return res.status(200).json({ status: "success", data: collection });
});

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getSingleCollection(req, res);
      case "PATCH":
        return await editSingleCollection(req, res);
      default:
        throw new Error("Something went wrong");
    }
  } catch (err) {
    return res.status(400).json({ status: "error", message: err.message });
  }
}
