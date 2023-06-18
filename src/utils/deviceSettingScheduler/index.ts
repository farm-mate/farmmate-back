import { SimpleIntervalJob, Task, ToadScheduler } from "toad-scheduler";
import { getAllDeviceListService } from "../../server/cs/service/device.service";
import {
	getFirstDeviceLogService,
	getLatestDeviceLogService,
	groupingDeviceLogService,
} from "../../server/cs/service/deviceLog.service";
import log from "../logger";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { upsertDeviceSettingService } from "../../server/cs/service/setting.service";

export async function deviceSettingScheduler() {
	const scheduler = new ToadScheduler();

	const task = new Task(`deviceSettingScheduler`, async () => {
		await deviceSettingWorker();
	});

	try {
		const job = new SimpleIntervalJob(
			{ minutes: 10, runImmediately: true },
			task,
			{
				id: `deviceSettingJob`,
				preventOverrun: true,
			}
		);
		scheduler.addSimpleIntervalJob(job);
	} catch (e) {
		scheduler.stopById(`deviceSettingJob`);
		scheduler.startById(`deviceSettingJob`);
		log.error(`deviceSettingJob: ${e}`);
	}
}

export async function deviceSettingWorker() {
	dayjs.extend(duration);
	dayjs.extend(utc);
	dayjs.extend(tz);
	try {
		const deviceList = await getAllDeviceListService();
		const logData: Array<{ deviceId: string; log: any }> = [];
		const result = await Promise.all(
			deviceList.map(async (element, index, array) => {
				const firstLog = await getFirstDeviceLogService({
					deviceId: element.deviceId,
				});
				const latestLog = await getLatestDeviceLogService({
					deviceId: element.deviceId,
				});

				const firstLogTime = dayjs(firstLog?.createdAt);
				const latestLogTime = dayjs(latestLog?.createdAt);

				const range = latestLogTime.diff(firstLogTime, "d");

				if (range > 29) {
					const groupingLogByDate = await groupingDeviceLogService(
						element.deviceId
					);

					let acc = 0;
					let prevDate: Dayjs;
					groupingLogByDate.forEach((element) => {
						const nowDate = dayjs(element._id);

						acc += nowDate.diff(prevDate, "m");

						prevDate = nowDate;
					});
					const avg = Math.floor(
						Math.abs(acc / groupingLogByDate.length)
					);

					const alerts = {
						alerthour: Math.floor(avg - (avg / 10) * 2),
						warninghour: avg,
						errorhour: Math.floor(avg + (avg / 10) * 2),
					};

					const updateDeviceSetting =
						await upsertDeviceSettingService(element._id, alerts);
				}
			})
		);
		return logData;
	} catch (e) {
		log.error(`deviceSettingWorker: ${e}`);
	}
}
