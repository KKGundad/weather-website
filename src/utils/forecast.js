const request = require('request');


const weatherStack = (coord,callback)=>{
    const url1 = `http://api.weatherstack.com/current?access_key=b96ac8ec5f48aea3a9d43f23715d6ce8&query=${coord}`;
    
    
        request({url:url1,json:true},(err,{ body })=>{
            if(err){
                callback('Unable to get the Weather Info',undefined);
            }
            else if(body.error){
                callback(body.error.info,undefined);
            }
            else{
                callback(undefined,body);
            console.log('Temperature is : '+body.current.temperature);
        
            }
        })
        
    
}


module.exports = weatherStack;