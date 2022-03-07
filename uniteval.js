const express=require("express");

const app=express();

app.use(logger);
 
app.get("\books",(req,res)=>{
    return res.send({route:"/books"});
});
app.get("/libraries",checkPermission, (req,res)=>{

console.log("liabrarian")
    return res.send({ route: "/libraries", permission: true}  );
});

app.get("/authors ",checkPermission ,(req,res)=>{

console.log("author")
    return res.send({ route: "/authors", permission: true});
});
function checkPermission (req,res,next){

    if(req.path=="/libraries")
    {
       req.permission= true;

    }

    else if(req.path=="/authors")
    {
       req.permission= true;

    }
   // console.log("logger function")
  next();
   }

function logger(req,res,next){

console.log("logger function")
next();

}
app.listen(5000,()=>{


    console.log("port");
})