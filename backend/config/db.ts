import sql from "mysql2";



export const connection=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"mysqlpass",
    database:"wordpress"
});


connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    console.log("database connected...");
});