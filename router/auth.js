const express = require("express")
const router = express.Router()
const User = require("../models/User")

// Register

router.post("/register", async (req, res)=>{

    const {username, email, password, cnfPassword} = req.body

    if (!username || !email || !password || !cnfPassword ) {
        res.status(422).json({ error: "Please fill all the details" });
      }
    

    try{
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(422).json({ message: "User already exists" });
      } else if (password != cnfPassword) {
        res.status(422).json({ message: "Password didn't matched" });
      } else {
        const newUser = new User({
        
          username,
          email,
          password,             
          cnfPassword,
        });

        await newUser.save();



        
        res.status(201).json({ message: "user registered successfully" });

      }

   
    } catch(e)
    {
        res.status(500).json(e)
    } 

})


// sign in 

router.post("/login", async (req,res)=>{

  const {email, password} = req.body;

  try{

  const user = await User.find({email}) 

  if(password===user.password)
  {
    
  }



  }catch(e)
  {
    console.error(e)
  }

  



})


// follow and unfollow  

// follow

router.put("/:id/follow", async (req, res)=>{
  if(req.body.userId !== req.params.id)
  {
    try{

      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if(!user.followers.includes(req.body.userId) )
      {
        await user.updateOne({$push:{followers:req.body.useraId}})
        await currentUser.updateOne({$push:{following:req.params.id}})
        res.status(200).json("User has been followed" )
      }else{
        res.status(403).json("you already follow this user")
      }

    }catch(e)
    {
      res.status(500).json(e);
    }
  }else{
    res.status(403).json("you can't follow yourself")
  }
})

// unfollow

router.put("/:id/unfollow", async (req, res)=>{
  if(req.body.userId !== req.params.id)
  {
    try{
      const user = await User.findbyId(req.params.id)
      const currentUser = await User.findbyId(req.body.userId)
     if(user.followers.includes(req.body.userId))
     {
      await user.updateOne({$pull:{followers:req.body.userId}})
      await currentUser.updateOne({$pull:{following: req.params.id}})

      res.status(200).json("User has been unfollowed")
     }
     else
     {
      res.status(200).json("You don't follow this user")

     }
    }catch(e)
    {
      console.error(e)
    }
  }else
  {
    res.status(403).json("you can't unfollow yourself")

  }
})

// post 







module.exports = router