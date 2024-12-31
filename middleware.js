const Listing=require("./model/listing.js");
const Review=require("./model/review.js");

const{listingSchema}=require("./schema.js");
const ExpressError=require("./utility/expresserror.js");
const{ reviewSchema}=require("./schema.js");
 module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated())
        {
          req.session.redirecturl=req.originalUrl;
          req.flash("error","you must be logged in to create listing! ");
          return res.redirect("/login");
        }
        next();
    }

module.exports.saveurl=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl;
    }
    next();
};

module.exports.isowner=async(req,res,next)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.user._id)){
      req.flash("error","you dont have a permission!!");
     return  res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateList=(req,res,next)=>{
    const {error}=listingSchema.validate(req.body);      
    if(error) 
        {
            throw new ExpressError(400,error);
        }else{
            next();
        }
};
module.exports.validatereview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);      
    if(error) 
        {
            throw new ExpressError(400,error);
        }else{
            next();
        }
};
module.exports.isauthor=async(req,res,next)=>{
    let{id,reviewId}=req.params;
    let review=await  Review.findById(reviewId);
    if(!review.author.equals(res.locals.user._id)){
      req.flash("error","you are not author of review!!");
     return  res.redirect(`/listings/${id}`);
    }
    next();
};