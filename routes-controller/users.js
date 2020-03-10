require("dotenv/config");
const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {passwordValidation} = require("../custom-validation/validation")
const { createTokenPayload, hashPassword } = require("./applicationController")
const authorization = require("./auth")

// GET all users
router.get("/",authorization, (req, resp) => {
  User.find()
    .then(users => resp.json(users))
    .catch(err => resp.status(400).json(`Error: ${err}`));
});


//POST a new user user
router.post("/register", async (req, resp) => {
  const { username, password, password_confirmation, email } = req.body;

  const error = passwordValidation(password, password_confirmation)
  if (error) return resp.status(422).json({error: error})

  const password_digest = await hashPassword(password)
  const newUser = new User({ username, email, password_digest});

  newUser
    .save()
    .then(() => {
      resp.status(201).json(createTokenPayload(newUser));
    })
    .catch(err => resp.status(422).json(`Error: ${err}`));
});


//Login
router.post("/login", async (req, resp) => {
  const { email, password } = req.body;

  try{
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password_digest);

    if (user && validPassword) {
      return resp.status(201).json(createTokenPayload(user));
    }

  } catch (err) {
    return resp.status(400).json(`Error: Email or password is wrong`);
  }
  return resp.status(400).json(`Error: Email or password is wrong`)

});


//GET a specific
router.get("/:id", authorization , (req, resp) => {
  User.findById(req.params.id)
    .then(user => resp.json(user))
    .catch(err => resp.status(404).json(`Error: ${err}`));
});

module.exports = router;
