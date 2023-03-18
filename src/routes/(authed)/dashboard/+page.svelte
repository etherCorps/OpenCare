<script>
	import { user } from '$lib/client/stores';
	import { appName } from '$lib/client/constants';
	import { browser } from '$app/environment';
	import { loginBroadcast } from '$lib/client/broadcaster';
	import { onMount } from 'svelte';

	let openUserPanel = false;

	const summaryData = [
		{ heading: 'Total Issues', tickets: 6 },
		{ heading: 'New Issues', tickets: 3 },
		{ heading: `In Progress Issues`, tickets: 2 },
		{ heading: `Closed Issues`, tickets: 1 }
	];

	if (browser && $user) {
		loginBroadcast.postMessage('loggedIn');
	}

	let date = new Date();
	$: hour = date.getHours();
	$: min = date.getMinutes();
	$: sec = date.getSeconds();

	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);
	});

	const greetings = {
		morning: 'Good Morning',
		afternoon: 'Good Afternoon',
		evening: 'Good Evening',
		night: 'Good Night'
	};

	const getGreeting = (hour) => {
		if (hour >= 5 && hour < 12) return greetings.morning;
		if (hour >= 12 && hour < 18) return greetings.afternoon;
		if (hour >= 18 && hour < 22) return greetings.evening;
		return greetings.night;
	};

	$: greeting = getGreeting(hour);
</script>

<svelte:head>
	<title>{appName} - Dashboard 🎯️</title>
