import mongoose from 'mongoose';
import { plantDiaryDocument } from './plantDiary.model';
import * as dotenv from "dotenv";
dotenv.config();

export interface plantDocument extends mongoose.Document {
    plantType : string;
    plantNickname: string;
    plantLocation: string;
    memo: string;
    firstPlantingDate: Date;
    recentWateringDate: plantDiaryDocument["recentWateringDate"];
    recentFertilizerDate: plantDiaryDocument["recentFertilizerDate"];
    recentPesticideDate: plantDiaryDocument["recentPesticideDate"];
    createdAt: Date;
    updatedAt: Date;
    bookmarkStatus: boolean;
}

export interface plantProfile {
	plantType?: string;
	plantNickname?: string;
	plantLocation?: string;
	memo?: string;
    firstPlantingDate?: Date;
    // recentWateringDate? {type: Date };
    // recentFertilizerDate? { type : Date };
    // recentPesticideDate? { type : Date };
    bookmarkStatus?: boolean;
}

const PlantSchema = new mongoose.Schema(
	{
		plantType: { type: String, required: true},
		plantNickname: { type: String },
		plantLocation: { type: String, required: true },
		memo: { type: String },
        firstPlantingDate: { type: Date, required: true },
        bookmarkStatus: { type: String, default: false },
        createdAt: { type : Date, default : Date.now }
	},
	{
		timestamps: true,
	}
);

const Plant = mongoose.model<plantDocument>("Plant", plantSchema);
export default Plant;
