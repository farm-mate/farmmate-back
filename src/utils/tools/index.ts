export function chunk(data: Array<any>) {
	const items = [...data];

	const arr = [];

	for (let i = 1; i < data.length; i++) {
		arr.push(Math.abs(items[i] - items[i - 1]));
	}

	return arr;
}
export function avg(arr: Array<any>) {
	return Math.floor(arr.reduce((sum, current) => sum + current) / arr.length);
}
