const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express= require("express");
const app=express();
const path=require("path");

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

