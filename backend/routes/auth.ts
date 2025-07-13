import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { connection } from "../config/db";

const router = express.Router();

const secKey = "wordpress@123"

// signup route
router.post("/signup", async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send("You must fill all required fields.");
        }

        const hashPass = await bcrypt.hash(password, 10);

        const query = `INSERT INTO userAuth (name, email, password) VALUES (?, ?, ?)`;

        connection.query(query, [name, email, hashPass], (err) => {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return res.status(409).send("Email already exists.");
                }
                return res.status(500).send("Database error.");
            }

            return res.status(201).send("User registration successful.");
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error during signup.");
    }
});


//login
router.post("/login", async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Please fill all required inputs.");
        }

        const query = `SELECT * FROM userAuth WHERE email = ?`;

        connection.query(query, [email], (err, result: any) => {
            if (err) {
                return res.status(500).send("Database error.");
            }

            if (result.length === 0) {
                return res.status(401).send("User not found or invalid credentials.");
            }

            const user = result[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send("Error checking password.");
                }

                if (!isMatch) {
                    return res.status(401).send("Invalid credentials.");
                }

                // generate the token
                const token = JWT.sign(
                    {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    },
                    secKey,
                    { expiresIn: "1d" }
                );

                return res.status(200).send({
                    message: "login successfull",
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email, // ✅ fixed typo here
                    },
                });
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error during login.");
    }
});
export default router;
