// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		userAuth: {
			isAuthenticated: boolean;
			user?: {
				id: string;
				name: string;
				email: string;
				phone: string;
				userType: string;
			} | null;
		};
	} // interface PageData {}
	// interface Platform {}
}
