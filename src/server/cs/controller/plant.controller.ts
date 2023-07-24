import { Request, Response, NextFunction } from "express";
import { get, omit } from "lodash";
import log from "../../../utils/logger";
import statusCode from "../../modules/statusCode";
import message from "../../modules/responseMessage";
import { responseError } from "../../modules/serverError";
import { get } from "lodash";
import {
	registerPlantService,
	getPlantInfoService,
	editPlantInfoService,
	deletePlantInfoService,
	getPlantListService,
	registerBookmarkService,
	getBookmarkService,
	deleteBookmarkService,
	createPlantDiaryService,
	getPlantDiaryService,
	editPlantDiaryService,
	deletePlantDiaryService,
	createPlantTodoService,
	getPlantTodoService,
	editPlantTodoService
	deletePlantTodoService,

} from "../service/plant.service";


export async function registerPlantController(req: Request, res: Response, next: NextFunction) {
	try {
		const plantInfo = get(req.body, "plantInfo");
		const registerPlant = await registerPlantService(plantInfo);
		return res.send(registerPlant);
	} catch (e) {
		log.error(`registerPlantController: ${e}`);
		return res.status(500).json({ result: "500" });
	}
}

export async function getPlantInfoController(req: Request, res: Response, next: NextFunction) {
    try {
        const plantId = get(req.params, "plantUuid";)
        const plantInfo = await getPlantInfoService({ plantId : plantId});
        return res.send(plantInfo);
    } catch (e) {
        log.error(`getPlantInfoController: ${e}`);
        return res.status(500).json({result: "500"});
    }
}

export async function getPlantListController(req: Request, res: Response, next: NextFunction) {
    try {
        const plantId = get(req.params, "plantUuid");
        let page = parseInt(get(req.query, "page") as string);
        let limit = parseInt(get(req.query, "limit") as string);
		let filter = get(req.query, "filter") as string;				// 식물별 필터링
        let search = req.query.search as string;     // 검색 - 임시로 구현해놓음
    
        if (page < 1) page = 1;
        page -= 1;

        const plantList = await getPlantListService(page * limit, limit, filter);
        return res.send(plantList);
    } catch (e) {
        log.error(`getPlantListController: ${e}`);
        return res.status(500).json({result: "500"});
    }
}

export async function editPlantInfoController(req: Request, res: Response, next: NextFunction) {
    try { 
        const plantInfo = req.body;
        const plantId = get(req.params, "plantUuid");
		const registerPlant = await editPlantInfoService(
			plantId,
			plantInfo
		);
		return res.send(await getPlantInfoService({ plantId : plantId}));
    } catch (e) {
        log.error(`editPlantInfoController: ${e}`);
		return res.status(500).json({ result: "500" });
    }
}

export async function deletePlantInfoController(req: Request, res: Response, next: NextFunction) {
    try { 
        const plantId = get(req.params, "plantUuid")
		const deletePlantInfo = await deletePlantInfoService({
			plantId: decodeURIComponent(plantId),
		});
		return res.send(deletePlantInfo);
    } catch (e) {
        log.error(`deletePlantInfoController: ${e}`);
		return res.status(500).json({ result: "500" });
    }
}

export async function registerBookmarkController(req: Request, res: Response, next: NextFunction) {
    try {
        const plantUuid = get(req.params, "plantUuid");
        const registerBookmark = await registerBookmarkService(plantUuid);
        if (registerBookmark) {
			return res.status(statusCode.OK).json({
				result: {
					registerBookmark: registerBookmark,
				},
				message: message.SUCCESS,
			})

		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			})
		}
    } catch (e) {
        // log.error(`registerBookmarkController: ${e}`);
        // return res.status(500).json({ result : "500 "});

		console.log(e);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
    }
}

export async function getBookmarkController(req: Request, res: Response, next: NextFunction) {
    try {
		const getPlantDiary = await getPlantDiaryService(plantUuid);
		if (getPlantDiary) {
			return res.status(statusCode.OK).json({
				result: {
					getPlantDiary: getPlantDiary,
				},
				message: message.SUCCESS,
			});
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			});
		}
    } catch (e) {
		console.log(e);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
    }
}

