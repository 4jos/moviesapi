const exp = require("express");
//const bodyparser = require("body-parser");
const app = exp();
const port = process.env.PORT|| 8080;

const cors = require("cors");


app.use(exp.json()) 

//const path = require("path");
//const { pathToFileURL } = require("url");

require('dotenv').config(); 


app.use(cors());


const MoviesDB = require("./modules/moviesDB.js");

const db = new MoviesDB();
console.log(process.env.MONGODB_CONN_STRING);
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(port+1, ()=>{
        console.log(`server listening on: ${port+1}`);
    });

   

}).catch((err)=>{
    console.log(err);
});

app.get("/",function(req,res){

    res.json({message: "API Listening"});

});

app.post("/api/movies",function(req,res){

 console.log(req.body);
   
    db.addNewMovie(req.body).then(function (value) { 
       
   res.json(value);
   
        }).catch((err)=>{
            res.json({"message": "error"});
    
            console.log(err);
            //res.end();
        });;



});
app.get("/api/movies",function(req,res){

     const page = req.query.page;
    const perPage = req.query.perPage;
    const title = req.query.title;


    //res.json(allm);
     db.getAllMovies(req.query.page, req.query.perPage, req.query.title).then(function (value) { 
        
       // console.log(value);
    res.json(value);
    
});


//console.log(res);
  //res.end();

});

app.get("/api/movies/:id",function(req,res){

   
    var id = req.params.id;

console.log(id);


db.getMovieById(id).then(function (value) { 
       
    res.json(value);
    
    }).catch((err)=>{
        res.json({"message": "Could not find movie matching id"});

        console.log(err);
        //res.end();
    });


//res.end();

});



app.put("/api/movies/:id",function(req,res){

   
    var id = req.params.id;

console.log(id);


db.updateMovieById(req.body, id).then(function (value) { 
       
    res.json({"message":"success"});
    
    }).catch((err)=>{
        res.json({"message":"fail"});

        console.log(err);

    });



});




app.delete("/api/movies/:id",function(req,res){

   
    var id = req.params.id;

console.log(id);


db.deleteMovieById(id).then(function (value) { 
       
    res.json({"message":"success"});
    
    }).catch((err)=>{
        res.json({"message":"fail"});

        console.log(err);

    });



});

app.listen(port);
