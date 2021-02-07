  
const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const{JWT_SECRET}=require('../keys')


router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body
    if(!email||!password||!name){
        res.status(422).json({error:"Please enter all the fields"})
    }
    //res.json({message:"success"})
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Email in use"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user=new User({
                email,
                password:hashedpassword,
                name, 
                pic
            })
            user.save()
            .then(user=>{
                res.json({message:"user saved"})    
            })
            .catch(err=>{
                console.log(err)
            })
        })   
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const{email,password}=req.body
    if(!email||!password){
        return res.status(422).json({error:"Please add email & password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Incorrect email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const{_id,name,email,pic}=savedUser
                res.json({token,user:{_id,name,email,pic}})
            }
            else{
                return res.status(422).json({error:"Incorrect email or password"})
            }
        }) 
        .catch(err=>{
            console.log(err)
        })  
    })
})


module.exports = router