const mongoose = require('mongoose')
    // Connection URI

const option = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect('mongodb://localhost:27017/fruitDB', option)

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 10,
    review: 'Excellent'
});

//fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//     name: "Jerry",
//     age: 30,
//     favouriteFruit: fruit

// });
// person.save();

Person.updateOne({ name: "John" }, { age: 10, favouriteFruit: fruit }, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Good");
        mongoose.connection.close();
    }
});

const Kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: 'Good'
});


const Banana = new Fruit({
    name: "Banana",
    rating: 5,
    review: 'Not Good'
});


const Orange = new Fruit({
    name: "Orange",
    rating: 7,
    review: 'Kind of excellent'
});

// Fruit.insertMany([Kiwi, Banana, Orange], function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Successfully saved all the fruits to fruitsDB');
//     }
// })

Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err);
    } else {


        fruits.forEach(function(fruit) {
            console.log(fruit.name);
        });

    }
});

// Fruit.deleteOne({ name: "Kiwi" }, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Good job");
//         mongoose.connection.close();
//     }
// });

// Person.deleteMany({ name: "John" }, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Good job");
//         mongoose.connection.close();
//     }
// });