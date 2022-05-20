import { wrapAsync } from "../../../utils";
import { Collections, User, NFTs } from "../../../db";

const createCollection = wrapAsync(async (req, res) => {
  const { name, profileImg, bannerImg, description = "", address } = req.body;
  // address
  const user = await User.findOne({ where: { wallet: address } });
  if (!user)
    throw new Error(
      "Could not create collection because the user trying to create the collection was not found."
    );

  const newCollection = await Collections.create({
    name,
    profileImg,
    bannerImg,
    description,
  });

  user.addCollection(newCollection);

  return res.status(201).json({ status: "success", data: newCollection });
});

const getAllCollections = wrapAsync(async (req, res) => {
  const collections = await Collections.findAll({
    include: [{ model: User, attributes: ["username"] }, { model: NFTs }],
  });
  return res.status(200).json({ status: "success", data: collections });
});

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getAllCollections(req, res);
      case "POST":
        return await createCollection(req, res);
      default:
        throw new Error("Not a route");
    }
  } catch (err) {
    let statusCode = 400;
    if (err.message === "Not a route") statusCode = 404;
    res.status(statusCode).json({ status: "error", message: err.message });
  }
}
