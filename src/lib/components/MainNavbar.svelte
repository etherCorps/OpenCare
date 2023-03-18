<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { appName, logoURL } from '$lib/client/constants';
	import { user } from '$lib/client/stores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { clickOutsideHandler } from '$lib/utils/clickOutside';
	import CreateProject from '$lib/components/meta/CreateProject.svelte';
	import ProjectDropDown from '$lib/components/meta/ProjectDropDown.svelte';
	let openSearchBox = false;
	let searchType: 'Tickets' | 'Documents' = 'Tickets';
	let searchValue: string;
	let dropDownOpen = false;
	let searchTypes: string[] = ['Tickets', 'Documents'];
	let openSideNav = false;
	let openUserPanel = false;
	let showAddNewProject = false;
	let innerWidth = 0;
	$: if (innerWidth >= 1440 && !openSideNav) openSideNav = true;

	function handleKeydown(event) {
		if (event.ctrlKey && event.keyCode === 76) goto('/logout');
	}
</script>

<svelte:window bind:innerWidth on:keydown={handleKeydown} />
<div class="flex flex-1 flex-col ">
	<header class="fixed inset-x-0 top-0 z-50 border-b border-primary-900 bg-white shadow-sm">
		<div class="bg-transparent">
			<div class="mx-auto bg-primary-100 px-4">
				<div class="flex h-16 items-center justify-between">
					<div class="-m-2 block lg:mr-2 xl:hidden">
						<button
							on:click={() => {
								openSideNav = !openSideNav;
							}}
							type="button"
							class="sideNavBtn inline-flex items-center justify-center rounded-lg p-2 text-primary-400 hover:bg-primary-100 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-6 w-6 text-primary-700 transition-transform duration-500 ease-in-out {openSideNav
									? 'rotate-180'
									: ''}"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
								/>
							</svg>
						</button>
					</div>

					<div class="ml-6 mr-auto flex lg:ml-0">
						<div class="flex flex-shrink-0 items-center">
							<img class="block h-8 w-auto" src={logoURL} alt="Company Logo" />
							<span
								class="ml-4 hidden text-xl font-bold
            						text-primary-700 md:text-2xl
            						lg:block">{appName}</span
							>
						</div>
					</div>

					<div class="flex items-center justify-end space-x-6 sm:ml-5">
						<div class="relative">
							<button
								type="button"
								on:click={() => (openSearchBox = true)}
								class="rounded-full p-1 text-primary-600 transition-all duration-200"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="h-6 w-6"
								>
									<path
										fill-rule="evenodd"
										d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>

						<div class="relative">
							<button
								type="button"
								class="rounded-full p-1 text-primary-600 transition duration-200 ease-in-out"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
									class="h-6 w-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
							</button>
							<span
								class="absolute -top-px -right-1 inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-semibold text-primary-600"
							>
								6
							</span>
						</div>
						<div class="relative inline-block drop-shadow-lg">
							<button
								on:click={() => (openUserPanel = !openUserPanel)}
								type="button"
								class="UserPanelBtn flex max-w-xs items-center rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 md:bg-primary-300"
							>
								<img
									class="h-8 w-8 rounded-full bg-white object-cover"
									src={$user.profileIcon}
									alt={$user.name}
								/>
								<span class="ml-2 hidden text-sm font-medium text-primary-900 md:block">
									{$user?.name}
								</span>
							</button>
							{#if openUserPanel}
								<div
									transition:slide
									use:clickOutsideHandler={'UserPanelBtn'}
									on:outsideClick={() => (openUserPanel = false)}
									class="absolute right-0 z-10 mt-2 w-60 divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white text-left text-sm shadow-lg"
								>
									<div class="py-3 px-4">
										<div class="flex items-center">
											<div class="text-sm">
												<div class="font-medium text-gray-700">{$user.name}</div>
												<div class="text-gray-400">{$user.email}</div>
											</div>
										</div>
									</div>
									<div class="p-1">
										<a
											href="/dashboard"
											class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-4 w-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
												/>
											</svg>
											View profile
											<span
												class="inline-flex flex-1 justify-end gap-1 text-xs capitalize text-gray-400"
											>
												<kbd class="min-w-[1em] font-sans">⌥</kbd>
												<kbd class="min-w-[1em] font-sans">⇧</kbd>
												<kbd class="min-w-[1em] font-sans">P</kbd>
											</span>
										</a>
										<a
											href="/dashboard"
											class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
											><svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-4 w-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
												/>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
											Settings
											<span
												class="inline-flex flex-1 justify-end gap-1 text-xs capitalize text-gray-400"
											>
												<kbd class="min-w-[1em] font-sans">⌥</kbd>
												<kbd class="min-w-[1em] font-sans">⇧</kbd>
												<kbd class="min-w-[1em] font-sans">S</kbd>
											</span>
										</a>
										<a
											href="/dashboard"
											class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-4 w-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
												/>
											</svg>
											Download
										</a>
									</div>
									<div class="p-1">
										<a
											href="/dashboard"
											class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-4 w-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
												/>
											</svg>
											Help Center
											<span
												class="inline-flex flex-1 justify-end gap-1 text-xs capitalize text-gray-400"
											>
												<kbd class="min-w-[1em] font-sans">?</kbd>
											</span>
										</a>
										<a
											href="/dashboard"
											class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-4 w-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
												/>
											</svg>
											Changelog
										</a>
										<a
											href="/dashboard"
											class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-4 w-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
												/>
											</svg>
											API
										</a>
									</div>
									<div class="logout p-1">
										<button
											on:click={() => {
												goto('/logout');
											}}
											class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-4 w-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
												/>
											</svg>
											Log out
											<span
												class="inline-flex flex-1 justify-end gap-1 text-xs capitalize text-gray-400"
											>
												<kbd class="min-w-[1em] font-sans">Ctrl</kbd>+
												<kbd class="min-w-[1em] font-sans">L</kbd>
											</span>
										</button>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>

	<div class="z-10 mt-10 flex flex-1">
		{#if openSideNav}
			<div
				use:clickOutsideHandler={'sideNavBtn'}
				on:outsideClick={() => (openSideNav = false)}
				transition:fly={{ x: -200, duration: 500 }}
				class="fixed border-r border-primary-200 bg-white transition-all duration-1000 ease-in-out xl:flex xl:w-64 xl:flex-col"
			>
				<div class="flex flex-col overflow-y-auto bg-transparent pt-5">
					<div class="flex min-h-[95vh] flex-1 flex-col justify-between bg-primary-100 px-4 py-5">
						<div class="space-y-4">
							<div>
								<div class="mb-4">
									<ProjectDropDown />
								</div>

								{#if $user.userType !== 'Admin'}
									<button
										type="button"
										class="hover:bg-secondary focus:bg-secondary inline-flex w-full items-center justify-center rounded-lg border bg-primary-600 px-4 py-3 text-sm font-semibold leading-5 text-primary-300 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2"
									>
										New Issue
									</button>
								{:else}
									<button
										on:click={() => {
											showAddNewProject = true;
										}}
										type="button"
										class="hover:bg-secondary focus:bg-secondary inline-flex w-full items-center justify-center rounded-lg border bg-primary-600 px-4 py-3 text-sm font-semibold leading-5 text-primary-300 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
									>
										Add New Project
									</button>
								{/if}
							</div>

							<nav class="flex-1 space-y-1">
								<a
									href="/dashboard"
									title=""
									class="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-primary-900 transition-all duration-200 hover:bg-primary-200 {$page
										.url.pathname === '/dashboard'
										? 'bg-primary-200'
										: ''}"
								>
									<svg
										class="mr-4 h-5 w-5 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
										/>
									</svg>
									Dashboard
								</a>
							</nav>

							<div>
								<p class="px-4 text-xs font-semibold uppercase tracking-widest text-primary-400">
									Analytics
								</p>
								<nav class="mt-4 flex-1 space-y-1">
									<a
										href="/dashboard"
										title=""
										class="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-primary-900 transition-all duration-200 hover:bg-primary-200"
									>
										<svg
											class="mr-4 h-5 w-5 flex-shrink-0"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
											/>
										</svg>
										Performance
									</a>

									<a
										href="/dashboard"
										title=""
										class="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-primary-900 transition-all duration-200 hover:bg-primary-200"
									>
										<svg
											class="mr-4 h-5 w-5 flex-shrink-0"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
											/>
										</svg>
										Hotjar
										<span
											class="ml-auto inline-flex items-center rounded-full border border-primary-300 bg-primary-50 px-2 py-0.5 text-xs font-semibold uppercase text-primary-600"
										>
											New
										</span>
									</a>
								</nav>
							</div>

							<div>
								<p class="px-4 text-xs font-semibold uppercase tracking-widest text-primary-400">
									Support
								</p>
								<nav class="mt-4 flex-1 space-y-1">
									<a
										href="/dashboard"
										title=""
										class="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-primary-900 transition-all duration-200 hover:bg-primary-200"
									>
										<svg
											class="mr-4 h-5 w-5 flex-shrink-0"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
											/>
										</svg>
										Tickets
										<span
											class="ml-auto inline-flex items-center rounded-full border border-primary-300 bg-primary-50 px-2 py-0.5 text-xs font-semibold uppercase text-primary-600"
										>
											15
										</span>
									</a>

									<a
										href="/dashboard"
										title=""
										class="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-primary-900 transition-all duration-200 hover:bg-primary-200"
									>
										<svg
											class="mr-4 h-5 w-5 flex-shrink-0"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
										Agents
									</a>

									<a
										href="/dashboard"
										title=""
										class="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-primary-900 transition-all duration-200 hover:bg-primary-200"
									>
										<svg
											class="mr-4 h-5 w-5 flex-shrink-0"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
											/>
										</svg>
										Customers
									</a>
								</nav>
							</div>

							<div>
								<p class="px-4 text-xs font-semibold uppercase tracking-widest text-primary-400">
									Shop
								</p>
								<nav class="mt-4 flex-1 space-y-1">
									<a
										href="/dashboard"
										title=""
										class="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-primary-900 transition-all duration-200 hover:bg-primary-200"
									>
										<svg
											class="mr-4 h-5 w-5 flex-shrink-0"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
											/>
										</svg>
										Products
									</a>

									<a
										href="/dashboard"
										title=""
										class="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-primary-900 transition-all duration-200 hover:bg-primary-200"
									>
										<svg
											class="mr-4 h-5 w-5 flex-shrink-0"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
											/>
										</svg>
										Orders
									</a>

									<a
										href="/dashboard"
										title=""
										class="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-primary-900 transition-all duration-200 hover:bg-primary-200"
									>
										<svg
											class="mr-4 h-5 w-5 flex-shrink-0"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
										Reports
									</a>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
		<!--		</OutClick>-->

		<div class="flex flex-1 flex-col xl:ml-10">
			<main>
				<div class="py-6">
					<div class="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
						<slot />
					</div>
				</div>
			</main>
		</div>
	</div>
</div>
<!--{#if open}-->
<!--	<div transition:fade>-->
<!--		<Modals on:close={() => (open = false)}>-->
<!--			<span slot="header">-->
<!--				<div class="flex items-center justify-start	">-->
<!--					<div class="flex-initial  py-2">-->
<!--						<div class="mx-auto max-w-7xl pl-2 sm:px-6">-->
<!--							<div class="mx-auto max-w-lg">-->
<!--								<div class="relative">-->
<!--									<div class="mt-2">-->
<!--										<div-->
<!--											on:click={() => {-->
<!--												dropDownOpen = !dropDownOpen;-->
<!--											}}-->
<!--											class="block w-full cursor-pointer rounded-lg border border-primary-300 py-2 px-5 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 sm:text-sm"-->
<!--										>-->
<!--											<div class="flex items-center">-->
<!--												<div class="flex items-center justify-start space-x-2">-->
<!--													<span>{searchType}</span>-->
<!--												</div>-->
<!--												<svg-->
<!--													xmlns="http://www.w3.org/2000/svg"-->
<!--													class="ml-5 h-4 w-4 {!dropDownOpen ? '' : 'transform rotate-180'}"-->
<!--													fill="none"-->
<!--													viewBox="0 0 24 24"-->
<!--													stroke="currentColor"-->
<!--													stroke-width="2"-->
<!--												>-->
<!--													<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />-->
<!--												</svg>-->
<!--											</div>-->
<!--										</div>-->
<!--									</div>-->
<!--									{#if dropDownOpen}-->
<!--										<div class="absolute -bottom-10 z-10 w-full">-->
<!--											<div-->
<!--												class="block w-full space-y-2 rounded-lg border border-primary-300  px-4 py-2 text-sm shadow"-->
<!--											>-->
<!--												<ul class="flex flex-col">-->
<!--													{#each searchTypes as type}-->
<!--														<li-->
<!--															class="w-full cursor-pointer rounded-md p-2 hover:bg-primary-100"-->
<!--															on:click={() => {-->
<!--																searchType = type;-->
<!--																dropDownOpen = false;-->
<!--															}}-->
<!--														>-->
<!--															{type}-->
<!--														</li>-->
<!--													{/each}-->
<!--												</ul>-->
<!--											</div>-->
<!--										</div>-->
<!--									{/if}-->
<!--								</div>-->
<!--							</div>-->
<!--						</div>-->
<!--					</div>-->

<!--					<div class=" py-2">-->
<!--						<div class="mx-auto max-w-7xl px-2">-->
<!--							<div class="mx-auto max-w-lg">-->
<!--								<div class="relative mt-2">-->
<!--									<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">-->
<!--										<svg-->
<!--											xmlns="http://www.w3.org/2000/svg"-->
<!--											class="h-4 w-4 text-primary-400"-->
<!--											fill="none"-->
<!--											viewBox="0 0 24 24"-->
<!--											stroke="currentColor"-->
<!--											stroke-width="2"-->
<!--										>-->
<!--											<path-->
<!--												stroke-linecap="round"-->
<!--												stroke-linejoin="round"-->
<!--												d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"-->
<!--											/>-->
<!--										</svg>-->
<!--									</div>-->

<!--									<input-->
<!--										type="text"-->
<!--										name=""-->
<!--										id=""-->
<!--										placeholder="Search here"-->
<!--										bind:value={searchValue}-->
<!--										class="block w-full rounded-lg border border-primary-300 py-2 pl-8 pr-5 placeholder-primary-500 caret-indigo-600 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"-->
<!--									/>-->
<!--								</div>-->
<!--							</div>-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</span>-->
<!--			<hr />-->
<!--			<div class="">-->
<!--				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">-->
<!--					<div class="mt-2 space-y-8 last:mb-4">-->
<!--						<div class="flex items-center">-->
<!--							<img-->
<!--								class="h-10 w-10 flex-shrink-0 rounded-full object-cover"-->
<!--								src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-stacked/5/avatar-female.png"-->
<!--								alt=""-->
<!--							/>-->
<!--							<div class="ml-4 min-w-0 flex-1">-->
<!--								<p class="truncate text-sm font-bold text-primary-900">Kristin Watson</p>-->
<!--								<p class="mt-1 text-xs font-medium text-primary-500">-->
<!--									Purchased <span class="text-indigo-600"> Clarity Landing UI Kit </span>-->
<!--								</p>-->
<!--							</div>-->
<!--						</div>-->

<!--						<div class="flex items-center">-->
<!--							<img-->
<!--								class="h-10 w-10 flex-shrink-0 rounded-full object-cover"-->
<!--								src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-stacked/5/avatar-female.png"-->
<!--								alt=""-->
<!--							/>-->
<!--							<div class="ml-4 min-w-0 flex-1">-->
<!--								<p class="truncate text-sm font-bold text-primary-900">Kristin Watson</p>-->
<!--								<p class="mt-1 text-xs font-medium text-primary-500">-->
<!--									Purchased <span class="text-indigo-600"> Clarity Landing UI Kit </span>-->
<!--								</p>-->
<!--							</div>-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--		</Modals>-->
<!--	</div>-->
<!--{/if}-->

{#if showAddNewProject}
	<CreateProject bind:showAddNewProject />
{/if}
