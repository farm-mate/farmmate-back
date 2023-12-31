import { Request, Response } from "express";
import { get, omit } from "lodash";
import log from "../../../utils/logger";
import {
	deletePlantInfoService,
	editPlantInfoService,
	getPlantInfoService,
	getPlantListService,
	registerPlantService,
} from "../service/plant.service";


export async function registerPlantController(req: Request, res: Response) {
	try {
		const plantInfo = req.body;
		const registerPlant = await registerPlantService(plantInfo);
		return res.send(registerPlant);
	} catch (e) {
		log.error(`registerPlantController: ${e}`);
		return res.status(500).json({ result: "500" });
	}
}

export async function getPlantInfoController(req: Request, res: Response) {
    try {
		const deviceId = req.params.deviceId;
        const plantId = req.params.plantId;
		let query = {deviceId, _id : plantId};
        const plantInfo = await getPlantInfoService(query);
        return res.send(plantInfo);
    } catch (e) {
        log.error(`getPlantInfoController: ${e}`);
        return res.status(500).json({result: "500"});
    }
}

export async function getPlantListController(req: Request, res: Response) {
    try {
		const deviceId = req.params.deviceId;
        let page = parseInt(req.headers.page as string);
        let limit = parseInt(req.headers.limit as string);
        let search = req.query.search as string;     // 검색 - 임시로 구현해놓음
        let filter = req.query.filter as string;     // 식물별 필터링

        if (page < 1) page = 1;
        page -= 1;

        const plantList = await getPlantListService(
			deviceId,
			page * limit,
			limit,
			search,
			filter
		);
        return res.send(plantList);
    } catch (e) {
        log.error(`getPlantListController: ${e}`);
        return res.status(500).json({result: "500"});
    }
}

export async function editPlantInfoController(req: Request, res: Response) {
    try { 
		const deviceId = req.params.deviceId;
        const plantInfo = req.body;
        const plantId = req.params.plantId;
		const registerPlant = await editPlantInfoService(
			deviceId,
			plantId,
			plantInfo
		);
		return res.send(registerPlant);
    } catch (e) {
        log.error(`editPlantInfoController: ${e}`);
		return res.status(500).json({ result: "500" });
    }
}

export async function deletePlantInfoController(req: Request, res: Response) {
    try { 
		const deviceId = req.params.deviceId;
        const plantId = req.params.plantId;
		const deletePlantInfo = await deletePlantInfoService({
			plantId: decodeURIComponent(plantId),
		});
		return res.send(deletePlantInfo);
    } catch (e) {
        log.error(`deletePlantInfoController: ${e}`);
		return res.status(500).json({ result: "500" });
    }
}
