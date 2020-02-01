const request = require('request');

const forcast=(long,lat,cb)=>{
    const url='https://api.darksky.net/forecast/71e5dcdd84433da7396ff7425851f586/'+lat+','+long+'?units=si';
    request({url:url,json:true},(err,res)=>{
        if(err){
            cb('Unable to connect to internet!',undefined);
        }else if(res.body.error){
            cb(res.body.error,undefined)
        }else{
            cb(undefined,{
                forcast:"Current Temp is "+res.body.currently.temperature+" And the chance of rain "+res.body.currently.precipProbability+"%"
            })
        }
    });   
}

module.exports=forcast;