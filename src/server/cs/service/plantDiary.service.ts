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
} from "../../../model/plantDiary.model";
// import { avg, chunk } from "../../../utils/tools";
import { escapeRegExp } from 'lodash';
import { getPlantInfoService } from "./plant.service";
// import { IDiary, fertilizeInfo, pesticideInfo } from "../../interface/diary/IDiary"


export async function createPlantDiaryService(data: DocumentDefinition<plantDiaryDocument>) {
    try {
        const createPlantDiary = await PlantDiary.create(data);
        return createPlantDiary;
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function getPlantDiaryByDateService(date: string) {
    try{
        const searchDate = new Date(date);
        const data = await PlantDiary.find({ createdAt: { $gte: searchDate } });
        // $regex 랑 비교
        return data;
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function getPlantDiaryService(query: FilterQuery<plantDiaryDocument>) {
    try {
        const getPlantDiary = await PlantDiary.findOne(query).lean();
        return getPlantDiary;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

export async function editPlantDiaryService(query: FilterQuery<plantDiaryDocument>, data: plantDiaryDocument) {
    try {
        const editPlantDiary = await PlantDiary.updateOne(query, {$set : data}, {new : true});
        return editPlantDiary;
    } catch (e) {
        throw new Error(e);
    }
    
}  

export async function deletePlantDiaryService(
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