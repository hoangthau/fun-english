const express = require("express");
const router = express.Router();
const _ = require("lodash");

//models
const Item = require("../models/Item");
const Word = require("../models/Word");

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

//for item
router
  .route("/items")
  .get(function(req, res) {
    Item.find(function(err, items) {
      if (err) res.send(err);
      res.json(items);
    });
  })
  .post(function(req, res) {
    var item = new Item();
    item.title = req.body.title;
    item.date = new Date().getTime();
    item.fullName = req.body.fullName;
    item.imageUrl = req.body.imageUrl;

    item.save(function(err) {
      if (err) res.send(err);

      res.json({ item: item, message: "Item created!" });
    });
  });

router
  .route("/item/:item_id")
  .get(function(req, res) {
    Item.findById(req.params.item_id, function(err, item) {
      if (err) res.send(err);

      res.json(item);
    });
  })
  .put(function(req, res) {
    Item.findById(req.params.item_id, function(err, item) {
      if (err) res.send(err);
      item.claps = req.body.claps;

      item.save(function(err) {
        if (err) res.send(err);

        res.json({ message: "Item updated claps!" });
      });
    });
  })
  .delete(function(req, res) {
    Item.remove(
      {
        _id: req.params.item_id
      },
      function(err) {
        if (err) res.send(err);

        res.json({ message: "Successfully deletected" });
      }
    );
  });

//for words
router
  .route("/words")
  .get(function(req, res) {
    Word.find(function(err, words) {
      if (err) res.send(err);

      const username = req.query.username;
      let _words = words;
      if (username) {
        _words = _.filter(words, { username: username });
      }
      res.json(_words);
    });
  })
  .post(function(req, res) {
    var word = new Word();
    word.vocabulary = req.body.vocabulary;
    word.pronunciation = req.body.pronunciation;
    word.username = req.body.username;
    word.meanings = req.body.meanings;
    word.similarSound = req.body.similarSound;
    word.imageUrl = req.body.imageUrl;
    word.date = new Date().getTime();

    word.save(function(err) {
      if (err) res.send(err);

      res.json({ word: word, message: "Word created!" });
    });
  });
router
  .route("/word/:word_id")
  .get(function(req, res) {
    Word.findById(req.params.word_id, function(err, word) {
      if (err) res.send(err);

      res.json(word);
    });
  })
  .put(function(req, res) {
    Word.findById(req.params.word_id, function(err, word) {
      if (err) res.send(err);
      word.vocabulary = req.body.vocabulary;
      word.pronunciation = req.body.pronunciation;
      word.meanings = req.body.meanings;
      word.similarSound = req.body.similarSound;
      word.imageUrl = req.body.imageUrl;
      word.date = new Date().getTime();

      word.save(function(err) {
        if (err) res.send(err);

        res.json({ message: "Word updated" });
      });
    });
  })
  .delete(function(req, res) {
    Word.remove(
      {
        _id: req.params.word_id
      },
      function(err) {
        if (err) res.send(err);

        res.json({ message: "Successfully deletected" });
      }
    );
  });

module.exports = router;
