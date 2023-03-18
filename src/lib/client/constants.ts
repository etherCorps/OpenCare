// @ts-nocheck
import { env } from '$env/dynamic/public';
export const appName: string = env.PUBLIC_APP_NAME || 'OpenCare';
export const appVersion: string = env.PUBLIC_APP_VERSION || '0.2.1';
export const logoURL: string = env.PUBLIC_LOGO_URL || '/blue.svg';
