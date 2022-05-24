const {User, Follows} = require('../../../db')

export default async function handler(req, res) {
  const {method, query: {info}} = req;
  let user;

  switch (method) {
    case 'GET':
      // info can be wallet (signedIn) or username (for other user)
      if (info.length > 20) {
        user = await User.findOne({
          where: {
            wallet: info
          }
        })
      } else {
        user = await User.findOne({
          where: {
            username: info
          }
        })
      }
      const follows = await Follows.findAll({
        where: {
          followerId: user.id
        }
      })
      const following = await Promise.all(follows.map(async (f) => {
        let person = await User.findOne({
          where: {
            id: f.userId
          },
          attributes: ["username", "imageUrl", "id"]
        })
        return person
      }))
      res.status(200).json(following)
      break
    default:
      res.status(500)
      break
  }
}
