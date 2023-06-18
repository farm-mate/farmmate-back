import jwt from "jsonwebtoken";
import * as messages from "../../server/json/message.json";
import * as dotenv from "dotenv";
dotenv.config();
const privateKey = process.env.PRIVATEKEY as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
	return jwt.sign(object, privateKey, options);
}

export function decode(token: string, options?: jwt.SignOptions | undefined) {
	try {
		const decoded = jwt.verify(token, privateKey, options);

		return { valid: true, expired: false, decoded };
	} catch (error: any) {
		return {
			valid: false,
			expired: error.message === messages.jwt_expired,
			decoded: null,
		};
	}
}
