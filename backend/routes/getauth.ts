import express, { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { connection } from "../config/db";

const router = express.Router();
const secKey = "wordpress@123";

router.get("/user-login", async (req: Request, res: Response): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).send("Unauthorized access...");
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = JWT.verify(token, secKey);

    const [result]= await connection.promise().query(
      `SELECT * FROM userAuth WHERE email = ?`,
      [decoded.email]
    );

    return res.status(200).send({
      message: "User fetched...",
      result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error.");
  }
});

export default router;
