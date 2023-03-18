import crypto from 'crypto';
import { secretKey } from '$lib/server/secrets';

const aesAlgorithm = 'aes-256-cbc';
const aesKey = Buffer.alloc(32);
await aesKey.write(secretKey);
const aesIv = crypto.randomBytes(16);

const signKey = async (key: string) => {
	const newHmacKey = crypto.createHmac('sha256', secretKey);
	newHmacKey.update(key);
	return `${key}.${newHmacKey.digest('hex')}`;
};
const encrypt = async (key: string) => {
	const signedKey = await signKey(key);
	const cipherAES = crypto.createCipheriv(aesAlgorithm, aesKey, aesIv);
	let encrypted = cipherAES.update(signedKey, 'utf8', 'hex');
	encrypted += cipherAES.final('hex');
	return { encrypted, iv: aesIv.toString('hex') };
};

const verifyKeySignature = async (signedCookie: string) => {
	const valueWithSignature = signedCookie.split('.');
	const value = valueWithSignature[0];
	const signature = valueWithSignature[1];
	const hmac = crypto.createHmac('sha256', secretKey);
	hmac.update(value);
	const expectedSignature = hmac.digest('hex');
	const isValidSignature = crypto.timingSafeEqual(
		Buffer.from(signature, 'hex'),
		Buffer.from(expectedSignature, 'hex')
	);
	if (!isValidSignature) {
		return '';
	}
	return value;
};

const decrypt = async ({ encrypted, iv }: { encrypted: string; iv: string }): Promise<string> => {
	try {
		const decipher = crypto.createDecipheriv(aesAlgorithm, aesKey, Buffer.from(iv, 'hex'));
		let decrypted = decipher.update(encrypted, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return (await verifyKeySignature(decrypted)) as string;
	} catch (e) {
		console.log('decryption error: ', e);
		return '';
	}
};

export { encrypt, decrypt };
