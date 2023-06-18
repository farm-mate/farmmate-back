import { Express, Request, Response, NextFunction } from "express";

require("dotenv").config();
const apiUrl = process.env.API_URL;

export default async function (app: Express) {
    app.post(
        `${apiUrl}plant/create`, 
        
    );  // 식물 등록
    app.get(
		`${apiUrl}plant`,

	); // 한개의 식물 정보
    app.put(
		`${apiUrl}plant`,

	); // 수정
	app.delete(
		`${apiUrl}plant`,

	); // 삭제
    app.get(
		`${apiUrl}plant/list`,

	); // 디바이스 목록

}