import Redis from 'ioredis';
import { redisURL } from '$lib/server/secrets';
import { decrypt, encrypt } from '$lib/server/cookieSignature';

export const redisClient = new Redis(redisURL);

redisClient.on('connect', () => {
	console.log('Connected to Redis');
});

redisClient.on('error', (error) => {
	console.error(`Error connecting to Redis: ${error}`);
});

export const createOrUpdateSession = async (
	expireTimeSeconds: number,
	data: any
): Promise<string> => {
	const key = crypto.randomUUID();
	await redisClient.set(key, JSON.stringify(data));
	await redisClient.expireat(key, expireTimeSeconds);
	const encryptedCookieValue = await encrypt(key);
	return JSON.stringify(encryptedCookieValue);
};

export const getSession = async (cookieValue: {
	encrypted: string;
	iv: string;
}): Promise<{ redisData: string; expiryTime: number }> => {
	const key = await decrypt(cookieValue);
	let redisData = '';
	let expiryTime = 0;
	await redisClient.get(key).then(async (result) => {
		if (result) {
			redisData = result;
			expiryTime = await redisClient.ttl(key);
		}
	});
	return { redisData, expiryTime };
};

export const deleteSession = async (cookieValue: { encrypted: string; iv: string }) => {
	const key = await decrypt(cookieValue);
	try {
		await redisClient.exists(key).then(async (result) => {
			await redisClient.del(key);
		});
	} catch (e) {
		console.log('Session Delete Error: ', e);
	}
};

//%7B%22encrypted%22%3A%22c30570e9526f07b4e25c147d73db56195acbb4b3ecbbf9736a6266e108f7ee6cc148669c16bafe7a3ac472f79cb100e325e84ccf79b035ce33566fcce5155c915e50064af6ef121278e9ea0012d09639ebb510337308dd82bdf77132b19a38b072dc68512f0055fff2e3df4296871fa1%22%2C%22%22%3A%22fc595e0cd2c8179ef9d86dfcb944c449%22%7D
