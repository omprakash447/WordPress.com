import express, { Request, Response } from "express";
import { connection } from "../config/db";

const router = express.Router();

router.post("/user-post", async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, details, imgurl, userid } = req.body;

        if (!title || !details || !imgurl || !userid) {
            return res.status(400).send("Missing required fields.");
        }

        const query = `
      INSERT INTO postTable (title, details, imgurl, userid)
      VALUES (?, ?, ?, ?)
    `;

        connection.query(query, [title, details, imgurl, userid], (err, result) => {
            if (err) {
                console.error("Error inserting post:", err);
                return res.status(500).send("Database error while inserting post.");
            } else {
                return res.status(201).send({
                    message: "Post created successfully.",
                    postId: result,
                });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error.");
    }
});

export default router;
