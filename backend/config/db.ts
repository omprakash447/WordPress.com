import mysql from "mysql2";



export const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mysqlpass",
    database:"test",
});



connection.connect((err)=>{
    if(err){
        console.log("there is an error during the connection...");
    }else{
        console.log("database connected...");
    }
});

