const {User} = require('../../../db')

export default async function handler(req, res) {
  const {method, query: {userId}} = req;
  switch (method) {
    case 'GET':
        const user = await User.findOne({
            where: {
            id: userId
            }
        });
        res.status(200).send(user)
        break;
    default:
        res.status(500)
        break
    }
}