import { Express, Request, Response, NextFunction } from "express";
import {
	registerPlantController,
	getPlantInfoController,
	editPlantInfoController,
	deletePlantInfoController,
	// getPlantListController,
	// registerBookmarkController,
	// getBookmarkController,
	// deleteBookmarkController,
	createPlantDiaryController,
	getPlantDiaryController,
	getPlantDiaryByDateController,
	editPlantDiaryController,
	deletePlantDiaryController,
	// createPlantTodoController,
	// getPlantTodoController,
	// editPlantTodoController,
	// deletePlantTodoController,
} from "../cs/controller/plant.controller";

require("dotenv").config();
const apiUrl = process.env.API_URL;

export default async function (app: Express) {
	// // 식물 등록
    // app.post(`${apiUrl}:deviceUuid/plant`, registerPlantController);  							// 식물 등록
    // app.get(`${apiUrl}:deviceUuid/plant/:plantUuid`, getPlantInfoController); 					// 한개의 식물 정보
    // app.put(`${apiUrl}:deviceUuid/plant/:plantUuid`, editPlantInfoController); 					// 식물 정보 수정
	// app.delete(`${apiUrl}:deviceUuid/plant/:plantUuid`, deletePlantInfoController); 			// 식물 삭제
    // app.get(`${apiUrl}:deviceUuid/plant/list`,getPlantListController ); 						// 전체 리스트 가져오기

	// // 북마크
	// app.post(`${apiUrl}:deviceUuid/plant/:plantUuid/bookmark`, registerBookmarkController);		// 북마크 등록
	// app.get(`${apiUrl}:deviceUuid/plant/bookmark/`, getBookmarkController);						// 북마크된 식물 목록 가져오기
	// app.delete(`${apiUrl}:deviceUuid/plant/bookmark`, deleteBookmarkController);				// 북마크 해제

	// // 일지
	// app.post(`${apiUrl}:deviceUuid/plant/diary`, createPlantDiaryController);
	// app.get(`${apiUrl}:deviceUuid/plant/diary/:diaryUuid`, getPlantDiaryController);
	// app.put(`${apiUrl}:deviceUuid/plant/diary/:diaryUuid`, editPlantDiaryController);
	// app.delete(`${apiUrl}:deviceUuid/plant/diary/:diaryUuid`, deletePlantDiaryController);

	// // todo
	// app.post(`${apiUrl}:deviceUuid/plant/todo`, createPlantTodoController);
	// app.get(`${apiUrl}:deviceUuid/plant/todo/:todoUuid`, getPlantTodoController);
	// app.put(`${apiUrl}:deviceUuid/plant/todo/:todoUuid`, editPlantTodoController);
	// app.delete(`${apiUrl}:deviceUuid/plant/todo/:todoUuid`, deletePlantTodoController);


	// 식물 정보
	app.post(`${apiUrl}plant`, registerPlantController);  					// 식물 등록
	app.get(`${apiUrl}plant/:plantUuid`, getPlantInfoController); 			// 식물 정보 조회 (개별)
	app.put(`${apiUrl}plant/:plantUuid`, editPlantInfoController); 			// 식물 정보 수정
	app.delete(`${apiUrl}plant/:plantUuid`, deletePlantInfoController); 	// 식물 삭제
	// app.get(`${apiUrl}:deviceUuid/plant/list`,getPlantListController ); 				// 전체 리스트 조회

	// 북마크
	// app.post(`${apiUrl}plant/:plantUuid/bookmark`, registerBookmarkController);			// 북마크 등록
	// app.get(`${apiUrl}plant/bookmark/`, getBookmarkController);							// 북마크된 식물 목록 조회
	// app.delete(`${apiUrl}plant/bookmark`, deleteBookmarkController);					// 북마크 해제

	// 일지
	app.post(`${apiUrl}plant/diary`, createPlantDiaryController);						// 식물 일지 등록
	app.get(`${apiUrl}plant/diary/date`, getPlantDiaryByDateController);
	app.get(`${apiUrl}plant/diary/:diaryUuid`, getPlantDiaryController);				// 식물 일지 조회 (개별)
	app.put(`${apiUrl}plant/diary/:diaryUuid`, editPlantDiaryController);				// 식물 일지 수정
	app.delete(`${apiUrl}plant/diary/:diaryUuid`, deletePlantDiaryController);			// 식물 일지 삭제

	// todo
	// app.post(`${apiUrl}plant/todo`, createPlantTodoController);							// 식물 할일 등록
	// app.get(`${apiUrl}plant/todo/:todoUuid`, getPlantTodoController);					// 식물 할일 조회 
	// app.put(`${apiUrl}plant/todo/:todoUuid`, editPlantTodoController);					// 식물 할일 수정
	// app.delete(`${apiUrl}plant/todo/:todoUuid`, deletePlantTodoController);				// 식물 할일 삭제
}