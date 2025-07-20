import express, { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { connection } from "../config/db";

const router = express.Router();

router.delete("/delete-post/:postId", async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded: any = JWT.verify(token, "wordpress@123");
    const { postId } = req.params;

    const query = "DELETE FROM postTable WHERE id = ? AND userid = ?";
    connection.query(query, [postId, decoded.id], (err, result: any) => {
      if (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ message: "Error deleting post" });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Post not found or not authorized" });
        return;
      }

      res.status(200).json({ message: "Post deleted successfully" });
    });
  } catch (err) {
    console.error("Invalid token:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;