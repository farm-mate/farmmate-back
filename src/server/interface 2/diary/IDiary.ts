import {plantDiaryDocument} from "../../../model/plantDiary.model";

export interface IDiary extends plantDiaryDocument {
    plantUuid?: string,
    plantWeather?: string,
    temperature?: number,
    humidity?: number,
    waterFlag?: boolean,
    fertilize?: fertilizeInfo,
    pesticide?: pesticideInfo,
    memo?: string,
}

export interface fertilizeInfo {
    fertilizeFlag?: boolean,
    fertilizeName?: string,
    fertilizeUsage?: string,
}

export interface pesticideInfo {
    pesticideFlag?: boolean,
    pesticideName?: string,
    pesticideUsage?: string,
}

export interface ITodo {
    plantUuid?: string,
    waterFlag?: boolean,
    fertilize?: fertilizeInfo 
    pesticide?: pesticideInfo,
    memo?: string,
}