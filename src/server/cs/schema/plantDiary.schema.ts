import { number, object, ref, string } from "yup";

import * as messages from "../../json/message.json";

export const createPlantDiarySchema = object({
	body: object({
		plantId: string().required(),
	}),
});

export const getPlantDiaryInfoSchema = object({
    body: object({
        plantId: string().required(),
    })
})

export const getPlantDiaryListSchema = object({
    headers: object({
        plantId: string().required(),
		page: number().required(),
		limit: number().required(),
	}),
})

export const getAllDeviceLogListSchema = object({
	headers: object({
		plantId: string().required(),
	}),
});

export const deleteDeviceSchema = object({
	body: object({
		id: string().required(),
	}),
});
