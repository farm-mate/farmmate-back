import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { Request, Response } from "express";
import { DocumentDefinition, FilterQuery } from "mongoose";
import Plant {
    plantDocument,
    plantProfile
} from "../../../model/plant.model";
import PlantDiary from "../../../model/plantDiary.model";
import { getLatestPlantDiaryService } from "./plantDiary.service";


export async function registerPlantService(
    data : DocumentDefinition<plantDocument>
) {
    return await Plant.create(data);
}

export async function getPlantInfoService(
    query: FilterQuery<plantDocument>
) {
    return Plant.findOne(query).lean();
}

export async function getPlantListService(
    skip: number,
    limit: number,
    search: string,
    filter: string,
) {
    let data;
    if (search) {
        data = await Plant.aggregate([
            {
                $search: {
                    index: "plantSearchIndex",
                    text: {
                        query: `\"${filter}\"`,
						path: {
							wildcard: "*",
						},
                    },
                },
            },
        ])
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);
    } else {
		data = await Plant.find().sort({ _id: -1 }).skip(skip).limit(limit);
    }

    if (filter) {
        data = await Plant.find
    } else {
        // data = await Plant
        //     .find({plantType : ${filter}})
        //     .sort({ createdAt : -1 });
        data = await Plant.find({plantType : ${filter}})
            .sort({ createdAt : -1 })
            .skip(skip)
            .limit(limit);

    }
    const result = await Promise.all(
		data.map(async (element: any) => {
			const latestDocument = await getLatestDeviceLogService({
				deviceId: element.deviceId,
			});
			return { ...element._doc, latestAt: latestDocument?.createdAt };
		})
	);
	const count = await Plant.find({plantType : filter}).count();

	const returnData = {
		data: data,
		total: count,
	};
	return returnData;
}

export async function getAllPlantListService() {
    return await Plant.aggregate([
		{
			$project: {
				_id: 1,
				plantId: 1,
			},
		},
		{ $sort: { createdAt: -1 } },
	]);
}

export async function editPlantInfoService (
    query: FilterQuery<plantDocument>,
	data: plantProfile
) {
    return await Plant.updateOne(query, { $set: data }, { new: true });
}

export async function deletePlantInfoService (
    query: FilterQuery<plantDocument>
) {
    const id = query.plantId;
	const deletePlant = await Plant.deleteOne(query);
    const deletePlantDiary = await PlantDiary.deleteMany({plantId : id});

	return {
		plantId: id,
		deletePlant: deletePlant,
		deletePlantDiary: deletePlantDiary,
	};
}

export async function getPlantCountService(
    data: FilterQuery<plantDocument>
) {
	return await Plant.find(data).count();
}

