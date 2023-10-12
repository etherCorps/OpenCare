<script>
	import { goto } from '$app/navigation';
	import TabGroup from '$lib/components/TabGroup.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import { writable } from 'svelte/store';
	import { userProjects, currentProject } from '$lib/client/stores';
	import { page } from '$app/stores';
	import Tickets from './tickets/Tickets.svelte';
	import Documents from './docs/Documents.svelte';
	import Members from './members/Members.svelte';
	import ProjectSettings from './settings/Settings.svelte';

	const projectTab = writable('ticket');
	export let data;

	const memberShipData = $userProjects.find((project) => (project.projectId = $page.params.slug));
	let adminPermission = false;
	if (memberShipData) {
		adminPermission = memberShipData.userType === 'Admin';
		currentProject.set(data.currentProject);
	}
</script>

{#if data.currentProject}
	<div class="space-y-4 p-4 overflow-x-auto">
		<TabGroup
			selected={projectTab}
			justify="justify-start md:justify-center"
			borderColor="border-primary-500"
			fill="fill-primary-500"
			color="text-primary-500"
			hover="hover:bg-primary-500/10"
		>
			<Tab value="ticket">Tickets</Tab>
			<Tab value="docs">Documentation</Tab>
			<Tab value="members">Members</Tab>
			{#if adminPermission}
				<Tab value="settings">Project Settings</Tab>
			{/if}
		</TabGroup>
		<div class="border-t border-primary-300 rounded-lg px-5 py-3">
			{#if $projectTab === 'ticket'}
				<Tickets members={data.projectMembers} adminPermissions={adminPermission}/>
			{/if}
			{#if $projectTab === 'docs'}
				<Documents />
			{/if}
			{#if $projectTab === 'members'}
				<Members members={data.projectMembers} adminPermissions={adminPermission} />
			{/if}
			{#if $projectTab === 'settings' && adminPermission}
				<ProjectSettings />
			{/if}
		</div>
	</div>
{:else}
	<div class="mt-10 flex rounded-md bg-info-100 p-4 text-sm text-info-500">
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
		<div>
			<h4 class="font-bold">No project found</h4>
			<div class="mt-1">
				<p>Please ask your admin to add you in project or project doesn't exist.</p>
			</div>
		</div>
		<button
			on:click={async () => {
				await goto('/projects');
			}}
			class="text-md ml-auto flex items-center gap-3 rounded bg-info-300 px-2 py-1 font-semibold text-info-700 transition duration-300 ease-in-out hover:bg-info-900 hover:text-info-50"
		>
			Go to Projects
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
				/>
			</svg>
		</button>
	</div>
{/if}
