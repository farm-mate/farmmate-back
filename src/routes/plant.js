import { Express, Request, Response, NextFunction } from "express";
const express = require('express');
const router = express.Router();
var Plant = require('../models/plant');
var Comment = require('../models/comment');
const {auth} = require('../middleware/auth');


/* 
    변수설명
    {port} : 포트번호
    {postId} : 게시글 _id (오브젝트 타입)

 */ 


// 식물 등록
// POST
// localhost:{port}/plants
router.post("/",  async (req, res) => {
    const post = new Plant();
    
    try {
        post.plantType = req.body.plantType;
        post.plantNickname = req.body.plantNickname;
        post.plantLocation = req.body.plantLocation;
        post.memo = req.body.memo;
        post.firstPlantingDate = req.body.firstPlantingDate;

        await post.save();
      res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
});

// 식물 정보 수정
// PUT
// localhost:{port}/plants/edit/{postId}
router.put('/edit/:id', async (req, res) => {
    const post = await Plant.findOne({_id : req.params.id}); 
        try {
            var date = new Date();
            post.plantType = req.body.plantType;
            post.plantNickname = req.body.plantNickname;
            post.plantLocation = req.body.plantLocation;
            post.memo = req.body.memo;
            post.firstPlantingDate = req.body.firstPlantingDate;

            await post.save();
            res.json(post);
        } catch(err) {
            res.status(500).json(err);
        }    
    } else {
        res.status(401).json("글 작성자만 수정 가능합니다.")
    }
)


// 게시물 삭제 - 권한필요
// PUT
// localhost:{port}/plants/delete/{postId}
router.put('/delete/:id', auth, async (req, res) => {
    const post = await Plant.findOne({_id : req.params.id}); 

    if (post.userId === req.user._id) {
        try {
            var date = new Date();
            post.isDeleted = true;
            post.updatedAt = date;

            await post.save();
            res.json(post);
        } catch(err) {
            res.status(500).json(err);
        }    
    } else {
        res.status(401).json("글 작성자만 수정 가능합니다.")
    }
})


// 특정 게시물 조회
// GET
// localhost:{port}/plants/{postId}
router.get("/:id", async (req, res) => {
        Promise.all([
            Plant.findOne({_id : req.params.id}).populate({path : 'username', populate : {path : "name"}}),
            Comment.find({_id : req.params.id}).sort('createdAt').populate({path : 'author', populate : {path : "name"}}),

        ])
        .then (([post, comments]) => {

            return res.status(200).json({post, comments});
            
        })
        .catch((err) => {
            console.log('err: ', err);
            return res.status(500).json(err);
        });
 });
       


// 모든 게시글 조회
// GET
// localhost:{port}/plants
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username) {
            posts = await Plant.find({username:username})
        // } else if(catName) {
        //     posts = await Qual.find({categories: {
        //         $in:[catName]
        //     }})
        } else {
            posts = await Plant.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;