const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv/config')

const PORT = process.env.PORT || 3001;


//Routes are going to come here
app.get("/", (req, resp) => {
    resp.send("<h1>We are running the ' / ' page.</h1>");
});

//Connect to MongoDB
mongoose.connect(
  process.env.ATLAS_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to MongoBD");
  }
);

// App listening to the server
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
