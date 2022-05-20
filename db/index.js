const db = require("./db");
const User = require("./models/User");
const Post = require("./models/Post");
const Comments = require("./models/Comments");
const Collections = require("./models/Collections");
const NFTs = require("./models/NFTs");
const Follows = require("./models/Follows");
const LikePost = require('./models/LikesPost');
const LikeComments = require("./models/LikesComments");
const Notifications = require("./models/Notifications");

User.hasMany(Collections);
Collections.belongsTo(User);

Collections.hasMany(NFTs, { onDelete: "cascade" });
NFTs.belongsTo(Collections);

User.hasMany(Post);
Post.belongsTo(User);
Comments.belongsTo(Post);
Post.hasMany(Comments);
User.hasMany(Comments);
Comments.belongsTo(User);

User.belongsToMany(User, {through: Follows, as: 'follower'})
Post.hasMany(LikePost)
Comments.hasMany(LikeComments)
LikePost.belongsTo(User)
LikeComments.belongsTo(User)
Notifications.belongsTo(User)
User.hasMany(Notifications)
module.exports = {
  db,
  User,
  Post,
  Comments,
  Collections,
  Follows,
  NFTs,
  LikePost,
  LikeComments,
  Notifications
};
