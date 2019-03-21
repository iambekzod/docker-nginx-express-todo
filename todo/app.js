const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require('fs');

// app.use(express.static("/static"));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

mongoose
  .connect("mongodb://todo-mongodb:27017/todo", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(err => {
    console.log(err);
  });

const Items = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

Item = mongoose.model("item", Items);

app.get("/api/items/", function(req, res, next) {
  var query = Item.find({}).limit(5);

  query.exec(function(err, docs) {
    if (err) return res.status(500).json(err);

    return res.json(docs.reverse());
  });
});

app.post("/api/items/", function(req, res, next) {
  let todo = new Item({ content: req.body.content });

  todo.save(function(err, data) {
    if (err) return res.status(500).json(err);

    return res.json(data);
  });
});

app.get("/api/items/:id/", function(req, res, next) {
  Item.findOne({ _id: req.params.id }, function(err, doc) {
    if (err) return res.status(500).json(err);
    if (!doc) return res.status(404).end("Item id #" + req.params.id + " does not exists");

    return res.json(docs.reverse());
  });
});

app.delete("/api/items/:id/", function(req, res, next) {
  // return res.json({ data: [] });
  Item.findOne({_id: req.params.id}, function(err, item) {
    if (err) return res.status(500).end(err);
    if (!item) return res.status(404).end("Item id #" + req.params.id + " does not exists");

    Item.deleteOne({ _id: item._id }, function(err, num) {
      if (err) return res.status(500).end(err);

      res.json(item);
    });
  });
});

const https = require("https");
const PORT = 3000;

var privateKey = fs.readFileSync('./todo/server.key');
var certificate = fs.readFileSync('./todo/server.crt');
var config = {
        key: privateKey,
        cert: certificate
};

https.createServer(config, app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTPS server on https://localhost:%s", PORT);
});