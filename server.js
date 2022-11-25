const exprerss= require("express");
const cors =require("cors");
const bodyparser=require("body-parser");
const sql=require("mysql2");

//definir un consttecteur de express 
const app = exprerss();

//definir la methode a besoin 
app.use(exprerss.json());
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))

//relier le serveur avec database 
const db= sql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"contact_db"
})

//login 
app.get("/auth/login",(req,res)=>{
    const {email,password}=req.body;
    const selectUser="select * from user where email=? and password=?";
    db.query(selectUser,[email,password],(err,reselt)=>{
        if(reselt){
            res.send("welcome you are Connected ");
        }else{
            res.send("Invalid email or password");
        }
        if(err){
            console.log(err)
        }
    })
})

//register 
app.post("/auth/register",(req,res)=>{
    const {email,password}=req.body;
    const selectUser="select * from user where email=? and password=?";
    const insertUser="insert into user(email,password) value(?,?)";

    db.query(insertUser,[email,password],(err,resltatInsert)=>{
            if(resltatInsert){
                res.send("user registred ");
            }
        })
    db.query(selectUser,[email,password],(err,resltat)=>{
        if(resltat){
            res.send("email alredy used ")
        }
        if(err){
            console.log(err)
        }
        
    })
})
//get all Groupe 
app.get("/getallGroupe",(req,res)=>{
    const getall="select * from groupe";
    db.query(getall,(err,resultat)=>{
        if (!err) {
            res.send(resultat);
        }else{
            console.log(err)
        }
    })
})

//delete Groupe
app.delete("/groupe/:id",(req,res)=>{
    const id =req.params.id;
    const deleteGroupe=`delete  from groupe where ${id}=id`;
    db.query(deleteGroupe,(err,resultat)=>{
        if (!err) {
            res.send("Groupe deleted with succes ");
        }else{
            console.log(err)
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
    const getbyname=`SELECT * FROM contact WHERE name LIKE ?`;
    db.query(getbyname,name,(err,resultat)=>{
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
        if (resultat) {
            res.send("Contact deleted with succes ");
        }else{
            console.log(err)
        }
    })
})

//update contact 
app.put("/update/:id",(req,res)=>{
    const id = req.params.id;
    const {name,phone, email, cover, groupe}=req.body;
    const updateContact=`UPDATE contact SET name=?,phone=? ,email=? , cover=? groupe=? WHERE  id = ? `;
    db.query(updateContact,[name,phone,email,cover,groupe,id],(err,resultat)=>{
        if (!err) {
            res.send("contact updated with succes ")
        }else{
            res.send("contact not found ")
        }
    })
})
//add contact 
app.post("/add",(req,res)=>{
    const {name,phone, email, cover, groupe}=req.body;
    const addcontact="INSERT INTO `contact` (`name`, `phone`, `email`, `cover`, `groupe`) VALUES ( ?, ?, ?, ?, ?);";
    db.query(addcontact,[name,phone,email,cover,groupe],(err,resultat)=>{
        if (resultat) {
            res.send("contact added with succes ")
        }else{
           console.log(err)
        }
    })
})

//defnir le port de serveur 
app.listen(7000,()=>{
    console.log("server is running ")
})