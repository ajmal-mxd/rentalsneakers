const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    phone:String,
    resetToken: String,
    resetTokenExpiry: Date,
    location:String,
    pincode:String,
    role:{
        type:String,
        default:'user'
    },
    blocked:Boolean,
    

})


module.exports=mongoose.model('User',userSchema)    