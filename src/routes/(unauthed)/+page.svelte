<script>
	import { appName } from '$lib/client/constants';
</script>

<section class="pt-12 sm:pt-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-5xl text-center">
			<h1 class="font-inter px-6 text-lg text-primary-600">
				Effortlessly manage your projects, from start to finish.
			</h1>
			<p
				class=" mt-5 text-4xl font-bold leading-tight text-primary-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight"
			>
				<span class="relative inline-flex sm:inline">
					<span
						class="absolute inset-0 h-full w-full bg-gradient-to-r from-primary-500 via-primary-700 to-primary-900 opacity-30 blur-lg filter"
					/>
					<span class="relative">One for All </span>
				</span>
				<br />
				Streamline project management
				<br />
				and collaboration
			</p>

			<div class="mt-9 px-8 sm:flex sm:items-center sm:justify-center sm:space-x-5 sm:px-0">
				<a
					href="/static"
					title=""
					class=" inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent bg-primary-900 px-8 py-3 text-lg font-bold text-white transition-all duration-200 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 sm:w-auto"
					role="button"
				>
					Connect to care
				</a>

				<a
					href="/static"
					title=""
					class=" mt-4 inline-flex w-full items-center justify-center rounded-xl border-2 border-primary-900 px-6 py-3 text-lg font-bold text-primary-900 transition-all duration-200 hover:border-primary-900 hover:bg-primary-900 hover:text-white focus:border-primary-900 focus:bg-primary-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 sm:mt-0 sm:w-auto"
					role="button"
				>
					<svg
						class="mr-2 h-5 w-5"
						viewBox="0 0 18 18"
						fill="none"
						stroke="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.18003 13.4261C6.8586 14.3918 5 13.448 5 11.8113V5.43865C5 3.80198 6.8586 2.85821 8.18003 3.82387L12.5403 7.01022C13.6336 7.80916 13.6336 9.44084 12.5403 10.2398L8.18003 13.4261Z"
							stroke-width="2"
							stroke-miterlimit="10"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					Watch demo
				</a>
			</div>
		</div>
	</div>

	<div class="pb-12">
		<div class="relative">
			<div class="absolute inset-0 h-2/3 " />
			<div class="relative mx-auto">
				<div class="p-7 drop-shadow-lg md:m-20 xl:m-10 xl:mx-auto xl:max-w-6xl	">
					<img class="scale-110 transform rounded-xl" src="dashboard.jpeg" alt="" />
				</div>
			</div>
		</div>
	</div>
</section>

<svelte:head>
	<title>{appName} - Home 🏚️</title>
</svelte:head>
