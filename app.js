const express = require('express');
const app = express();

//setting up port environment
const port = process.env.PORT || 9000;

//starting server at port
app.listen(port, ()=> {
    console.log(`Server started at ${port}`)
})

//json parsing
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database connection
require("./dbconnect");

//connection to models
const Sellers = require('./Model/Sellers');
const Cars = require('./Model/Cars');

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

//Cars Route
app.post("/cars/:sid", (req,res)=> {
    const cars = new Cars(req.body);
    cars.seller = req.params.sid;
    cars.save();
    Sellers.findById(req.params.sid, (err,seller)=> {
        if (err) throw err;
        else {
            seller.car.push(cars);
            seller.save();
            res.send(cars);
        }
    })
})
app.get("/cars", (req,res)=> {
    Cars.find({}, (err, data)=> {
        if (err) throw err;
        res.send(data);
    })
})
// app.delete("/cars/:sid", (req,res)=> {
//     const cars = new Cars(req.body);
//     cars.seller = req.params.sid;
//     Cars.findByIdAndDelete(req.params.id, (err,seller)=> {
//         if (err) throw err;
//         else {
//             seller.car.delete(cars._id);
//             seller.save();
//             res.send(data);
//         }
//     })
// })