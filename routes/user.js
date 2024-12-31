const express=require("express");
const router=express.Router();
const app=express();
const path=require("path");
const User=require("../model/user.js")
const wrapAsync=require("../utility/wrapasync");
const passport=require("passport");
const{saveurl}=require("../middleware.js");
const usercontroller=require("../controller/user.js");
 
 app.use(express.static(path.join(__dirname,"../public")));
app.set("views",path.join(__dirname,"../views"));

router.route("/signup")
.get(usercontroller.rendersignupform )
.post( wrapAsync(usercontroller.signup));

router.route("/login")
.get(usercontroller.loginform )
.post(saveurl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),usercontroller.login );
 

router.get("/logout", usercontroller.logout)

module.exports=router;
