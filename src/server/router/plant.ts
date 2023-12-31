import { Express, Request, Response, NextFunction } from "express";
import {
	deletePlantInfoController,
	editPlantInfoController,
	getPlantInfoController,
	getPlantListController,
	registerPlantController,
} from "../cs/controller/plant.controller";

require("dotenv").config();
const apiUrl = process.env.API_URL;

export default async function (app: Express) {
    app.post(
        `${apiUrl}plant`, 
        registerPlantController
    );  // 식물 등록
    app.get(
		`${apiUrl}plant/:deviceId/:plantId`,
		getPlantInfoController
	); // 한개의 식물 정보
    app.put(
		`${apiUrl}plant/:deviceId/:plantId`,
		editPlantInfoController
	); // 수정
	app.delete(
		`${apiUrl}plant/:deviceUuid/:plantId`,
		deletePlantInfoController
	); // 삭제
    app.get(
		`${apiUrl}plant/:deviceId`,
		getPlantListController
	); // 전체 리스트 가져오기

}