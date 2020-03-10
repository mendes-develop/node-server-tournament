require("dotenv/config");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 1- Extract token from request.headers ["Authorization"]
// const token = request.headers["Authorization"].split(" ")

// function getToken(){
//     requestAnimationFrame.hea
// }
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function createTokenPayload(user) {
  const payload = { user_id: user._id, username: user.name };
  return { token: jwt.sign(payload, process.env.JWT_SECRET), payload: payload };
}


// 2- Decode token and extract basic valuable information like userID
// const secretKey = process.env.JWT_SECRET_KEY
// JWT.decode(token, secretKey, true, {algorithm: 'HS256'})

// 3- Send it back to the front end as a response

module.exports.createTokenPayload = createTokenPayload;
module.exports.hashPassword = hashPassword;

// class ApplicationController < ActionController::API

//     def token
//         request.headers['Authorization'].split(' ')[1]
//     end

//     def secretKey
//         jwt_secret = ENV['JWT_SECRET']
//     end

//     def decoded_token
//         JWT.decode(token, secretKey, true, {algorithm: 'HS256'})
//     end

//     def current_user_login

//         if request.headers['Authorization'].split(' ')[1] == "undefined"
//             return nil
//         else
//             User.find(decoded_token()[0]['user_id'])
//         end
//     end

//     def create_token(user_id)

//         payload = {user_id: user_id}
//         JWT.encode(payload, secretKey, 'HS256')

//     end

// end
