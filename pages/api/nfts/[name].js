import { NFTs } from "../../../db";
export default async function handler(req, res) {
  const { name } = req.query;
  try {
    switch (req.method) {
      case "GET":
        const data = await NFTs.findOne({ where: { name } });
        return res.status(200).json({ status: "success", data: data });
      default:
        throw new Error("Not a route.");
    }
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
}
