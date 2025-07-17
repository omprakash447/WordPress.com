import express, { Request, Response } from "express";
import { connection } from "../config/db"; // uses mysql2

const router = express.Router();

router.get("/public-post", async (_req: Request, res: Response): Promise<any> => {
    try {
        const query = `
            SELECT name, email, title, details, imgurl
            FROM userAuth
            JOIN posttable ON userAuth.id = posttable.userid;
        `;

        // ✅ Use promise-based query
        const [result] = await connection.promise().query(query);

        return res.status(200).send({
            message: "public post fetched...",
            result,
        });
    } catch (err) {
        return res.status(500).send({
            message: "Error fetching posts",
            error: err,
        });
    }
});

export default router;
