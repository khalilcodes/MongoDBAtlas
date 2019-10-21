const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const dbconnect = require("./dbconnect")
var bodyParser = require('body-parser');

const Sellers = require('./Model/Sellers');
const Cars = require('./Model/Cars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Seller Route
app.post("/seller", (req,res)=> {
    const seller = new Sellers(req.body);
    seller.save((err)=> {
        if (err) throw err;
        res.send(seller);
    })
})
app.get("/seller", (req,res)=> {
    Sellers.find({}, (error,data)=> {
        if (error) throw err;
        else res.send(data);
    })
})

//Cars Routes
app.post("/cars/:sid", (req,res)=> {
    const cars = new Cars(req.body);
    cars.seller = req.params.sid;
    cars.save();
    Sellers.findById(req.params.sid, (err,seller)=> {
        if (err) throw err;
        else {
            seller.car.push(cars._id);
            seller.save();
            res.send(cars);
        }
    })
})

app.listen(port, ()=> {
    console.log(`Server started at ${port}`)
})