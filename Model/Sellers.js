const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    car : [{
        type : Schema.Types.ObjectId,
        ref : "Cars"
    }]
})

module.exports = mongoose.model("Sellers", SellerSchema)

