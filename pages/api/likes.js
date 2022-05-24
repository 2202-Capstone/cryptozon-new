
const {User, Post, Comments, LikePost, LikeComments} = require('../../db')
export default async function handler(req,res){
    const {method} = req;

    switch (method) {
        case 'PUT':
            if(req.body.type === 'post'){
                const likeCheck = await LikePost.findAll({where: {
                    postId: req.body.postId,
                    userId: req.body.userId
                }})
                if(likeCheck.length<1){
                    await LikePost.create(req.body);
                }
            }
            if(req.body.type === 'comment'){
                const likeCheck = await LikeComments.findAll({where: {
                    commentId: req.body.commentId,
                    userId: req.body.userId
                }})
                if(likeCheck.length<1){
                    await LikeComments.create(req.body);
                }
            }
            res.status(200).end();
            break;
        case 'DELETE':
            if(req.body.type === 'post'){
                const likeCheck = await LikePost.findAll({where: {
                    postId: req.body.postId,
                    userId: req.body.userId
                }})
                if(likeCheck.length>0){
                    await LikePost.destroy({where:{
                        postId: req.body.postId,
                        userId: req.body.userId
                    }});
                }
            }
            if(req.body.type === 'comment'){
                const likeCheck = await LikeComments.findAll({where: {
                    commentId: req.body.commentId,
                    userId: req.body.userId
                }})
                if(likeCheck.length>0){
                    await LikeComments.destroy({where:{
                        commentId: req.body.commentId,
                        userId: req.body.userId
                    }});
                }
            }
            res.status(200).end();
            break;
        default:
            break;
    }
}