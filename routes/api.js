const express = require("express");
const router = express.Router();

//models
const Item = require("../models/Item");

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

router.route("/item/:item_id").get(function(req, res) {
  Item.findById(req.params.item_id, function(err, item) {
    if (err) res.send(err);

    res.json(item);
  });
});

module.exports = router;
