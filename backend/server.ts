import cors from "cors";
import express, { Request, Response } from "express";
import { connection } from "./config/db";
import authRoute from "./routes/auth";
import getUser from "./routes/getauth";
import postTbale from "./routes/userpost";
import { createUser } from "./tables/auth";
import { createPostTable } from "./tables/userposttable";




const app = express();
app.use(express.json());
app.use(cors());



//database connection...
connection;




//tables

createUser();
createPostTable();







//register auth routes
app.use("/api/auth", authRoute);
app.use("/api/auth", getUser);
app.use("api/table/postTable",postTbale);
// app.use("/api/auth",getUser);








app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("hii i am muna...");
})



app.listen(2000, () => {
  console.log("backend connected...");
})