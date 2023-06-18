import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import tz from "dayjs/plugin/timezone";

import utc from "dayjs/plugin/utc";
import {
	DocumentDefinition,
	FilterQuery,
	LeanDocument,
	UpdateQuery,
} from "mongoose";
import PlantDiary, {
	plantDiaryData,
	plantDiaryDocument,
} from "../../../model/plantDiary.model";
import { avg, chunk } from "../../../utils/tools";
import { getPlantInfoService } from "./plant.service";