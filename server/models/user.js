const mongoose = require ('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true},
    email:{
        type:String,
        required:true},
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    photo:{
     type:String,
     default:"https://res.cloudinary.com/aditicloudinary1/image/upload/v1612683835/no_image_lmfhmk.jpg"
    },
    // followers:[{type:ObjectId,ref:"User"}],
    // following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User",userSchema)