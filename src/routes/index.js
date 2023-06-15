import { Express, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config();

export const apiLimiter = rateLimit({
    windowMs: 1000, //
    max: 1,
    message: tooManyRequest,
    standardHeaders: true,
    legacyHeaders: false,
});

export default async function (app: Express) {
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            result: "OK",
            message: message.HEALTH_CHECK,
            handler: "ping",
            statusCode: 200,
        });
    });
    app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            result: "OK",
            message: message.HEALTH_CHECK,
            handler: "ping",
            statusCode: 200,
        });
    });
}
