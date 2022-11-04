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
            res.send(resultat);
        }else{
            console.log(err)
        }
    })
})

//update contact 
app.put("/update/:id",(req,res)=>{
    const id = req.params.id;
    const {name,phone, email, cover, groupe}=req.body;
    const updateContact=`UPDATE contact SET name=?,phone=? ,email=? , cover=? group=? WHERE  id = ? `;
    db.query(updateContact,[name,phone,email,cover,groupe,id],(err,resultat)=>{
        if (!err) {
            res.send({"msg":"contact updated with succes "},resultat)
        }else{
            res.send("contact not found ")
        }
    })
})
//add contact 
app.post("/add",(req,res)=>{
    const {name,phone, email, cover, groupe}=req.body;
    const addcontact="insert into contact (name,phone,email,cover,group) value(?,?,?,?,?)";
    db.query(addcontact,[name,phone,email,cover,groupe],(err,resultat)=>{
        if (!err) {
            res.send({"msg":"contact added with succes "},resultat)
        }else{
           console.log(err)
        }
    })
})

//defnir le port de serveur 
app.listen(7000,()=>{
    console.log("server is running ")
})