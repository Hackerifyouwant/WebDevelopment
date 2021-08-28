const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// mongoose.connect('mongodb+srv://admin-jerry:tzuyuismywife666@cluster0.gg0xu.mongodb.net/todolistDB', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("articles", articleSchema);



app.route("/articles")
    .post(function(req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("success");
            }
        });
    })
    .delete(function(req, res) {
        Article.deleteMany(function(err) {
            if (!err) {
                res.send("Successfully");
            } else {
                res.send(err);
            }
        });
    })
    .get(function(req, res) {
        Article.find(function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    });

app.route("/articles/:articleTitle")
    .get(function(req, res) {

        Article.findOne({ title: req.params.articleTitle }, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    })
    .put(function(req, res) {
        Article.updateOne({ title: req.params.articleTitle }, {
            title: req.body.title,
            content: req.body.content
        }, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Success");
            }
        });
    })
    .patch(function(req, res) {
        Article.updateOne({ title: req.params.articleTitle }, {
            $set: req.body,
        }, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Success");
            }
        });
    })
    .delete(function(req, res) {
        Article.deleteOne({ title: req.params.articleTitle }, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Success");
            }
        })
    })

app.listen(3000, function() {
    console.log("Successfully");
})