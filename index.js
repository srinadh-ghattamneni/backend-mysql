const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express= require("express");
const app=express();
const path=require("path");
const methodOverride =require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));



const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'cse@1234'
  });

// // inserting new data;
// let q="insert into user (id,username,email,password) values ?";
// //let user=["123","123_newuser","abc@gmail.com","abc"];
// let user=[
// ["123b","123_newuserb","abcb@gmail.com","abcb"],
// ["123c","123_newuserc","abcc@gmail.com","abcc"]
// ]




// let getRandomUser= ()=>  {
//     return[
//       faker.string.uuid(),
//       faker.internet.userName(),
//       faker.internet.email(),
//       faker.internet.password(),
//     ];
//   }

// let q="insert into user (id,username,email,password) values ?";
// let data=[];
// for(let i=0;i<100;i++)
// {
//     // user.push(getRandomUser());
//     data.push(getRandomUser());

// }


// home route
app.get("/",(req,res)=>{
  
    let q="select count(*) from user";
    try{
            connection.query(q,(err,result)=>{    
                if(err) throw err;
               // console.log(result[0]["count(*)"]);
               let count=result[0]["count(*)"];
                //res.send(result[0]["count(*)"]);
                res.render("home.ejs",{count});
        
            })
        }catch(err){
            console.log(err);
            res.send("some error occured");
        }
})


app.listen(8080,()=>{
    console.log(" server listening on port 8080");
})

// show route
app.get("/user",(req,res)=>{
    let q="select * from user";

    try{
        connection.query(q,(err,users)=>{    
            if(err) throw err;
           // console.log(result[0]["count(*)"]);
          //console.log(result);
            //res.send(result[0]["count(*)"]);
            res.render("showusers.ejs",{users});
    
        })
    }catch(err){
        console.log(err);
        res.send("some error occured");
    }
});



//edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q=`select * from user where id='${id}'`;
    try{
        connection.query(q,(err,result)=>{    
            if(err) throw err;
           let user=result[0];
            res.render("edit.ejs",{user});
    
        })
    }catch(err){
        console.log(err);
        res.send("some error occured");
    }



})



//update route(DB)
app.patch("/user/:id",(req,res)=>{
    let {id} = req.params;
    let {password:formPass,username:newUsername}=req.body;
    let q=`select * from user where id='${id}'`;
    try{
        connection.query(q,(err,result)=>{    
            if(err) throw err;
           let user=result[0];


           if(formPass!=user.password){
            res.send("wrong password")
           }
           else{
            let q2=`update user set username ='${newUsername}' where id='${id}'`;
            connection.query(q2,(err,result)=>{
                if(err) throw err;
                res.redirect("/user");
            });
           }
           
    
        })
    }catch(err){
        console.log(err);
        res.send("some error occured");
    }
});






// try{
//     connection.query(q,[data],(err,result)=>{    
//         if(err) throw err;
//         console.log(result);
//         console.log(result.length);

//         console.log(result[1]);

//     })
// }catch(err){
//     console.log(err);
// }

// connection.end();

