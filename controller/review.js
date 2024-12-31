const Review=require("../model/review");
const Listing=require("../model/listing");

 module.exports.createreview= async (req,res)=>{
    const list= await Listing.findById(req.params.id);
    const newr= new Review(req.body.review);
    newr.author=req.user._id;
    list.reviews.push(newr);

    await newr.save();
    await list.save();
    req.flash("success","new review created");

    res.redirect(`/listings/${list._id}`);
};
module.exports.delete=async (req,res)=>
{
  let {id,reviewId }= req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success"," deleted review");

    res.redirect(`/listings/${id}`);
} ;
