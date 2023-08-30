import { IResponse } from "../interface/IResponse";
import message from "./responseMessage";
import statusCode from "./statusCode";

export const responseError: IResponse = {
    result: {
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
    },
    message: message.INTERNAL_SERVER_ERROR,
};

export const tooManyRequest: IResponse = {
    result: {
        statusCode: statusCode.TOO_MANY_REQUEST,
    },
    message: message.TOO_MANY_REQUEST,
};

