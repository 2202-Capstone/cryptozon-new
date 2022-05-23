const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  wallet: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  bio: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU',
    // validate: {
    //   isUrl: true
    // }
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  followers: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  following: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User;
