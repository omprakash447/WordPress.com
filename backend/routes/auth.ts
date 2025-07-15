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
            return res.status(400).json({
                success: false,
                message: "You must fill all required fields."
            });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const query = `INSERT INTO userAuth (name, email, password) VALUES (?, ?, ?)`;

        connection.query(query, [name, email, hashPass], (err) => {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        success: false,
                        message: "Email already exists."
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }

            return res.status(201).json({
                success: true,
                message: "User registration successful."
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error during signup."
        });
    }
});



//login

router.post("/login", async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required inputs.",
            });
        }

        const query = `SELECT * FROM userAuth WHERE email = ?`;

        connection.query(query, [email], (err, result: any) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Database error.",
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "User not found or invalid credentials.",
                });
            }

            const user = result[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        success: false,
                        message: "Error checking password.",
                    });
                }

                if (!isMatch) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid credentials.",
                    });
                }

                const token = JWT.sign(
                    {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    },
                    secKey,
                    { expiresIn: "1d" }
                );

                return res.status(200).json({
                    success: true,
                    message: "Login successful.",
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                });
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error during login.",
        });
    }
});

export default router;