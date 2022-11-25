const exprerss= require("express");
const cors =require("cors");
const bodyparser=require("body-parser");
const sql=require("mysql2");
const bcrypt=require("bcrypt");
const cookie = require("cookie-parser");
const jwt =require("jsonwebtoken");
const dotenv= require("dotenv").config()
//definir un consttecteur de express 
const app = exprerss();
//definir la methode a besoin 
app.use(exprerss.json());
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookie())
//relier le serveur avec database 
const db= sql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"contact_db"
})
//get all groupe 
app.get("/getallgroup",(req,res)=>{
    const getallgroup="select * from groupe";
    db.query(getallgroup,(err,resultat)=>{
        if(!err){
            res.send(resultat);
        }else{
            console.log(err)
        }
    })
})
//add Group 
app.post("/addgroup",(req,res)=>{
    const name=req.body;
    const addG="insert into groupe (name) values (?)";
    db.query(addG,name,(err,resultat)=>{
        if (resultat) {
            res.send("Groupe added with succes")
        }else{
           res.send(err)
        }
    })
})


// delete groupe 
app.delete("/groupe/:id",(req,res)=>{
    const id =req.params.id;
    const deleteG=`delete  from groupe where id= ${id}`;
    db.query(deleteG,(err,resultat)=>{
        if (!err) {
            res.send("Groupe deleted with succes");
        }else{
            console.log(err)
        }
    })
})

//login user 

app.get("/auth/login",(req,res)=>{
    const {email,password}=req.body;
    const selectuser=`select * from user where email=? AND password=?`;
    db.query(selectuser,[email,password],(err,reslt)=>{
        if (err) {
            console.log(err)
        }
        if (reslt) {
           res.send("welcom you are conected") 
        }else{
            res.send("invalid email or password ")
        }
    })

})
// Register user 
app.post("/auth/register",(req,res)=>{
    const {email,password}=req.body;
    console.log(email)
    console.log(password)
    const selectCuser=`select * from user where email=? `;
    


    const insertUser="insert into user (email,password) values (?,?)";
    db.query(selectCuser,email,(err,reslt)=>{
        console.log(reslt)
        if (err) {
            console.log(err)
        }
        if (reslt) {
            // res.send("your email already used !")
            db.query(insertUser,[email,password],(err,reslt)=>{
                // if(err){
                //     console.log(err)
                // }
            
                    res.send("user registred with succes ")
                
        }
        
        )
    }
    })
    })


//get all contact 
app.get("/getall",(req,res)=>{
    const getall="select * from contact";
    db.query(getall,(err,resultat)=>{
        if (!err) {
            res.send(resultat);
        }else{
            console.log(err)
        }
    })
})

//get contact by id 
app.get("/getall/:id",(req,res)=>{
    const id =req.params.id;
    const getbyid=`select * from contact where ${id}=id`;
    db.query(getbyid,(err,resultat)=>{
        if (!err) {
            res.send(resultat);
        }else{
            console.log(err)
        }
    })
})
//get contact by name 
app.get("/getall",(req,res)=>{
    const name =req.query.name;
    const getbyname=`select * from contact where ${name}=name`;
    db.query(getbyname,(err,resultat)=>{
        if (!err) {
            res.send(resultat);
        }else{
            console.log(err)
        }
    })
})
// delete contact 
app.delete("/contact/:id",(req,res)=>{
    const id =req.params.id;
    const deletecontact=`delete  from contact where ${id}=id`;
    db.query(deletecontact,(err,resultat)=>{
        if (!err) {
            res.send("contact deleted with succes");
        }else{
            console.log(err)
        }
    })
})

//update contact 
app.put("/update/:id",(req,res)=>{
    const id = req.params.id;
    const {name,phone, email, cover, groupe}=req.body;
    const updateContact=`UPDATE contact SET name=?,phone=? ,email=? , cover=?,groupe=? WHERE  id = ${id}`;
    db.query(updateContact,[name,phone,email,cover,groupe],(err,resultat)=>{
        if (!err) {
            res.send("contact updated with succes")
        }else{
            res.send(err)
        }
    })
})
//add contact 
app.post("/add",(req,res)=>{
    const {name,phone, email, cover, groupe}=req.body;
    const addcontact="insert into contact (name,phone,email,cover,groupe) values (?,?,?,?,?)";
    db.query(addcontact,[name,phone,email,cover,groupe],(err,resultat)=>{
        if (!err) {
            res.send("contact added with succes")
        }else{
           res.send(err)
        }
    })
})

//defnir le port de serveur 
app.listen(7000,()=>{
    console.log("server is running ")
})