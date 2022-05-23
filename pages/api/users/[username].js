const {User, Follows, Post, LikePost, LikeComments, Collections, Comments} = require('../../../db')

export default async function handler(req, res) {
  const {method, query: {username}} = req;
  const wallet = !!req.body.params ? req.body.params.wallet : null;

  switch (method) {
    case 'GET':
      // const user = await User.findOne({
      //   where: {
      //     username: username
      //   },
      //   include: {model: Post}
      // });
      const user = await User.findOne({
        where: {
          username: username
        },
        include: [
          {model: Collections, include: {model: User}},
          {model: Post, include: [
            {model: User},
            {model: LikePost},
            {model: Comments, include: [
              {model: User},
              {model: LikeComments}
          ]}
          ]}
        ]
      });
      res.status(200).json(user)
      break
    case 'PUT':
      // follow
      const userToFollow = await User.findOne({
        where: {
          username: username
        },
        include: [
          {model: Collections, include: {model: User}},
          {model: Post, include: [
            {model: User},
            {model: LikePost},
            {model: Comments, include: [
              {model: User},
              {model: LikeComments}
          ]}
          ]}
        ]
      })
      const me = await User.findOne({
        where: {
          wallet: wallet
        }
      })
      const exists = await Follows.findOne({
        where: {
          userId: userToFollow.id,
          followerId: me.id
        }
      })
      // can unfollow in the same method if the follow already exists
      if (exists) {
        await me.update({...me, following: me.following - 1})
        await exists.destroy();
        res.json(await userToFollow.update({...userToFollow, followers: userToFollow.followers - 1}))
      } else {
      // update following and followers for both users
      await me.update({...me, following: me.following + 1})
      await Follows.create({userId: userToFollow.id, followerId: me.id})
      res.json(await userToFollow.update({...userToFollow, followers: userToFollow.followers + 1}))
      }
    default:
      res.status(500)
      break
  }
}

