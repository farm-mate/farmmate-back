import Express from 'express';
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
// import multer, { Multer } from "multer";
// import { fileFilter, fileStorage } from "./modules/multer";
// import morganMiddleware, { logger } from "./modules/logger";
import morganBody from "morgan-body";
import cookieParser from "cookie-parser";

import * as https from 'https';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const app = Express();

// app.use(morganMiddleware);
app.use(helmet());
app.use(
    cors({
        origin: [ "http://localhost:3001"],
        credentials: true,
        exposedHeaders: ["Set-Cookie"],
    })
);
app.use(cookieParser(process.env.PRIVATEKEY));
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());


app.get('/', (req, res) => {
    res.send('Server Connected');
})

app.listen(process.env.SERVER_PORT, async () => {
    console.log(`
    ################################################
        Server listening on port
    ################################################
  `);
    // await mariadb
    //     .initialize()
    //     .then(() => {
    //         console.log("Data Source has been initialized!");
    //     })
    //     .catch((err) => {
    //         console.error("Error during Data Source initialization", err);
    //     });
    // routes(app);
}).on("error", (err) => {
    console.error(err);
    process.exit(1);
});
