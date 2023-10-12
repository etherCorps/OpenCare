<script lang="ts">
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { invalidateAll } from '$app/navigation';
	import { allUsers, currentProject } from '$lib/client/stores';
	import { slide, fade } from 'svelte/transition';
	import UsersDropDown from '$lib/components/meta/UsersDropDown.svelte';
	import { fetchHelper } from '$lib/utils/helpers';
	import Modal from '$lib/components/Modal.svelte';

	export let members;
	export let adminPermissions = false;
	let allowCellEditingSettings = {};
	$: selectedPermissions = {};

	$: newMemberList = $allUsers.filter(
		(user) => !members.map((member) => member.user.id).includes(user.id)
	);
	let showAdduserPanel = false;
	let showAddNewMember = false;
	let selectedNewUser = {
		userId: null,
		userType: 'Member',
		projectId: $page.params.slug,
		userDetails: null
	};
	let selectedItem;
	let openDeleteMemberModal = false;
	let currentDeleteMemberInfo = {
		id: null,
		user: null
	};
	const updateMemberRoleInProject = async (memberId: string) => {
		if (!Object.hasOwn( selectedPermissions, memberId )) {
			return toast.error('Please update user permission then submit');
		}
		const responseData = await fetchHelper(
			'PATCH',
			`${$page.url.pathname}/members`,
			selectedPermissions[memberId]
		);
		if (responseData.success)
			toast.success(
				`${responseData.info.user.name}'s role has been as ${responseData.info.userType} in project ${responseData.info.project.name}`
			);
		if (!responseData.success) toast.error(responseData.message);

		delete selectedPermissions[memberId];
		allowCellEditingSettings[memberId] = false;
		await invalidateAll();
		// return await invalidateAll();
	};

	const addNewMember = async () => {
		if (!selectedNewUser.userId) {
			return toast.error('Please select a member');
		}
		const responseData = await fetchHelper('POST', `${$page.url.pathname}/members`, {
			userType: selectedNewUser.userType,
			userId: selectedNewUser.userId,
			projectId: selectedNewUser.projectId
		});
		if (responseData.success)
			toast.success(
				`${responseData.info.user.name} is added in project ${responseData.info.project.name} as ${responseData.info.userType}.`
			);
		if (!responseData.success) toast.error(responseData.message);
		selectedNewUser.userId = null;
		selectedNewUser.userDetails = null;
		await invalidateAll();
		// return await invalidateAll();
	};

	const deleteMember = async () => {
		if (!currentDeleteMemberInfo.id) {
			return toast.error('Please check if you selected right member.');
		}
		const responseData = await fetchHelper('DELETE', `${$page.url.pathname}/members`, {
			id: currentDeleteMemberInfo.id
		});
		if (responseData.success)
			toast.success(
				`${responseData.info.user.name}'s role has been removed as ${responseData.info.userType} in project ${responseData.info.project.name}`
			);
		if (!responseData.success) toast.error(responseData.message);

		currentDeleteMemberInfo.id = null;
		currentDeleteMemberInfo.user = null;
		openDeleteMemberModal = false;
		await invalidateAll();
	};
</script>

