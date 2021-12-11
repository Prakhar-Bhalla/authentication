const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Post = require("../models/Post.models");

const router = express.Router();

router.get("/", authenticate, async(req, res) => {
    try {
        const posts = await Post.find().lean().exec();
        res.status(200).send({posts});
    } catch(e) {
        res.status(500).json({status: "failed", message: e.message});
    }
})

router.post("/", authenticate, async(req, res) => {
    try {
        const post = await Post.create({
            title : req.body.title,
            body : req.body.body,
            user : req.user.user._id
        });
        res.status(200).send({post});
    } catch(e) {
        res.status(500).json({status: "failed", message: e.message});
    }
})

module.exports = router;