import { Express, Request, Response, NextFunction } from "express";
import {
	createPlantDiaryController,
    getPlantDiaryInfoController,
    // editPlantDiaryInfoController,
    deletePlantDiaryInfoController,
    // getPlantDiaryListController,
    // getAllPlantDiaryListController,
} from "../cs/controller/plantDiary.controller";

require("dotenv").config();
const apiUrl = process.env.API_URL;

export default async function (app: Express) {
    app.post(
        `${apiUrl}planDiary`, 
        createPlantDiaryController
    );  // 식물 다이어리 등록
    app.get(
		`${apiUrl}plantDiary`,
		getPlantDiaryInfoController
	); // 한개의 식물 정보
    // app.put(
	// 	`${apiUrl}plantDiary`,
	// 	editPlantDiaryInfoController
	// ); // 수정
	app.delete(
		`${apiUrl}plantDiary`,
		deletePlantDiaryInfoController
	); // 삭제
    // app.get(
	// 	`${apiUrl}plantDiary/list`,
	// 	getPlantDiaryListController
	// ); // 전체 리스트 가져오기

}