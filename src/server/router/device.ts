import { Express, Request, Response, NextFunction } from "express";
import {
    registerDeviceController,
} from "../cs/controller/device.controller"
require("dotenv").config();
const apiUrl = process.env.API_URL;

export default async function (app: Express) {
    app.post(
        `${apiUrl}device`,
        registerDeviceController
    );
}