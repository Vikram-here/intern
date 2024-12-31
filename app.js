require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const ejsmate = require("ejs-mate");
const path=require("path");
const methodOverride=require("method-override");
 const ExpressError=require("./utility/expresserror.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./model/user.js");




const listings=require("./routes/listing.js"); 
const reviews=require("./routes/review.js");
const user=require("./routes/user.js");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);


const db_url=process.env.DATA_URL;

const store =MongoStore.create({
    mongoUrl:db_url,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,

});

store.on("error",()=>{
    console.log("error in mongo session",err);
});

const sessionoption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

 
app.listen(8080,()=>{
    console.log("listening on port");
});

 
 

main().then((res)=>{
    console.log("success of connection");
}).catch((err)=>{
    console.log(err);
});

 async function main(){
    await mongoose.connect(db_url);
}

 

 
 
    

app.use(session(sessionoption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>
    {
        res.locals.success=req.flash("success");
        res.locals.error=req.flash("error");
        res.locals.user=req.user;
        next();
    });


app.use("/listings",listings);
app.use("/listings/:id/reviews", reviews);
app.use("/",user);




 
 

app.all("*",(req,res,next)=>
{
    next(new ExpressError(404,"PAGE NOT FOUND"));
});

 
 

 
//error handler

app.use((err,req,res,next)=>{
    let{status=500,message="not faound"}=err;
    // res.status(status).send(message);
    res.render("./listings/error.ejs",{message});
 });



