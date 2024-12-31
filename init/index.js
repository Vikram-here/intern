const mongoose=require("mongoose");
const initDB=require("./data.js");
const Listing=require("../model/listing.js");


const mongo_url="mongodb://127.0.0.1:27017/wanderlust ";

main().then((res)=>{
    console.log("success of connection");
}).catch((err)=>{
    console.log(err);
});

 async function main(){
    await mongoose.connect(mongo_url);
}

const initDATA = async ()=>
{
   await Listing.deleteMany({});
   initDB.data= initDB.data.map((obj)=>({...obj,owner:"676ddd1e1b68ff5adb0539ba"}));

     await Listing.insertMany(initDB.data);
    console.log("data was initialise");
};
initDATA();
