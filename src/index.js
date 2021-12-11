const express = require("express");

const {register, login} = require("./controllers/auth.controller");

const postController = require("./controllers/post.controllers");

const { body} = require('express-validator');

const app = express();

app.use(express.json());

app.post("/register", body("name").notEmpty().withMessage("Name field can't be empty"), body("email").notEmpty().withMessage("Email field can't be empty").bail().isEmail().withMessage("Invalid email"), body("password").notEmpty().withMessage("Password field can't be empty").bail().custom((value) => {
    const isPassword = /^\w{3,}[@$*]+[0-9]+$/.test(value);
    if(!isPassword)
    {
        throw new Error("Password should be of format alphanumeric + special character + numeric");
    }
    if(value.length < 8)
    {
        throw new Error("Password should be of atleast 8 characters");
    }
    return true;
}), register);

app.post("/login", login);

app.use("/posts", postController);

module.exports = app;