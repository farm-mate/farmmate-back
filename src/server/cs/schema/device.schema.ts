import { number, object, ref, string } from "yup";

import * messages from "../../json/message.json";

export const registerDeviceSchema = object({
    body: object({
        deviceId: string().required(),
    })
})