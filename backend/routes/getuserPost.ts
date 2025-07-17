import express, { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { connection } from "../config/db";

const router = express.Router();
const secKey = "wordpress@123";

router.get("/get-user-post", async (req: Request, res: Response): Promise<any> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send("Unauthorized access...");
        }

        const token = authHeader.split(" ")[1]; // ✅ Correct index

        if (!token) {
            return res.status(400).send("Token not provided...");
        }

        const decoded: any = JWT.verify(token, secKey);
        const email = decoded.email;

        const query = `
        select name , email , title , details , imgurl , postTime , postDate
        from userAuth
        join posttable
        on
        userAuth.id=posttable.userid
        where email= ?;
        `;
        connection.query(query, [email], (err, result) => {
            if (err) {
                return res.status(500).send("Database error: " + err);
            }

            return res.status(200).send({
                message: "Posts fetched successfully",
                result,
            });
        });

    } catch (err) {
        return res.status(401).send("Invalid token or unauthorized access.");
    }
});

export default router;
