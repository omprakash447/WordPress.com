import express, { Request, Response } from "express";
// import connection from "./config/db.js";
import cors from "cors";
import sql from "mysql2";


const connection=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"mysqlpass",
    database:"test",
});


connection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("db connected...");
    }
})





const app = express();
app.use(express.json());
app.use(cors());


// create table
const mystore = async () => {
    try {
        const sql = `
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Pname VARCHAR(200) NOT NULL,
        price DECIMAL(5,3) NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await connection.promise().query(sql);
        console.log("✅ items schema is created...");
    } catch (err) {
        console.error("❌ Table not created:", err);
    }
};

mystore();




app.post("/insert", async (req: Request, res: Response): Promise<any> => {
  try {
    const { Pname, price } = req.body;

    const [] = await connection.promise().query(
      `INSERT INTO items (Pname, price) VALUES (?, ?)`,
      [Pname, price]
    );

    return res.status(201).json({
      message: "item inserted...",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});







app.get("/", (_req: Request, res: Response) => {
    if (!connection) {
        res.status(500).send("Database connection not established");
    }
    res.status(200).send("hiii i am omm");
});

app.listen(2000, () => {
    console.log("✅ Server backend connected...");
});
