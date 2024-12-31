const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");



const listingSchema=new Schema({
    title:
    {
        type:String,
        required:true,

    },
    description:String,
    image:{
       type: String,
       default:"https://img.freepik.com/free-photo/woman-beach-with-her-baby-enjoying-sunset_52683-144131.jpg?t=st=1734934907~exp=1734938507~hmac=1f2235e333d5cc505689d3c125ea2ea0f629fdb13ce5859b3ee285ce69e8391d&w=1060",
        set:(val)=>val===""? "https://img.freepik.com/free-photo/woman-beach-with-her-baby-enjoying-sunset_52683-144131.jpg?t=st=1734934907~exp=1734938507~hmac=1f2235e333d5cc505689d3c125ea2ea0f629fdb13ce5859b3ee285ce69e8391d&w=1060":val,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    },
],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
}
});
listingSchema.post("findOneAndDelete",async (listing)=>
    {
        if(listing){
            await Review.deleteMany({_id:{$in:listing.reviews}});
    
        }
     }
    );

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;