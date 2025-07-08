import cors from "cors";
import express, { Request, response, Response } from "express";
import sql from "mysql2";



const app=express();
app.use(express.json());
app.use(cors());


//sql connection
const connection=sql.createConnection({
  host:"localhost",
  password:"mysqlpass",
  database:"test",
  user:"root"
});


connection.connect((err)=>{
  if(err){
    console.log("there is an error...");
  }else{
    console.log("there is not any error...");
  }
});



//table creation for the database


const student=async ()=>{
  try{
    const sql=`
    create table if not exists students(
    id int auto_increment primary key,
    name varchar(200) not null,
    regd_no bigint not null unique,
    branch varchar(200) not null
    );
    `
    await connection.promise().query(sql);
    console.log("table created successfully...");
  }catch(err){
    console.log(err);
  }
}
student();






















//post method for inserting...
app.post("/insert",async(req:Request , res:Response):Promise<any>=>{
  try{
    const {name , regd_no , branch}=req.body;
    const [rows]= await connection.promise().query(
      `insert into students(name , regd_no , branch) values(? , ? , ? )`,
      [name , regd_no , branch]
    );

    return res.status(201).send({
      message:"inserted to the database...",
      data:rows,
    });
    
  }catch(err){
    return res.status(404).send(err);
  }
});


//get the data
app.get("/get-data",async(_req:Request , res:Response):Promise<any>=>{
  try{
    const [rows]=await connection.promise().query(
      `select * from students`
    );

    return res.status(200).send({
      message:"data fetch successfully...",
      data:rows
    });
  }catch(err){
    return response.status(404).send(err);
  }
});


//update the data
app.put("/update/:id",async(req:Request , res:Response):Promise<any> =>{
  try{
    const {id}=req.params;
    const {name , regd_no , branch}=req.body;
    

    const [result]= await connection.promise().query(
      `update students
       set name= ? , regd_no= ? , branch= ?
       where id= ?
      `,
      [name , regd_no , branch , id]
    );
    return res.status(200).send({
      message:"data updated...",
      updateddata:result
    })
  }catch(err){
    return res.status(404).send(err);
  }
});



//delet
app.delete("/delete/:id",async(req:Request,res:Response):Promise<any>=>{
  try{
    const {id}=req.params;
    const [result]=await connection.promise().query(
      `delete from students
       where id= ? 
      `,
      [id]
    );

    return res.status(200).send({
      message:"id deleted...",
      data:result
    })
  }catch(err){
    return res.status(404).send(err);
  }
})






app.get("/" , (_req:Request , res:Response)=> {
  res.status(200).send("hiii i am backend");
});



app.listen(2000,()=>{
  console.log("backend connected...");
});

