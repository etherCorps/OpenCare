<script lang="ts">
	import { slide } from 'svelte/transition';
	import { appName } from '$lib/client/constants';
	import { appVersion, logoURL } from '$lib/client/constants.js';
	let show = false;
	let innerWidth = 0;
	let navigationPathNames = ['Features', 'Docs', 'Deployment'];
	export let permission = false;
	$: show = show ? innerWidth < 1440 : false;
</script>

<svelte:window bind:innerWidth />

<header class="z-10 py-4 md:py-6">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<a class="flex flex-shrink-0 items-center space-x-2 drop-shadow-md" href="/">
				<img class="block h-8 w-auto drop-shadow-md" src={logoURL} alt="Company Logo" />
				<span class="text-3xl font-bold text-primary-700 drop-shadow-lg	">{appName}</span>
				<span
					class="cursor-grab rounded-full bg-primary-300 px-2 py-1 text-sm font-bold text-primary-700	drop-shadow-lg"
					>v{appVersion}</span
				>
			</a>

			<div class="flex xl:hidden">
				<button
					class="relative h-8 w-10 p-6"
					on:click={() => {
						show = !show;
					}}
				>
					<span class="sr-only">Open main menu</span>
					<div
						class="absolute left-1/2 top-1/2 block w-5   -translate-x-1/2  -translate-y-1/2 transform"
					>
						<span
							aria-hidden="true"
							class="hamburger-line {show === true ? 'rotate-45' : '-translate-y-1.5'}"
						/>
						<span
							aria-hidden="true"
							class="absolute block h-0.5 w-3 transform rounded bg-current transition duration-500 ease-in-out {show ===
							true
								? 'opacity-0'
								: ''}"
						/>
						<span
							aria-hidden="true"
							class="hamburger-line {show === true ? '-rotate-45' : 'translate-y-1.5'}"
						/>
					</div>
				</button>
			</div>

			<div
				class="hidden xl:ml-16 xl:flex xl:items-center xl:justify-center xl:space-x-10 xl:space-x-16"
			>
				{#each navigationPathNames as name}
					<a
						href="/"
						title=""
						class="rounded text-base font-medium text-primary-500 transition-all duration-200 hover:text-primary-900 focus:outline-none focus:ring-1 focus:ring-primary-900 focus:ring-offset-2"
					>
						{name}
					</a>
				{/each}
			</div>

			<div class="hidden xl:ml-auto xl:flex xl:items-center xl:space-x-10">
				{#if permission}
					<a
						href="/createAdmin"
						title=""
						class="inline-flex items-center justify-center rounded-xl border border-transparent bg-primary-900 px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2"
						role="button"
					>
						Create Super Admin
					</a>
				{/if}
				<a
					data-sveltekit-preload-data="hover"
					href="login"
					title=""
					class="inline-flex items-center justify-center rounded-xl border border-transparent bg-primary-900 px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2"
					role="button"
				>
					Login
				</a>
			</div>
		</div>
		<div class="container">
			{#if show}
				<nav
					transition:slide
					class="w-full {show ? 'z-10 block bg-opacity-70 backdrop-blur ' : ''} fixed"
				>
					<div class="px-1 py-8">
						<div class="grid gap-y-7">
							{#each navigationPathNames as name}
								<a
									href="/"
									title=""
									class=" -m-3 flex items-center justify-center rounded-xl p-3 text-base font-medium text-primary-900 transition-all duration-200 hover:mx-auto hover:bg-primary-500 hover:px-20 focus:outline-none focus:ring-1 focus:ring-primary-900 focus:ring-offset-2"
								>
									{name}
								</a>
							{/each}
							{#if permission}
								<a
									href="/"
									title=""
									class=" mx-auto inline-flex rounded-xl border border-transparent bg-primary-900 px-20 py-2 text-base font-bold leading-7 text-white transition-all duration-200 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2"
									role="button"
								>
									Create Super Admin
								</a>
							{/if}
							<a
								href="/login"
								title=""
								class="mx-auto inline-flex rounded-xl border border-transparent bg-primary-900 px-32 py-2 text-base font-bold leading-7 text-white transition-all duration-200 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2"
								role="button"
							>
								Login
							</a>
						</div>
					</div>
				</nav>
			{/if}
		</div>
	</div>
</header>

<style>
	.hamburger-line {
		@apply absolute block  h-0.5 w-5 transform rounded bg-current transition duration-500 ease-in-out;
	}
</style>
