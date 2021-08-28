//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');


const homeStartingContent = "Hello world";
const aboutContent = "programmer"
const contactContent = "jerry20011210@gmail.com"
var compose_log = [];

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.render("home", {
        'home_text': homeStartingContent,
        'posts': compose_log,
    });

});

app.get("/contact", function(req, res) {
    res.render("contact", { 'contact_text': contactContent });
});

app.get("/about", function(req, res) {
    res.render("about", { 'about_text': aboutContent });
});

app.get("/compose", function(req, res) {
    res.render("compose");
})

app.post("/compose", function(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.body
    };
    compose_log.push(post);
    res.redirect("/");
})

app.get("/posts/:topic", function(req, res) {
    var topic = _.lowerCase(req.params.topic);
    console.log(topic);
    compose_log.forEach(function(Post) {
        var title = _.lowerCase(Post.title);
        if (title === topic) {
            console.log("Match found");
            res.render("post", {
                'title': Post.title,
                'content': Post.content
            });
        } else {
            console.log("Not a Match");
        }
    });


})

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});