require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const usersRoute = require("./routes-controller/users");
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

//Routes Middleware
app.use("/users", usersRoute);

//Connect to MongoDB
mongoose.connect(
  process.env.ATLAS_URI,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to MongoBD")
).catch(err => console.log(err));

// App listening to the server
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
  console.log("Press 'Control' + 'C' to exit")
});
