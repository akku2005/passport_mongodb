const mongoose = require("mongoose");

exports.connectMongoose =()=>{
    mongoose.connect("//pass database url")
    .then((e)=>console.log(`connected to mongoDb:${e.connection.host}`))
    .catch((e)=>console.log(e));
}

const userSchema = new mongoose.Schema({
    name:String,
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
})
exports.Users = mongoose.model("Users",userSchema);
