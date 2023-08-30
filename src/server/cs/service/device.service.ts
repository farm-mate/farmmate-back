import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { Request, Response } from "express";
import { DocumentDefinition} from "mongoose";
import Device, {
    deviceDocument,
} from "../../../model/device.model";

export async function registerDeviceService (
    deviceId : DocumentDefinition<deviceDocument>
) {
    let result = await Device.create(deviceId);
    console.log("check device result:", result);
    return result;
}