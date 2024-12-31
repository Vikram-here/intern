const axios=require("axios");

module.exports.node =async(location)=>{
 
    
    const{data}=await axios.get(`https://api.positionstack.com/v1/forward?access_key=47fc8b8b9e59cd2a707976f473c11041&query=${location}`);
   
   return  coardinate={
         latitude:data.data[0].latitude,
         longitude:data.data[0].longitude

    };
   
    
      

}
 
