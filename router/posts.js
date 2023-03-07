const express = require("express")
const router = express.Router()
const Post = require("../models/Post")

// create a post

router.post("/", async (req, res)=>{
    const newPost = new Post(req.body)

    try{

        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    }catch(e)
    {
        res.status(500).json(e)
    }
})


// update a post 

router.put("/:id", async (req, res)=>{
    const post = Post.findById(req.params.id)
    try{
        if(post.userId === req.body.userId){

            await post.updateOne({$set:req.body})
            res.status(200).json("the post  has been updated")
        }else{
            res.status(403).json("can't update")
        }
    }catch(e)
    {
        res.status(500).json(e)
    }
})

// delete a post 

router.delete("/:id", async (req, res)=>{
    try{

        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId)
        {
            await post.deleteOne(req.params.id)
            res.status(200).json("the post  has been deleted")

        }
        else{
            res.status(403).json("can't delete")

        }

    }catch(e)
    {
        res.status(500).json(e)
    }
})


// like a post 


router.put("/:id/like", async (req, res)=>{
   try{
    const post = await Post.findById(req.params.id)
    if(!post.likes.includes(req.body.userId))
    {
        await post.updateOne({$push: {likes: req.body.userId}})

        res.status(200).json("The post has been liked")
    }
    else{
        await post.updateOne({$pull: {likes: req.body.userId}})
        res.status(200).json("The post has been disliked")

    }
   }catch(e)
   {
    res.status(500).json(e)
   }
})


// get a post



//  get all posts

mpdule.exports = router