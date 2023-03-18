<script lang="ts">
	import { userProjects } from '$lib/client/stores';
	import type { PageServerData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: PageServerData;
	userProjects.set(data.projects);
</script>

<section id="projects" class="mt-5">
	{#if $userProjects.length > 0}
		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
			{#each $userProjects as project}
				<a href="/projects/{project?.id ?? project?.project?.id}">
					<div class="max-w-md rounded-lg bg-white p-4 shadow">
						<h3 class="text-xl font-medium text-gray-900">
							{project.name ?? project?.project?.name}
						</h3>
						<p class="mt-1 text-gray-500">{project.description ?? project?.project?.description}</p>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div class="flex rounded-md bg-primary-50 p-4 text-sm text-primary-500">
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
</section>
