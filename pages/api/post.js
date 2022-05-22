const {User, Post, Comments, LikePost, LikeComments} = require('../../db')
export default async function handler(req,res){
    const {method, body} = req;
    switch (method) {
        case 'GET':
            const postFromDB = await Post.findAll(
                {
                    include:[
                        {
                            model:User
                        },
                        {
                            model:Comments,
                            include:[
                                {
                                    model:User
                                },
                                {
                                    model:LikeComments
                                }
                            ],
                        },
                        {
                            model:LikePost
                        }
                    ],
                    order:[
                        ['id', 'DESC'],
                        [Comments, 'id', 'ASC']
                    ]
                });
            res.status(200).send(postFromDB);
            break;
        case 'PUT':
            //add post to db
            await Post.create(req.body);
            res.status(200).end();
            break;

        case 'PATCH':
            const oldData = await Post.findAll({where:{
                id: body.postId
            }})
            if(!oldData[0].subscribedUsers.includes(body.userId)){
                let updatedUsers = [...oldData[0].subscribedUsers, body.userId]
                await Post.update({subscribedUsers:updatedUsers},{where:{
                    id: body.postId
                }})
            }
            res.status(200).end()
            break;
        case 'DELETE':
            const postToDelete = await Post.findOne({
                where: {
                    id: req.body.id
                }
            })
            await postToDelete.destroy()
            res.status(200).end()
        default:
            break;
    }
}
