const mongoose = require("mongoose");

exports.connectMongoose =()=>{
    mongoose.connect("mongodb+srv://akashsahu:Akash%402005@akash.bawi1qx.mongodb.net/newUsers?retryWrites=true&w=majority")
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