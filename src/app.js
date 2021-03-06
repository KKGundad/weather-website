const path = require('path');
const request = require('request')

const express = require('express');
const hbs = require('hbs');
const forcast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname,'../public');
const viewsDir = path.join(__dirname,'../templates/views');
const partialsDir = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs');
app.set('views',viewsDir);
hbs.registerPartials(partialsDir);
app.use(express.static(publicDir));


app.get('/',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'KKG'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'KKG'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help Page',
        name : 'KKG'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'address is not provided'
        })
    }
    console.log(req.query);
    geocode(req.query.address,(error,coord)=>{
        console.log(coord);
        if(error) return res.send({error});
        forcast(coord,(error,forecastData)=>{
            if(error) return res.send({error});
            res.send({
                address : req.query.address,
                temperature : 'The temperature is : ' + forecastData.current.temperature,
                location : forecastData.location.name,
                humidity : 'The humidity is : ' + forecastData.current.humidity,
                pressure : 'The pressure is : ' + forecastData.current.pressure
            });
        })
    })
    
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'KKG',
        errorMessage : 'Help article not found'
    });
})


app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'KKG',
        errorMessage : 'Page not found'
    });
})


app.listen(port,()=>{console.log(`Listening to port ${port}`)});