</svelte:head>
<div class="flex flex-col">
	<div class="flex flex-1">
		<div class="flex flex-1 flex-col overflow-x-hidden">
			<main>
				<div class="hideScroller py-6">
					<div class="mx-auto flex justify-between px-4 sm:px-6 md:px-8">
						<div class="md:flex md:items-center">
							<p class="text-base font-bold text-primary-900">Hey {$user.name},</p>
							<p class="mt-1 text-base font-medium text-primary-500 md:mt-0 md:ml-1">
								{greeting}
							</p>
						</div>
					</div>

					<div class="mx-auto mt-8 px-4 sm:px-6 md:px-8">
						<div class="space-y-5 sm:space-y-6">
							<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
								{#each summaryData as summary}
									<div class="rounded-xl border border-primary-300">
										<div class="px-5 py-4">
											<p class="text-xs font-medium uppercase tracking-wider text-primary-500">
												{summary.heading}
											</p>
											<div class="mt-3 flex items-center justify-between">
												<p class="text-xl font-bold text-primary-600">{summary.tickets}</p>
											</div>
										</div>
									</div>
								{/each}
							</div>

							<div class="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-6">
								<div class="min-h-[35rem] rounded-xl border border-gray-200 bg-white lg:col-span-6">
									<div class="divide-y divide-gray-200">
										<div class="grid grid-cols-3 gap-y-4 py-4 lg:grid-cols-6 lg:gap-0">
											<div class="col-span-2 px-4 sm:px-6 lg:col-span-1 lg:py-4">
												<span
													class="inline-flex items-center px-2.5 py-1 text-xs font-medium text-green-900"
												>
													111
												</span>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-3 lg:py-4">
												<p class="text-sm font-bold text-gray-900">
													Blah bhalabvcgshbfsjb vvskhvbs v s vhksb vsjvs khbmvb sjkmbcs mhsb ,ns
													vszj
												</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Project</p>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-2 lg:py-4">
												<p class="text-sm font-bold text-gray-900">Status</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Expiry date</p>
											</div>
										</div>
										<div class="grid grid-cols-3 gap-y-4 py-4 lg:grid-cols-6 lg:gap-0">
											<div class="col-span-2 px-4 sm:px-6 lg:col-span-1 lg:py-4">
												<span
													class="inline-flex items-center px-2.5 py-1 text-xs font-medium text-green-900"
												>
													111
												</span>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-3 lg:py-4">
												<p class="text-sm font-bold text-gray-900">
													Blah bhalabvcgshbfsjb vvskhvbs v s vhksb vsjvs khbmvb sjkmbcs mhsb ,ns
													vszj
												</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Project</p>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-2 lg:py-4">
												<p class="text-sm font-bold text-gray-900">Status</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Expiry date</p>
											</div>
										</div>
										<div class="grid grid-cols-3 gap-y-4 py-4 lg:grid-cols-6 lg:gap-0">
											<div class="col-span-2 px-4 sm:px-6 lg:col-span-1 lg:py-4">
												<span
													class="inline-flex items-center px-2.5 py-1 text-xs font-medium text-green-900"
												>
													111
												</span>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-3 lg:py-4">
												<p class="text-sm font-bold text-gray-900">
													Blah bhalabvcgshbfsjb vvskhvbs v s vhksb vsjvs khbmvb sjkmbcs mhsb ,ns
													vszj
												</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Project</p>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-2 lg:py-4">
												<p class="text-sm font-bold text-gray-900">Status</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Expiry date</p>
											</div>
										</div>
										<div class="grid grid-cols-3 gap-y-4 py-4 lg:grid-cols-6 lg:gap-0">
											<div class="col-span-2 px-4 sm:px-6 lg:col-span-1 lg:py-4">
												<span
													class="inline-flex items-center px-2.5 py-1 text-xs font-medium text-green-900"
												>
													111
												</span>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-3 lg:py-4">
												<p class="text-sm font-bold text-gray-900">
													Blah bhalabvcgshbfsjb vvskhvbs v s vhksb vsjvs khbmvb sjkmbcs mhsb ,ns
													vszj
												</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Project</p>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-2 lg:py-4">
												<p class="text-sm font-bold text-gray-900">Status</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Expiry date</p>
											</div>
										</div>
										<div class="grid grid-cols-3 gap-y-4 py-4 lg:grid-cols-6 lg:gap-0">
											<div class="col-span-2 px-4 sm:px-6 lg:col-span-1 lg:py-4">
												<span
													class="inline-flex items-center px-2.5 py-1 text-xs font-medium text-green-900"
												>
													111
												</span>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-3 lg:py-4">
												<p class="text-sm font-bold text-gray-900">
													Blah bhalabvcgshbfsjb vvskhvbs v s vhksb vsjvs khbmvb sjkmbcs mhsb ,ns
													vszj
												</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Project</p>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-2 lg:py-4">
												<p class="text-sm font-bold text-gray-900">Status</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Expiry date</p>
											</div>
										</div>
										<div class="grid grid-cols-3 gap-y-4 py-4 lg:grid-cols-6 lg:gap-0">
											<div class="col-span-2 px-4 sm:px-6 lg:col-span-1 lg:py-4">
												<span
													class="inline-flex items-center px-2.5 py-1 text-xs font-medium text-green-900"
												>
													111
												</span>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-3 lg:py-4">
												<p class="text-sm font-bold text-gray-900">
													Blah bhalabvcgshbfsjb vvskhvbs v s vhksb vsjvs khbmvb sjkmbcs mhsb ,ns
													vszj
												</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Project</p>
											</div>

											<div class="px-4 sm:px-6 lg:col-span-2 lg:py-4">
												<p class="text-sm font-bold text-gray-900">Status</p>
												<p class="mt-1 text-sm font-medium text-gray-500">Expiry date</p>
											</div>
										</div>
									</div>
								</div>

								<div
									class="h-fit overflow-hidden rounded-xl border border-gray-200 bg-white lg:col-span-2"
								>
									<div class="px-4 py-5 sm:p-6">
										<div>
											<p class="text-base font-bold text-gray-900">Recent Customers</p>
											<p class="mt-1 text-sm font-medium text-gray-500">
												Lorem ipsum dolor sit ametis.
											</p>
										</div>

										<div class="mt-8 space-y-6">
											<div class="flex items-center justify-between space-x-5">
												<div class="flex min-w-0 flex-1 items-center">
													<img
														class="h-10 w-10 flex-shrink-0 rounded-full object-cover"
														src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male.png"
														alt=""
													/>
													<div class="ml-4 min-w-0 flex-1">
														<p class="text-sm font-bold text-gray-900">Jenny Wilson</p>
														<p class="mt-1 truncate text-sm font-medium text-gray-500">
															w.lawson@example.com
														</p>
													</div>
												</div>

												<div class="text-right">
													<p class="text-sm font-medium text-gray-900">$11,234</p>
													<p class="mt-1 truncate text-sm font-medium text-gray-500">Austin</p>
												</div>
											</div>

											<div class="flex items-center justify-between space-x-5">
												<div class="flex min-w-0 flex-1 items-center">
													<img
														class="h-10 w-10 flex-shrink-0 rounded-full object-cover"
														src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male-2.png"
														alt=""
													/>
													<div class="ml-4 min-w-0 flex-1">
														<p class="text-sm font-bold text-gray-900">Devon Lane</p>
														<p class="mt-1 truncate text-sm font-medium text-gray-500">
															dat.roberts@example.com
														</p>
													</div>
												</div>

												<div class="flex-shrink-0 text-right">
													<p class="text-sm font-medium text-gray-900">$11,159</p>
													<p class="mt-1 truncate text-sm font-medium text-gray-500">New York</p>
												</div>
											</div>

											<div class="flex items-center justify-between space-x-5">
												<div class="flex min-w-0 flex-1 items-center">
													<img
														class="h-10 w-10 flex-shrink-0 rounded-full object-cover"
														src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-female-2.png"
														alt=""
													/>
													<div class="ml-4 min-w-0 flex-1">
														<p class="text-sm font-bold text-gray-900">Jane Cooper</p>
														<p class="mt-1 truncate text-sm font-medium text-gray-500">
															jgraham@example.com
														</p>
													</div>
												</div>

												<div class="text-right">
													<p class="text-sm font-medium text-gray-900">$10,483</p>
													<p class="mt-1 text-sm font-medium text-gray-500">Toledo</p>
												</div>
											</div>

											<div class="flex items-center justify-between space-x-5">
												<div class="flex min-w-0 flex-1 items-center">
													<img
														class="h-10 w-10 flex-shrink-0 rounded-full object-cover"
														src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male-3.png"
														alt=""
													/>
													<div class="ml-4 min-w-0 flex-1">
														<p class="text-sm font-bold text-gray-900">Dianne Russell</p>
														<p class="mt-1 truncate text-sm font-medium text-gray-500">
															curtis.d@example.com
														</p>
													</div>
												</div>

												<div class="text-right">
													<p class="text-sm font-medium text-gray-900">$9,084</p>
													<p class="mt-1 text-sm font-medium text-gray-500">Naperville</p>
												</div>
											</div>
										</div>

										<div class="mt-8">
											<a
												href="/dashboard"
												title=""
												class="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-900"
											>
												See all Customers
												<svg
													class="ml-2 h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													stroke-width="2"
												>
													<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
												</svg>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
</div>
