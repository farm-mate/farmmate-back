import { Request, Response } from "express";
import { logState, trueLogState } from "../../../model/plantDiary.model";

import log from "../../../utils/logger";
import { getPlantInfoService } from "../service/plant.service";
import {
	// alertDeviceLogService,
	// chkDeviceLogService,
	// createDeviceLogService,
	// deleteDeviceLogService,
	// getAllDeviceLogChartService,
	// getAllDeviceLogListService,
	// getDeviceCountService,
	// getDeviceLogListService,
	// getViewDeviceLogService,
} from "../service/deviceLog.service";

export async function createPlantDiaryController(req: Request, res: Response) {
    try {
        const plantInfo = req.body;

		const findPlant = await getPlantInfoService({
			plantId: plantInfo.plantId,
		});

		if (findPlant) {
			const registerPlantDiary = await createPlantDiaryService(plantInfo);
			return res.send(registerPlant);
		} else {
			return res.status(400).json({ result: "400" });
		}
    } catch (e) {
        log.error(`createDeviceLogController: ${e}`);
		return res.status(500).json({ result: "500" });
    }
}