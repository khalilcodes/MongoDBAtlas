require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(
  `${process.env.DATABASE}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("database connected");
    }
  }
);