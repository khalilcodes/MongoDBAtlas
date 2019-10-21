const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khalil:khalil@kb-jgdlm.gcp.mongodb.net/kb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, (err)=> {
    if (err) {
        console.log(err);        
    } else {
        console.log("database connected");
    }
})