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
app.post("/auth/login",(req,res)=>{
    const {email,password}=req.body;
    const selectUser="select * from user where email=? and password=?";
    db.query(selectUser,[email,password],(err,reselt)=>{
        if(reselt.length>0){
            res.status(200).json(reselt)
        }else{
            res.status(400).json({msg:"invalid password"});
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
    db.query(selectUser,[email,password],(err,resltat)=>{
        if(resltat.length>0){
        return  res.status(400).json({"msg":"email already used "})
        }else{
            db.query(insertUser,[email,password],(err,resltatInsert)=>{
                if(resltatInsert){
                  return  res.status(200).json({"msg":"user registred "});
                }
            })  
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
//add Groupe 
app.post("/addGroupe",(req,res)=>{
    const name=req.body;
    const addcontact="INSERT INTO `groupe` (`name`) VALUES ( ?);";
    db.query(addcontact,name,(err,resultat)=>{
        if (resultat) {
            res.status(200).json({"msg":"groupe added "})
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
            res.status(200).json({"msg":"groupe deleted "})
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
app.get("/getbyname",(req,res)=>{
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
            res.status(200).json({"msg":"contact deleted "})
        }else{
            console.log(err)
        }
    })
})

//update contact 
app.put("/update/:id",(req,res)=>{
    const id = req.params.id;
    const {name,phone, email, cover, groupe,description,job}=req.body;
    const updateContact=`UPDATE contact SET name=?,phone=? ,email=?, description=? ,job=? , cover=?  WHERE  id = ? `;
    db.query(updateContact,[name,phone,email,description,job,cover,groupe],id,(err,resltat2)=>{
        console.log(resltat2)
        if (resltat2) {
            
            res.status(200).json({"msg":"contact updated "})
        }else{
            res.status(400).json({"msg":err})
        }
    })
})
//add contact 
app.post("/add",(req,res)=>{
    const {name,phone, email,description,job ,cover, idgroupe}=req.body;
    const addcontact="INSERT INTO `contact` ( `name`, `phone`, `email`, `description`, `job`, `cover`, `idgroupe`) VALUES ( ?, ?, ?, ?, ?,?,?);";
    db.query(addcontact,[name,phone,email,description,job,cover,idgroupe],(err,resultat)=>{
        if (resultat) {
            res.status(200).json({"msg":"contact added "})
        }else{
           console.log(err)
        }
    })
})

//defnir le port de serveur 
app.listen(7000,()=>{
    console.log("server is running ")
})