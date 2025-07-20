import cors from "cors";
import express, { Request, Response } from "express";
import { connection } from "./config/db";
import authRoute from "./routes/auth";
import deletepost from "./routes/deletepost";
import getUser from "./routes/getauth";
import publicPost from "./routes/getpublicpost";
import getuserpost from "./routes/getuserPost";
import postTbale from "./routes/userpost";
import { createUser } from "./tables/auth";
import { createPostTable } from "./tables/userposttable";


//declare middlewere
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
app.use("/api/table/posttable",postTbale);
app.use("/api/post",getuserpost);
app.use("/api/post",publicPost);
app.use("/api/delete",deletepost);




app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("hii i am muna...");
})
app.listen(2000, () => {
  console.log("backend connected...");
})