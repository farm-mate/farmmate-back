import { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import dayjs from "dayjs";
import bigIntSupport from "dayjs/plugin/bigIntSupport";
import { generateRandomString } from "./generateRandomString";
import AWS from "aws-sdk";
import * as dotenv from "dotenv";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
dayjs.extend(bigIntSupport);
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage: AWS.S3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
});

export const fileStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
        const unixTime = dayjs().unix();
        const generatedRandStr = generateRandomString(12);
        const dir = `./uploads/${unixTime}${generatedRandStr}`;
        !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
        callback(null, dir);
    },

    filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
        callback(null, `${Buffer.from(file.originalname, 'latin1').toString('utf8')}`);
    },

});

export const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

// app.post("/upload", getFiles.single("file"), (req: Request, res: Response => {
//     if (!req.file) {
//         return res.status(400).send({
//             message: "No file uploaded",
//         });

//     // const uniqueFilename = `${req.file.filename}-${req.file.originalname}`;
//     const uniqueFilename = uuidv4();

//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `${uniqueFilename}.jpg`,
//         // Body: fs.readFileSync(req.file.path),
//         Body: req.file.buffer,
//         // ACL: "public-read",
//         // ContentType: req.file.mimetype,
//         ContentType: "image/jpeg",

//     };

//     storage.upload(params, (err, data) => {
//         if (err) {
//             console.error("S3 업로드 오류:", err);
//             return res
//               .status(500)
//               .json({ error: "이미지 업로드 중 오류가 발생했습니다." });
//           }
//          // S3에 성공적으로 업로드된 이미지 URL 반환
//         const imageUrl = data.Location;
//         return res.status(200).json({ imageUrl: imageUrl });
//     });
// }

// }));


export const imageConfig = multer.memoryStorage();
export function imageFilter(req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback) {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/bmp" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/svg+xml" ||
        file.mimetype === "image/tiff" ||
        file.mimetype === "image/webp" ||
        file.mimetype === "image/avif" ||
        file.mimetype === "image/vnd.microsoft.icon" ||
        file.mimetype === "image/jpg"
    ) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

export const getFiles = multer({ storage: fileStorage, fileFilter: fileFilter });
export const getImages = multer({ storage: imageConfig, limits: { fieldNameSize: 255, fieldSize: 1048576, fileSize: 1048576 }, fileFilter: imageFilter })
// export const getModel = multer({ storage: modelConfig, limits: { fieldSize: 1073741824, fileSize: 1073741824 }, fileFilter: modelFilter })




// export const modelConfig = multer.memoryStorage();
// export function modelFilter(req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback) {
//     if (
//         file.mimetype === "application/json"
//     ) {
//         callback(null, true);
//     } else {
//         callback(null, false);
//     }
// }





// export const getFiles = multer({ storage: fileStorage, fileFilter: fileFilter });
// export const getImages = multer({ storage: imageConfig, limits: { fieldNameSize: 255, fieldSize: 1048576, fileSize: 1048576 }, fileFilter: imageFilter })
// export const getModel = multer({ storage: modelConfig, limits: { fieldSize: 1073741824, fileSize: 1073741824 }, fileFilter: modelFilter })