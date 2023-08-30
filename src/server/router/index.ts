import { Express, Request, Response, NextFunction } from "express";
import plant from "./plant";
import plantDiary from "./plantDiary";
import device from "./device";

export default async function (app: Express) {

	app.all("/*", (req: Request, res: Response, next: NextFunction) => {
		return next();
	});
	app.get("/", (req: Request, res: Response, next: NextFunction) => {
		res.json({
			result: "OK",
			handler: "ping",
			statusCode: 200,
		})
	});
	app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
		res.json ({
			result: "OK",
			handler: "ping",
			statusCode: 200,
		})
	});
	plant(app);
	plantDiary(app);
	device(app);
}

