<script lang="ts">
	import '../../app.css';

	import { Toaster } from 'svelte-french-toast';
	import type { LayoutServerData } from './$types';
	import { user, userProjects, allUsers } from '$lib/client/stores';
	import MainNavbar from '$lib/components/MainNavbar.svelte';
	import { appName, logoURL } from '$lib/client/constants';

	export let data: LayoutServerData;
	user.set(data.user);
	userProjects.set(data.projects);
	allUsers.set(data.allUsers);
</script>

<svelte:head>
	<link rel="icon" href={logoURL} />
	<title>{appName} - Dashboard 🎯️</title>
</svelte:head>
<div class="min-h-screen overflow-x-hidden bg-primary-50">
	<Toaster />
	<MainNavbar>
		<slot />
	</MainNavbar>
</div>
