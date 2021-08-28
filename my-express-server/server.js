//jshint esversio:6

const express = require("express"); //載入模組
const app = express();

app.get("/", function(request, response) {
    response.send("<h1>Hello, world!</h1>");
});

app.get("/contact", function(req, res) {
    res.send("Contact me at : angela@gmail.com");
});

app.get("/about", function(req, res) {
    res.send("I am handsome")
})

app.get("/hobbies", function(req, res) {
    res.send("HAHA");
})

app.listen(3000,
    function() {
        console.log("Server started on port 3000");
    });