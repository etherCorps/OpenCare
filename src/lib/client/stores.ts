import { type Writable, writable } from 'svelte/store';

export const permission = writable(false);
export const user: Writable<any> = writable();
export const userProjects: Writable<any> = writable();
export const allUsers: Writable<any> = writable();

export const currentProject: Writable<any> = writable();
