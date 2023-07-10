import { Request, RequestHandler, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { User } from "../Models/UserModel";

interface UserCredentials {
    name: string;
    age: number;
    email: string;
    password: string;
    repeatPassword: string;
}

export const Register = async (req: Request, res: Response) => {
    try {
        const { email, password, repeatPassword, age, name } = <UserCredentials>req.body;

        if (!email || !password || !repeatPassword || !name) {
            throw new Error("All fields are required");
        }

        if (password !== repeatPassword) {
            throw new Error("Passwords do not match");
        }

        const hashPw = await bcrypt.hash(password, 10);

        const user = new User();
        user.id = uuidv4();
        user.name = name;
        user.age = age;
        user.email = email.toLowerCase();
        user.password = hashPw;
        console.log(user);
        await user.save();

        res.json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
};

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = <UserCredentials>req.body;

        if (!email || !password) {
            throw new Error("All fields are required");
        }

        const user = await User.findOneBy({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const JWT = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("jwt", JWT, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60),
            secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        });

        res.json({ message: "Logged in successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const Logout: RequestHandler = async (req, res) => {
    res.status(400).json({
        status: "success",
        mmessage: "API not implemented yet",
    });
};

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        const allUsers = await User.find({
            order: { age: "ASC" },
            relations: {
                posts: true,
            },
        });

        res.status(200).json({
            status: "success",
            users: allUsers,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
