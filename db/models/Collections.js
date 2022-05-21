const Sequelize = require("sequelize");
const db = require("../db");
const slugify = require("slugify");

const Collection = db.define("collection", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  profileImg: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bannerImg: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  slug: {
    type: Sequelize.STRING,
  },
});
Collection.beforeCreate(async (collection) => {
  collection.slug = slugify(collection.name, { replacement: "_", lower: true });
});

Collection.beforeUpdate(async (collection) => {
  if (collection._changed.has("name"))
    collection.slug = slugify(collection.name, {
      replacement: "_",
      lower: true,
    });
});

module.exports = Collection;
