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
import PlantTodo, {
	plantTodoDocument,
    plantTodoSchema,
} from "../../../model/plantTodo.model";
// import { avg, chunk } from "../../../utils/tools";
import { escapeRegExp } from 'lodash';
import { getPlantInfoService } from "./plant.service";

export async function createPlantTodoService(data: DocumentDefinition<plantTodoDocument>){
    try {
        const createPlantTodo = await PlantTodo.create(data);
        return createPlantTodo;
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function getPlantTodoByDateService(date: string) {
    try {
        const searchDate = new Date(date);
        const data = await PlantTodo.find({ createdAt: { $gte: searchDate } });
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

export async function getPlantTodoService(query: FilterQuery<plantTodoDocument>) {
    try {
        const getPlantTodo = await PlantTodo.findOne(query).lean();
        return getPlantTodo;
    } catch (e) {
        throw new Error(e);
    }
}

export async function editPlantTodoService(query: FilterQuery<plantTodoDocument>, data: plantTodoDocument) {
    try {
        const editPlantTodo = await PlantTodo.updateOne(query, {$set: data}, {new: true});
        return editPlantTodo;
    } catch (e) {
        throw new Error(e);
    }
}

export async function deletePlantTodoService(query: FilterQuery<plantTodoDocument>) {
    try { 
       // softDelete
    } catch (e) {

    }
}