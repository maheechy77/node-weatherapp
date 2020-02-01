const path=require('path');
const express=require('express');
const hbs=require('hbs');
const app=express();

const viewsPath=path.join(__dirname,'./templates/views');
const partialsPath=path.join(__dirname,'./templates/partials');

const geoCode=require('./utils/geoCode');
const forcast=require('./utils/forcast');


app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(path.join(__dirname,'./public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Mahee Chy.'
    })
});
const message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message,
        name:'Mahee Chy.'
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Mahee Chy.'
    })
});

app.get('/weather',(req,res)=>{
    // res.send({
    //     title:"Weather page",
    //     forcast:'Rainy',
    //     temp:'21 degree',
    //     location:'Dhaka',
    //     name:'Mahee Chy.'
    // })
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        });
    }
    geoCode(req.query.address,(err,data={})=>{
        if(err){
            return res.send({
                err
            })
        }
        forcast(data.lat,data.long,(err,forcastData)=>{
            if(err){
                return res.send({
                    err
                })
            }
            res.send({
                forcast:forcastData,
                location:data.place,
                address:req.query.address
            })
            
        });
    });
});


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mahee Chy'
    })
});

app.listen(3000);