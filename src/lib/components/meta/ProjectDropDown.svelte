<script>
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { clickOutsideHandler } from '$lib/utils/clickOutside';
	import { userProjects, currentProject } from '$lib/client/stores';

	export let openDropDown = false;
</script>

<div class="relative">
	<button
		on:click={() => {
			openDropDown = !openDropDown;
		}}
		type="button"
		class="DropDownBtn flex w-full items-center justify-between rounded-lg border border-primary-300 bg-primary-50 px-4 py-2 text-center text-sm font-medium text-primary-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-primary-100 disabled:cursor-not-allowed disabled:border-primary-100 disabled:bg-gray-50 disabled:text-primary-400"
	>
		<span>Projects</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 text-gray-400"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	{#if openDropDown}
		<div
			transition:slide
			use:clickOutsideHandler={'DropDownBtn'}
			on:outsideClick={() => (openDropDown = false)}
			class="absolute left-0 z-10 mt-2 min-h-min w-full overflow-y-auto rounded-lg border border-primary-100 bg-primary-50 text-left text-sm text-primary-700 shadow-lg {openDropDown
				? ''
				: 'hidden'}"
		>
			<div class="p-1">
				{#if $userProjects.length > 0}
					{#each $userProjects as projectDetails}
						<button
							type="button"
							on:click={async () => {
								currentProject.set(projectDetails.project);
								await goto(`/projects/${projectDetails.project.id}`);
							}}
							class="flex w-full items-center rounded-md px-2 py-2 font-medium hover:bg-primary-100"
						>
							{projectDetails.project.name}
						</button>
					{/each}
				{:else}
					<div class="flex rounded-md bg-info-50 p-4 text-sm text-info-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="mr-3 h-5 w-5 flex-shrink-0"
						>
							<path
								fill-rule="evenodd"
								d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/>
						</svg>
						<div><b>Info alert</b> No project found</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
