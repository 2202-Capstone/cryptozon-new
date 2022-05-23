const Sequelize = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  postImage: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "/assets/question.png",
  },
  subscribedUsers: {
    type: Sequelize.JSON,
  },
  isNFT: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
});

module.exports = Post;
