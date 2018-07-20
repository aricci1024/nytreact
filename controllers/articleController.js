const db = require("../models");

module.exports = {
    create: function (req, res) {
        db.Article
            .create({title: req.body.title, date: req.body.date, link: req.body.link})
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.status(422).json(err));
    },
    findAll: function (req, res) {
        db.Article
            .find(req.query)
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Article
          .findById({ _id: req.params.id })
          .then(dbArticle => dbArticle.remove())
          .then(dbArticle => res.json(dbArticle))
          .catch(err => res.status(422).json(err));
      }
};