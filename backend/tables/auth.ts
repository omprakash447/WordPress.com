import { connection } from "../config/db";


export const createUser = () => {
    const myquery = `
    CREATE TABLE IF NOT EXISTS userAuth(
   id int auto_increment primary key,
   name varchar(200) not null,
   email varchar(200) not null unique,
   password varchar(200) not null unique
 );
    `


    connection.query(myquery, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("user auth table created...");
        }
    })
}