export async function deleteBookmarkController(req: Request, res: Response, next: NextFunction) {
	try {
		const deleteBookmark = await deleteBookmarkService();
		if(deleteBookmark) {
			return res.status(statusCode.OK).json({
				result: {
					deleteBookmark: deleteBookmark,
				},
				message: message.SUCCESS,
			})
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
	}
}

export async function createPlantDiaryController(req: Request, res: Response, next: NextFunction) {
	try {
		let content = get(req.body, "content");
		const createPlantDiary = await createPlantDiaryService(content);
		if(createPlantDiary) {
			return res.status(statusCode.OK).json({
				result: {
					createPlantDiary: createPlantDiary,
				},
				message: message.SUCCESS,
			})
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
	}
}

export async function getPlantDiaryController(req: Request, res: Response, next: NextFunction) {
	try {
		const plantUuid = get(req.params, "plantUuid");
		const diaryUuid = get(req.params, "diaryUuid");
		const getPlantDiary = await getPlantDiaryService(plantUuid, diaryUuid);

		if (getPlantDiary) {
			return res.status(statusCode.OK).json({
				result: {
					getPlantDiary: getPlantDiary,
				},
				message: message.SUCCESS,
			})
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
	}
}

export async function editPlantDiaryController(req: Request, res: Response, next: NextFunction) {
	try {
		const plantUuid = get(req.params, "plantUuid");
		const diaryUuid = get(req.params, "diaryUuid");
		const editPlantDiary = await editPlantDiaryService(plantUuid, diaryUuid);

		if (editPlantDiary) {
			return res.status(statusCode.SUCCESS).json({
				result: {
					editPlantDiary: editPlantDiary,
				},
				message: message.SUCCESS,
			})
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
	}
}

export async function deletePlantDiaryController(req: Request, res: Response, next: NextFunction){
	try {
		const plantUuid = get(req.params, "plantUuid");
		const diaryUuid = get(req.params, "diaryUuid");
		const deletePlantDiary = await deletePlantDiaryService(plantUuid, diaryUuid);

		if (deletePlantDiary) {
			return res.status(statusCode.SUCCESS).json({
				result: {
					deletePlantDiary: deletePlantDiary,
				},
				message: message.SUCCESS,
			}) 
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				}, 
				message: message.BAD_REQUEST,
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
	}
}

export async function createPlantTodoController(req: Request,, res: Response, next: NextFunction) {
	try {
		let content = get(req.body, "content")
		const createPlantTodo = await createPlantTodoService(content);

		if (createPlantTodo) {
			return res.status(statusCode.SUCCESS).json({
				result: {
					createPlantTodo: createPlantTodo,
				},
				message: message.SUCCESS,
			})
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			})
		}
	} catch (e) {
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
	}
}

export async function getPlantTodoController(req: Request, res: Response, next: NextFunction) {
	try {
		const plantUuid = get(req.params, "plantUuid");
		const todoUuid = get(req.params, "todoUuid");
		const getPlantTodo = await getPlantTodoService(plantUuid, todoUuid);

		if (getPlantTodo) {
			return res.status(statusCode.SUCCESS).json({
				result: {
					getPlantTodo: getPlantTodo,
				},
				message: message.SUCCESS,
			})
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			})
		}
	} catch (e) {
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
	}
}

export async function editPlantTodoController(req: Request, res: Response, next: NextFunction) {
	try {
		const plantUuid = get(req.params, "plantUuid");
		const todoUuid = get(req.params, "todoUuid");
		const editPlantTodo = await editPlantTodoService(plantUuid, todoUuid);

		if (editPlantTodo) {
			return res.status(statusCode.SUCCESS).json({
				result: {
					editPlantTodo: editPlantTodo,
				},
				message: message.SUCCESS,
			})
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
	}
}

export async function deletePlantTodoController(req: Request, res: Response, next: NextFunction) {
	try {
		const plantUuid = get(req.params, "plantUuid");
		const todoUuid = get(req.params, "todoUuid");
		const deletePlantTodo = await deletePlantTodoService(plantUuid, todoUuid);

		if (deletePlantTodo) {
			return res.status(statusCode.SUCCESS).json({
				result: {
					deletePlantTodo: deletePlantTodo,
				},
				message: message.SUCCESS,
			})
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				result: {
					statusCode: statusCode.BAD_REQUEST,
				},
				message: message.BAD_REQUEST,
			})
		}
	} catch (e) {
		console.log(e);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json(responseError);
	}
}