const request = require('request');

const geoCode=(address,cb)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFoZWVjaHk5NiIsImEiOiJjazV5MmdhbDYwOGt0M2txcmJiNjVwbTNsIn0.aRIdneyc3ZwInOBL6DxJPQ&limit=1';
    request({url:url,json:true},(err,res)=>{
        if(err){
            cb('Unable to connect to Location Services!');
        }else if(res.body.features.length ===0){
            cb('Unable to Find Location.Please try another search.');
        }else{
            cb(undefined,{
                lat:res.body.features[0].center[0],
                long:res.body.features[0].center[1],
                place:res.body.features[0].place_name
            });
        }
    });
};

module.exports=geoCode;