import { Request, Response } from "express";
import { get, omit } from "lodash";
import log from "../../../utils/logger"; 
import  {
    registerDeviceService,
} from "../service/device.service";

export async function registerDeviceController(req: Request, res: Response) {
    try {
        const deviceId = req.body;
        const registerDevice = await registerDeviceService(deviceId);
        return res.send(registerDevice);
    } catch (e) {
        log.error(`registerDeviceController: ${e}`);
        return res.status(500).json({result : "500"});
    }
}