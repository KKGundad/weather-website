const request = require('request');


const mapBox = (location,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoia2tndW5kYWQiLCJhIjoiY2tqZ3hyYXMzM3pkdjJ4bnZsdjV4M3JteSJ9.X--rGHJ0eF0VW2mY7NXuPA&limit=1`;
    request({url,json:true},(err,{ body })=>{
    if(err){
        callback('Could not found the geocodes',undefined1);
    }
    else if (!body.features.length )
    {
        callback('No results found for the given location',undefined);
    }
    else{
        
        var long = body.features[0].center[0];
        var lat = body.features[0].center[1];
        var coord = lat+','+long;
        console.log('Place: '+body.features[0].place_name);
        console.log('Co-ordinates: '+lat,long);
        callback(err,coord);

    }
        
    })
}

module.exports = mapBox;