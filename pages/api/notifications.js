const {User, Post, Comments, Notifications} = require('../../db')
export default async function handler(req,res){
    const {method, body, query} = req;
    switch (method) {
        case 'PUT':
            await Notifications.create(body.notificationData);
            res.status(200).end();
            break;
        case 'GET':
            const currentNotifications = await Notifications.findAll({
                where:{
                    userId: query.id
                } })
            res.status(200).send(currentNotifications)
            break;
        case 'DELETE':
            await Notifications.destroy({
                where: {
                    delivered: true,
                }
            })
            res.status(200).end()
            break;
        case 'PATCH':
            await Notifications.update({delivered: true}, {where:{
                id: body.id
            }})
            res.status(200).end();
            break;
        default:
            res.status(500).end();
            break;
    }
}