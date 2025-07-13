import express, { Request, Response } from "express";
import { connection } from "./config/db";
import authRoute from "./routes/auth";
import getUser from "./routes/getauth";
import { createUser } from "./tables/auth";




const app=express();
app.use(express.json());



//database connection...
connection;




//tables

//1-authtable
createUser();








//register auth routes
app.use("/api/auth",authRoute);
app.use("/api/auth",getUser);








app.get("/",(_req:Request , res:Response)=>{
  res.status(200).send("hii i am muna...");
})



app.listen(2000,()=>{
  console.log("backend connected...");
})