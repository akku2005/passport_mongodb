const express = require("express");
const app = express();
const {connectMongoose,Users} = require('./databse.js')
const passport = require("passport");
const{initializingPassport,isAuthenticated} = require("./passportConfig.js")
const expressSession = require("express-session");
//use middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}));

app.use(passport.session());
app.use(passport.initialize());

//set view engine
app.set("view engine","ejs");

connectMongoose();

initializingPassport(passport);
app.get("/",(req,res)=>{
    res.render("index")
});
//for user register
app.get("/register",(req,res)=>{
    res.render("login");
});
//for login user
app.get("/login",(req,res)=>{
    res.render("register")
})

app.post("/register",async(req,res)=>{
    const user = await Users.findOne({username:req.body.username});
    if(user) return res.status(400).send("user already exists");
    const newUser = await Users.create(req.body);
    res.status(201).send(newUser);
});
//login form
app.post("/login",passport.authenticate("local",{failureRedirect:"/register",successRedirect:"/"}),async(req,res)=>{

});
 

//route

app.get("/profile",isAuthenticated,(req,res)=>{
    res.send(req.user);
})

app.get("/logout",(req,res)=>{
    req.logOut();
    res.send("You logged out");
})

app.listen(3000,()=>{
    console.log("Server is working in port 3000")
})