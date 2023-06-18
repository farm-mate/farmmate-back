import mongoose from 'mongoose';
import { plantDocument } from './plant.model';

export interface todoDocument extends mongoose.Document {
    plantId: plantDocument["_id"];
    waterFlag: boolean;
    fertilize: {
        fertilizeFlag: boolean;
        fertilizeName: string;
        fertilizerUsage: string;
    };
    pesticide: {
        pesticideFlag: boolean;
        pesticideName: string;
        pesticideUsage: string;
    };
    memo: string;
    createdAt: Date;
    updatedAt: Date;
}

const plantDiarySchema = new mongoose.Schema (
    {
        plantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "Plant",
        },
        waterFlag: { type: boolean, required : true},
        fertilize: {
            fertilizeFlag: { type: boolean, required: true },
            fertilizeName: { type: String },
            fertilizerUsage: { type: String },
        },
        pesticide: {
            pesticideFlag: { type: boolean, required: true },
            pesticideName: { type: String },
            pesticideUsage: { type: String },
        },
        memo : {type : String},

    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model<todoDocument>(
    "todo",
    todoSchema
);

export default todo;