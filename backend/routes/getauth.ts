import express, { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { connection } from "../config/db";

const router = express.Router();

const secKey = "wordpress@123";

router.get("/auth-data", async (req: Request, res: Response): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized access...");
    }

    const token = authHeader.split(" ")[1];

    const decode: any = JWT.verify(token, secKey);

    const query = `SELECT * FROM userAuth WHERE email = ?`;

    connection.query(query, [decode.email], (err, result:any) => {
      if (err) {
        return res.status(500).send(err);
      }

      const rows = result.rows;

      if (rows.length === 0) {
        return res.status(404).send("User not found.");
      }

      return res.status(200).send({
        message: "Data retrieved successfully.",
        user: rows[0],
      });
    });
  } catch (err) {
    return res.status(401).send("Invalid token.");
  }
});

export default router;
