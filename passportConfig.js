const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users =require("./databse");

exports.initializingPassport=(passport)=>{
    passport.use(new LocalStrategy(async(username,password,done)=>{
        const users = await Users.findOne({username});
        try{
            if(!users) return done (null,false);

        if(! users.password == password) return done (null,false);
        return done(null,users);

        }catch(error){
            return done(error,false);
        }
    }
    ))
    passport.serializeUser((users,done)=>{
        done(null,users.id);
    });
    passport.deserializeUser(async(id,done)=>{
        try{
            const users = await Users.findOne(id);
            done(null,users);
        }catch(error){
            done(error,false);
        }
    })
}

exports.isAuthenticated = (req,res,next)=>{
    if(req.users) return next();
    res.redirect("/login");
}