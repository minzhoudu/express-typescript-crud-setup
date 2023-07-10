import { NextFunction, Request, RequestHandler, Response } from "express";
import * as JWT from "jsonwebtoken";

import { User } from "../Models/UserModel";

export const authentication: RequestHandler = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "You are not logged in",
        });
    }

    const decoded = <{ email: string }>JWT.verify(token, process.env.JWT_SECRET!);

    req.user = decoded;

    next();
};

export const authorization = (...roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const email = req.user.email;

        const user = await User.findOneBy({ email });
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "There's no user with this email",
            });
        }

        if (user.role !== "owner" && !roles.includes(user.role)) {
            return res.status(403).json({
                status: "fail",
                message: "You are not authorized to perform this action",
            });
        }

        next();
    };
};
