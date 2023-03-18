export const removeKeysFromDict = async (dataDict: any, keys: any[]) => {
	const keysToRemove = new Set(keys);
	const modifiedDict = Object.fromEntries(
		Object.entries(dataDict).filter(([key]) => !keysToRemove.has(key))
	);
	return modifiedDict;
};

export const fetchHelper = async (method: string, url: string, data: any) => {
	const response = await fetch(url, {
		method: method,
		body: JSON.stringify(data),
		headers: {
			'content-type': 'application/json'
		}
	});
	return await response.json();
};
