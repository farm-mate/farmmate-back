import config from "config";
import mongoose from "mongoose";
import mariaDB from "mariadb";
import * as dotenv from "dotenv";
import log from "../utils/logger";
dotenv.config();

export async function mongodbConnect(option?: string): Promise<void> {
	const noSqldbUri = process.env.MONGO_URI as string;
	try {
		const conn = await mongoose.connect(`${noSqldbUri}${option}`, {
			maxPoolSize: 20,
		});
		
		// const conn = await mongoose.connect(noSqldbUri, {
		// 	ssl: false,
		// 	sslValidate: false,
		// 	// sslCA: path.resolve(config.get("certs")),
		// 	maxPoolSize: 10000,
		// });
            
		log.info(`mongoDB Connected`);
	} catch (error) {
		log.error(`[*] disconnect ${noSqldbUri}${option}`);
		log.error(`env: ${process.env.NODE_ENV}: mongoDB Error, ${error}`);
	}
}
