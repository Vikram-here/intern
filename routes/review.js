const express=require("express");
const router =express.Router({mergeParams:true});
const app=express();
 const Review=require("../model/review.js");
const wrapAsync=require("../utility/wrapasync.js");
const ExpressError=require("../utility/expresserror.js");
const Listing=require("../model/listing.js");
const path=require("path");
const{validatereview,isloggedin,isauthor}=require("../middleware.js")


const controllerreview=require("../controller/review.js")

 app.use(express.static(path.join(__dirname,"../public")));
app.set("views",path.join(__dirname,"../views"));


 
//reviews
// post route

router.post("/",isloggedin,validatereview,wrapAsync( controllerreview.createreview))
//delete review route
router.delete("/:reviewId",isloggedin, isauthor,wrapAsync( controllerreview.delete))

module.exports=router;