<div class="space-y-4">
	<div class="mx-auto flex flex-row items-center justify-between">
		<div>
			<h3 class="text-xl font-semibold text-primary-600">{$currentProject.name} Members</h3>
		</div>
		<div>
			{#if adminPermissions}
				<button
					on:click={() => {
						showAddNewMember = !showAddNewMember;
					}}
					type="button"
					class="hover:bg-secondary {showAddNewMember
						? 'bg-warning-600 text-warning-100'
						: 'bg-primary-600 text-primary-100'} focus:bg-secondary inline-flex w-full items-center justify-center rounded-lg border px-4 py-3 text-sm  font-semibold leading-5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
				>
					{showAddNewMember ? 'Close Add Member' : 'Add Member'}
				</button>
			{/if}
		</div>
	</div>
	{#if showAddNewMember}
		<div transition:slide class="mb-3 space-y-5 rounded-lg border shadow-md">
			<div
				class="grid-col-1 grid items-center justify-center gap-6 py-2 px-4 md:grid-cols-2 lg:grid-cols-3"
			>
				<UsersDropDown allUserLists={newMemberList} bind:selectedNewUser />
				<div class="mx-auto">
					<label id="listbox-label2" class="block text-sm font-medium text-gray-700"
						>Select User Type</label
					>
					<select
						name="userPermission"
						bind:value={selectedNewUser.userType}
						id="userPermission"
						class="mt-1 rounded"
					>
						<option value="Admin">Admin</option>
						<option value="Member">Member</option>
						<option value="Client">Client</option>
					</select>
				</div>
				<div>
					<button
						on:click={addNewMember}
						type="button"
						class="mt-1 inline-flex w-full items-center justify-center rounded-lg border bg-primary-600 px-2 py-3 text-sm font-semibold leading-5 text-primary-300 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
					>
						Add New Member
					</button>
				</div>
			</div>
		</div>
	{/if}
	<div class="rounded-lg border border-primary-200 shadow-md">
		<table
			class="w-full table-auto border-collapse text-left text-sm text-primary-500 transition-all duration-500"
		>
			<thead class="bg-primary-200">
				<tr>
					<th scope="col" class="px-6 py-4 font-medium text-primary-900">Name</th>
					<th scope="col" class="px-6 py-4 font-medium text-primary-900">State</th>
					<th scope="col" class="px-6 py-4 font-medium text-primary-900">Role</th>
					{#if adminPermissions}
						<th scope="col" class="px-6 py-4 text-right font-medium text-primary-900">Actions</th>
					{/if}
				</tr>
			</thead>
			<tbody class="divide-y divide-primary-100 border-t border-primary-100">
				{#each members as member, index}
					<tr class="hover:bg-primary-100">
						<th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
							<div class="relative h-10 w-10">
								<img
									class="h-full w-full rounded-full object-cover object-center"
									src={member.user.profileIcon}
									alt="{member.user.name} Icon"
								/>
								<span
									class="absolute right-0 bottom-0 h-2 w-2 rounded-full {member.user.active
										? 'bg-green-600'
										: 'bg-danger-600'} ring ring-white"
								/>
							</div>
							<div class="text-sm">
								<div class="font-medium text-primary-700">{member.user.name}</div>
								<div class="text-primary-400">{member.user.email}</div>
							</div>
						</th>
						<td class="px-6 py-4">
							{#if member.user.active}
								<span
									class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-green-600" />
									Active
								</span>
							{:else}
								<span
									class="inline-flex items-center gap-1 rounded-full bg-danger-50 px-2 py-1 text-xs font-semibold text-danger-600"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-danger-600" />
									Inactive
								</span>
							{/if}
						</td>
						<td class="px-6 py-4">
							{#if allowCellEditingSettings?.[member.id]}
								<select
									name="permissions"
									value={selectedPermissions?.[member.id]?.userType ?? member.userType}
									id="permissions"
									class="rounded-full"
									on:change={(e) =>
										(selectedPermissions[member.id] = { id: member.id, userType: e.target.value })}
								>
									<option value="Admin">Admin</option>
									<option value="Member">Member</option>
									<option value="Client">Client</option>
								</select>
							{:else}
								{selectedPermissions?.[member.id]?.userType ?? member.userType}
							{/if}
						</td>
						{#if adminPermissions}
							{#if allowCellEditingSettings?.[member.id]}
								<td class="px-6 py-4">
									<div class="flex justify-end gap-4">
										<button
											type="button"
											name="updateData"
											on:click={updateMemberRoleInProject(member.id)}
										>
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
													d="M4.5 12.75l6 6 9-13.5"
												/>
											</svg>
										</button>
										<button
											name="clearData"
											on:click={() => {
												allowCellEditingSettings[member.id] = false;
												delete selectedPermissions[member.id];
											}}
										>
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
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</td>
							{:else}
								<td class="px-6 py-4">
									<div class="flex justify-end gap-4">
										<button
											name="deleteData"
											on:click={() => {
												currentDeleteMemberInfo.id = member.id;
												currentDeleteMemberInfo.user = member.user;
												openDeleteMemberModal = true;
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-6 w-6"
												x-tooltip="tooltip"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
										</button>
										<button
											name="allowEditing"
											on:click={() => {
												allowCellEditingSettings[member.id] = true;
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="h-6 w-6"
												x-tooltip="tooltip"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
												/>
											</svg>
										</button>
									</div>
								</td>
							{/if}
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

{#if openDeleteMemberModal}
	<div transition:fade>
		<Modal header="Delete Member" bind:showCurrentModal={openDeleteMemberModal}>
			<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
				<div class="mx-auto overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-xl">
					<div class="relative p-6">
						<div class="flex gap-4">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-danger-100 text-danger-500"
							>
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
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</div>
							<div class="flex-1">
								<h3 class="text-secondary-900 text-lg font-medium">
									Remove {currentDeleteMemberInfo.user?.name} from {$currentProject.name}
								</h3>
								<div class="text-secondary-500 mt-2 text-sm">
									Are you sure you want to remove {currentDeleteMemberInfo.user?.name}?
								</div>
							</div>
						</div>
						<div class="mt-6 flex justify-end gap-3">
							<button
								type="button"
								on:click={() => {
									openDeleteMemberModal = false;
								}}
								class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
								>Cancel
							</button>
							<button
								type="button"
								on:click={deleteMember}
								class="rounded-lg border border-danger-500 bg-danger-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-danger-700 hover:bg-danger-700 focus:ring focus:ring-danger-200 disabled:cursor-not-allowed disabled:border-danger-300 disabled:bg-danger-300"
								>Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	</div>
{/if}
