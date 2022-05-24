const {User, Follows} = require('../../../db')

export default async function handler(req, res) {
  const {method, query: {info}} = req;
  let user;
  switch (method) {
    case 'GET':
      try {
      // adding this bc info can either be a wallet (logged in) or username (other user)
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
          userId: user.id
        },
      })
      const followers = await Promise.all(follows.map(async (f) => {
        let person = await User.findOne({
          where: {
            id: f.followerId
          },
          attributes: ["username", "imageUrl",'id']
        })
        return person
      }))
      res.json(followers)
      break
    } catch (err) {
      res.status(400).json(err.message)
    }
    default:
      res.status(500)
      break
  }
}

