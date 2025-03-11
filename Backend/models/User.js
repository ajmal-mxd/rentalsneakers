const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String
    

})


// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

module.exports=mongoose.model('User',userSchema)    