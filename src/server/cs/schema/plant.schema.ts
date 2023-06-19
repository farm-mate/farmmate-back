import { number, object, ref, string } from "yup";

import * as messages from "../../json/message.json";

export const registerPlantSchema = object({
	body: object({
		plantId: string().required(),
	}),
});

export const getPlantInfoSchema = object({
	headers: object({
		plantId: string().required(),
	}),
});

export const getPlantListSchema = object({
	headers: object({
		page: number().required(),
		limit: number().required(),
	}),
});

export const deletePlantSchema = object({
	headers: object({
		plantId: string().required(),
	}),
});
