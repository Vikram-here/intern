const express=require("express");
const router =express.Router();
const app=express();
const wrapAsync=require("../utility/wrapasync.js");
  const Listing=require("../model/listing.js");
const path=require("path");
const {isloggedin,isowner,validateList}=require("../middleware.js")
 
const listingcontroller=require("../controller/listings.js");
 

app.set("views",path.join(__dirname,"../views"));
app.use(express.static(path.join(__dirname,"../public")));
 


 



router.route("/")
.get( wrapAsync(listingcontroller.index))
.post( isloggedin,validateList, wrapAsync(listingcontroller.create ));
 


router.get("/new",isloggedin,listingcontroller.rendernewform );

router.route("/:id")
.get(wrapAsync(listingcontroller.show ))
.put(isloggedin,isowner,validateList,wrapAsync( listingcontroller.update))
.delete(isloggedin,isowner,wrapAsync(listingcontroller.delete ));

 
//edit route
router.get("/:id/edit",isloggedin,isowner,wrapAsync(listingcontroller.edit ));

//update route
 
//create route

 
//delete route

  

module.exports=router;