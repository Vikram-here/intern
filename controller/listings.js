
const Listing=require("../model/listing") ;
const {node}=require("../utility/geocode.js");




module.exports.index=async (req,res)=>{
    const alllist= await Listing.find({});
   
    res.render("listings/index.ejs",{alllist});
};
module.exports.rendernewform=(req,res)=>{
   
    res.render("listings/new.ejs");
  };

module.exports.show=async (req,res)=>{
  
    let{id}=req.params;
   const listing= await Listing.findById(id).populate({path:"reviews",
    populate:{
      path:"author",
    },
   }).populate("owner");
   if(!listing)
   {
    req.flash("error","listing not existed");
    res.redirect("/listings");
  
   };
   const getcoard=await node(listing.location);
   console.log(listing);
   res.render("listings/show.ejs",{listing,getcoard})
  };


  module.exports.edit=async (req,res)=>{
    let{id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
  };

  module.exports.update=async (req,res)=>{
   
     let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing updated !!")
    res.redirect(`/listings/${id}`);
  };

 module.exports.create=async(req,res,next)=>{
   
    const newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    await newlisting.save();
 
    req.flash("success","new listing created");
    res.redirect("/listings");
    
        
   
 } ;

 module.exports.delete=async (req,res)=>{
   let{id}=req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success"," listing deleted");
 
   res.redirect("/listings");
 };
