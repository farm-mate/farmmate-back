import { Request, Response } from "express";
// import { logState, trueLogState } from "../../../model/plantDiary.model";

// import log from "../../../utils/logger";
import { getPlantInfoService } from "../service/plant.service";
import {
    createPlantDiaryService,
    getPlantDiaryService,
    getPlantDiaryByDateService,
    editPlantDiaryService,
    deletePlantDiaryService,
    // getPlantDiaryListService,
    // getAllPlantDiaryListService,
} from "../service/plantDiary.service";

export async function createPlantDiaryController(req: Request, res: Response) {
    try {
        const plantInfo = req.body;

		const findPlant = await getPlantInfoService({
			plantId: plantInfo.plantId,
		});

		if (findPlant) {
			const registerPlantDiary = await createPlantDiaryService(plantInfo);
			return res.send(registerPlantDiary);
		} else {
			return res.status(400).json({ result: "400" });
		}
    } catch (e) {
        // log.error(`createDeviceLogController: ${e}`);
		return res.status(500).json({ result: "500" });
    }
}

export async function getPlantDiaryInfoController(req: Request, res: Response) {
    try {
        const plantDiaryId = req.headers.plantDiaryId;
        const plantDiaryInfo = await getPlantDiaryService({plantDiaryId : plantDiaryId});
        return res.send(plantDiaryInfo);
    } catch(e) {
        // log.error(`getPlantDiaryInfoController: ${e}`);
        return res.status(500).json({result: "500"});
    }
}

// export async function editPlantDiaryInfoController(req: Request, res: Response) {
//     try{
//         const plantDiaryId = req.headers.plantDiaryId;
//         const plantDiaryInfo = await getPlantDiaryInfoService({plantDiaryId : plantDiaryId});
//         const createPlantDiary = await editPlantDiaryInfoService(
//             plantDiaryInfo.plantDiaryId,
//             plantDiaryInfo
//         )
//         return res.send(createPlantDiary);
//         return res.send(createPlantDiary);
//     } catch (e) {
//         // log.error(`editPlantDiaryInfoController: ${e}`);
// 		return res.status(500).json({ result: "500" });
//     }
// }

export async function deletePlantDiaryInfoController(req: Request, res: Response) {
    try{
         const plantDiaryId = req.headers.plantDiaryId as string;
         const deletePlantDiaryInfo = await deletePlantDiaryService({
			plantDiaryId: decodeURIComponent(plantDiaryId),
         });
         return res.send(deletePlantDiaryInfo);
    } catch(e) {
        // log.error(`deletePlantDiaryInfoController: ${e}`);
		return res.status(500).json({ result: "500" });
    }
}

// export async function getPlantDiaryListController(req: Request, res: Response) {
//     try {
// 		const plantId = req.headers.plantId as string;
// 		let page = parseInt(req.headers.page as string);
// 		const limit = parseInt(req.headers.limit as string);

// 		if (page < 1) page = 1;

// 		page -= 1;

// 		const plantList = await getPlantDiaryListService(
// 			{ plantId: plantId },
// 			page * limit,
// 			limit
// 		);
// 		return res.send({ data: plantList });
// 	} catch (e) {
// 		// log.error(`getPlantDiaryListController: ${e}`);
// 		return res.status(500).json({ result: "500" });
// 	}
// }

// export async function getPlantDiaryListController(req: Request, res: Response) {
//     try {
//       const plantId = req.headers.plantId as string;
//       let page = parseInt(req.headers.page as string);
//       const limit = parseInt(req.headers.limit as string);
  
//       if (page < 1) page = 1;
  
//       page -= 1;
  
//       const plantList = await getPlantDiaryListService(
//         { plantId: plantId },
//         page * limit,
//         limit
//       );
//       return res.send({ data: plantList });
//     } catch (e) {
//       // log.error(`getPlantDiaryListController: ${e}`);
//       return res.status(500).json({ result: "500" });
//     }
//   }
  


// export async function getAllPlantDiaryListController(req: Request, res: Response) {
// 	try {
// 		const plantId = req.headers.plantId as string;

// 		const plantList = await getAllPlantDiaryListService(
// 		);
// 		return res.send({ data: plantList });
// 	} catch (e) {
// 		// log.error(`getAllPlantDiaryListController: ${e}`);
// 		return res.status(500).json({ result: "500" });
// 	}
// }
 