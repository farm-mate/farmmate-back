import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import tz from "dayjs/plugin/timezone";

import utc from "dayjs/plugin/utc";
import {
	DocumentDefinition,
	FilterQuery,
	LeanDocument,
	UpdateQuery,
} from "mongoose";
import PlantDiary, {
	plantDiaryDocument,
    plantDiaryProfile
} from "../../../model/plantDiary.model";
// import { avg, chunk } from "../../../utils/tools";
import { getPlantInfoService } from "./plant.service";

export async function createPlantDiaryService(
    data: DocumentDefinition<plantDiaryDocument>
) {
    return await PlantDiary.create(data);
}

export async function getPlantDiaryInfoService(
    query: FilterQuery<plantDiaryDocument>
) {
    return await PlantDiary.findOne(query).lean();
}

// export async function editPlantDiaryInfoService(
//     query: FilterQuery<plantDiaryDocument>,
//     data: plantDiaryProfile
// ) {
//     return await PlantDiary.updateOne(query, {$set : data}, {new : true});
// }  

export async function deletePlantDiaryInfoService(
    query: FilterQuery<plantDiaryDocument>
) {
    const id = query.plantDiaryId;
    const deletePlantDiary = await PlantDiary.deleteOne(query);

    return {
        plantDiaryId : id,
        deletePlantDiary : deletePlantDiary
    }
}

// 과일 종류별로
// export async function getPlantDiaryListService(
// 	data: plantDiaryDocument,
// 	skip: number,
// 	limit: number
// ) {
// 	return await PlantDiary.aggregate([
// 		{
// 			$match: {
// 				plantId: data.plantId,
// 			},
// 		},
// 		{ $sort: { createdAt: -1 } },
// 		{ $skip: skip },
// 		{ $limit: limit },
// 	]);
// }

// export async function getPlantDiaryListService(
//     data: { plantId: string },
//     skip: number,
//     limit: number
//   ) {
//     return await PlantDiary.find({ plantId: data.plantId })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();
//   }

// export async function getAllPlantDiaryListService() {
//     return await PlantDiary.aggregate([
// 		{
// 			$project: {
// 				_id: 1,
// 				plantDiaryId: 1,
// 			},
// 		},
// 		{ $sort: { createdAt: -1 } },
// 	]);
// }