const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

const articleSeed = [
  {
    title: "1",
    url: "1",
    date: new Date(Date.now())
  },
  {
    title: "2",
    url: "2",
    date: new Date(Date.now())
  },
  {
    title: "3",
    url: "3",
    date: new Date(Date.now())
  }
];


db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    process.exit(0);
  })
  .catch(err => {
    process.exit(1);
  });