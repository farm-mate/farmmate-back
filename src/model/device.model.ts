import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();

export interface deviceDocument extends mongoose.Document {
    deviceId : String;
    createdAt : Date;
}

const deviceSchema = new mongoose.Schema({
    deviceId : { type : String, required: true},
    createdAt : { type : Date, default: Date.now },
}, {
    timestamps : true,
})

const Device = mongoose.model<deviceDocument>("Device", deviceSchema);
export default Device;