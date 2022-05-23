import { User, Collections, Post, Comments, LikeComments, LikePost } from "../../db/";

export default async function handler(req, res) {
  const { method } = req;
  let { wallet } = req.query;
  switch (method) {
    case "GET":
      if (wallet.length !== 42 || !wallet.startsWith('0x'))
        throw new Error('Invalid wallet address')
      const [user] = await User.findOrCreate({
        where: {
          wallet: wallet
        },
        defaults: {
          wallet: wallet
        },
        include: [
          {model: Post, include: [{model: User}, {model: LikePost},{model: Comments, include: [{model: User}, {model: LikeComments}]}]},
          {model: Collections, include: {model: User}}
        ]
      })
      return res.status(200).send(user);

    case "PUT":
      const updateUser = await User.findOne({
        where: {
          wallet: wallet,
        },
        include: [
          {model: Post, include: [{model: User}, {model: LikePost},{model: Comments, include: [{model: User}, {model: LikeComments}]}]},
          {model: Collections, include: {model: User}}
        ]
      });
      await updateUser.update(req.body);
      return res.status(200).send(updateUser);
    default:
      break;
  }
}
