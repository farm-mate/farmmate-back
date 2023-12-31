import mongoose from 'mongoose';
import { plantDiaryDocument } from './plantDiary.model';
import { deviceDocument } from "./device.model";
import * as dotenv from "dotenv";
dotenv.config();

export interface plantDocument extends mongoose.Document {
  deviceId: deviceDocument["deviceId"];
  plantType?: string;
  plantNickname?: string;
  plantLocation?: string;
  memo?: string;
  firstPlantingDate?: Date;
  recentWateringDate: Date;
  // recentFertilizerDate: plantDiaryDocument["fertilize"]["recentFertilizerDate"];
  // recentPesticideDate: plantDiaryDocument["pesticide"]["recentPesticideDate"];
  createdAt: Date;
  updatedAt: Date;
  bookmarkStatus: boolean;
}

export interface plantProfile {
  deviceId: string;
  plantType?: string;
  plantNickname?: string;
  plantLocation?: string;
  memo?: string;
  firstPlantingDate?: Date;
  recentWateringDate?: Date;
  // recentFertilizerDate?: plantDiaryDocument["fertilize"]["recentFertilizerDate"];
  // recentPesticideDate?: plantDiaryDocument["pesticide"]["recentPesticideDate"];
  bookmarkStatus?: boolean;
}


const plantSchema = new mongoose.Schema<plantDocument>(
  {
    deviceId: {
      type : String,
      required: true,
      ref: "Device",
    },
    plantType: { type: String, required: true },
    plantNickname: { type: String },
    plantLocation: { type: String, required: true },
    memo: { type: String },
    firstPlantingDate: { type: Date, default: Date.now },
    recentWateringDate: { type: Date },
    // recentFertilizerDate: { type: Date },
    // recentPesticideDate: { type: Date },
    bookmarkStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Plant = mongoose.model<plantDocument>("Plant", plantSchema);
export default Plant;




