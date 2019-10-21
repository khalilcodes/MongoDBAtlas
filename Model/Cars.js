const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name : {
        type : String
    },
    year : {
        type : Number
    },
    seller : {
        type : Schema.Types.ObjectId,
        ref : 'Sellers'
    }
});

module.exports = mongoose.model("Cars", CarSchema);