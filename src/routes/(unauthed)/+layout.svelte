<script lang="ts">
	import '../../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { permission } from '$lib/client/stores';
	import type { LayoutServerData } from './$types';
	import { appName, logoURL } from '$lib/client/constants';
	export let data: LayoutServerData;
	if (data && data.permission) permission.set(data.permission);
</script>

<svelte:head>
	<link rel="icon" href={logoURL} />
	<title>{appName}</title>
</svelte:head>
<div class="min-h-screen overflow-x-hidden bg-primary-50">
	<Navbar permission={$permission} />
	<Toaster />
	<slot />
</div>
