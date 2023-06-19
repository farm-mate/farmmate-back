// import express from "express";
// import helmet from "helmet";
// import dayjs from "dayjs";
// // import clientIP from "request-ip";
// import log from "./utils/logger";
// import { Server } from "socket.io";

// import routes from "./server/router";
// import { mongodbConnect } from "./connector/mongo.connector";
// import * as dotenv from "dotenv";
// // import { deserializer } from "./server/middleware";
// import { createServer } from "http";
// // import ioRouter from "./socket/router";

// import cors from "cors";
// // import morgan from "./server/middleware/morgan";
// import cookieParser from "cookie-parser";
// // import { deviceSettingScheduler } from "./utils/deviceSettingScheduler";
// dotenv.config();

// const serverPort = process.env.SERVER_PORT ? process.env.SERVER_PORT : 1000;
// const socketPort = process.env.SOCKET_PORT ? process.env.SOCKET_PORT : 2000;
// const app = express();

// app.use(
// 	cors({
// 		origin: [
// 			"http://localhost:1000",
// 		],
// 		credentials: true,
// 		exposedHeaders: ["Authorization", "X-Access-Token", "Origin"],
// 	})
// );
// app.use(helmet());
// // app.use(morgan);


// app.use(cookieParser(process.env.PRIVATEKEY));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // app.use(clientIP.mw());
// // app.use(deserializer);
// app.listen(serverPort, () => {
// 	routes(app);
// 	log.info(`Server listing at http://localhost:${serverPort}`);
// 	mongodbConnect(process.env.MONGO_OPTION);
// 	// deviceSettingScheduler();
// });


// const httpServer = createServer();
// export const io = new Server(httpServer, {
// 	// options
// 	cors: {
// 		origin: [
// 			"http://localhost:1000",
// 		],
// 		credentials: true,
// 	},
	
// });

// io.use((socket, next) =>
// 	cookieParser(socket.request as unknown as string[], {})
// );
// io.on("connection", (socket) => {
// 	socket.emit("hello");
// });

// // ioRouter();
// httpServer.listen(socketPort);

import express from "express";
// import helmet from "helmet";
import dayjs from "dayjs";
import log from "./utils/logger";
import { Server } from "socket.io";
import { createServer } from "http";

import routes from "./server/router";
import { mongodbConnect } from "./connector/mongo.connector";
import * as dotenv from "dotenv";
// import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const serverPort = process.env.SERVER_PORT ? process.env.SERVER_PORT : 1000;
const socketPort = process.env.SOCKET_PORT ? process.env.SOCKET_PORT : 2000;
const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:1000",
//     credentials: true,
//     exposedHeaders: ["Authorization", "X-Access-Token", "Origin"],
//   })
// );
// app.use(helmet());
app.use(cookieParser(process.env.PRIVATEKEY));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:1000",
//     credentials: true,
//   },
});

routes(app); // 라우터 함수를 등록합니다.

httpServer.listen(serverPort, () => {
  log.info(`Server listening at http://localhost:${serverPort}`);
  mongodbConnect(process.env.MONGO_OPTION);
});

io.on("connection", (socket) => {
  socket.emit("hello");
});
