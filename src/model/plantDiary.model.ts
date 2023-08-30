import mongoose from 'mongoose';
import { plantDocument } from './plant.model';

export interface plantDiaryDocument extends mongoose.Document {
  plantUuid: plantDocument["_id"];
  weather?: string;
  temperature?: number;
  humidity?: number;
  waterFlag?: boolean;
  recentWateringDate: Date;
  fertilize?: {
    fertilizeFlag?: boolean;
    fertilizeName?: string;
    fertilizerUsage?: string;
  };
  pesticide?: {
    pesticideFlag?: boolean;
    pesticideName?: string;
    pesticideUsage?: string;
  };
  memo?: string;
  createdAt: Date;
  updatedAt: Date;
  softDelete: Date;
}

const plantDiarySchema = new mongoose.Schema<plantDiaryDocument>(
  {
    plantUuid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Plant",
    },
    weather: { type: String },
    temperature: { type: Number },
    humidity: { type: Number },
    waterFlag: { type: Boolean },
    fertilize: {
      fertilizeFlag: { type: Boolean },
      fertilizeName: { type: String },
      fertilizerUsage: { type: String },
    },
    pesticide: {
      pesticideFlag: { type: Boolean },
      pesticideName: { type: String },
      pesticideUsage: { type: String },
    },
    memo: { type: String },
  },
  {
    timestamps: true,
  }
);

const PlantDiary = mongoose.model<plantDiaryDocument>(
  "PlantDiary",
  plantDiarySchema
);

export default PlantDiary;


// export interface plantDiaryProfile {
//   plantId: plantDocument["_id"];
//   weather: string;
//   temperature: number;
//   humidity: number;
//   waterFlag: boolean;
//   recentWateringDate: Date;
//   fertilize: {
//     fertilizeFlag: boolean;
//     fertilizeName: string;
//     fertilizeUsage: number;
//     recentFertilizeDate : Date;

//   };
//   pesticide: {
//     pesticideFlag: boolean;
//     pesticideName: string;
//     pesticideUsage: string;
//     recentPesticideDate: Date;

//   };
//   memo: string;
//   createdAt: Date;
//   updatedAt: Date;
// }