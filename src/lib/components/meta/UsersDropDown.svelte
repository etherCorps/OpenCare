<script>
	import { page } from '$app/stores';
	import { allUsers } from '$lib/client/stores';
	import { clickOutsideHandler } from '$lib/utils/clickOutside';

	let showUserList = false;
	export let selectedNewUser = {
		userId: null,
		userType: 'Member',
		projectId: $page.params.slug,
		userDetails: null
	};
	export let allUserLists = $allUsers;
</script>

<div
	class=""
	use:clickOutsideHandler={'userListBtn'}
	on:outsideClick={() => {
		showUserList = false;
	}}
>
	<label id="listbox-label" class="block text-sm font-medium text-gray-700">Select User</label>
	<div class="relative mt-1">
		<button
			on:click={() => {
				showUserList = !showUserList;
			}}
			type="button"
			class="userListBtn relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
		>
			<span class="flex items-center">
				<img
					src={selectedNewUser.userDetails?.profileIcon ??
						'https://api.dicebear.com/5.x/bottts/png'}
					alt=""
					class="h-6 w-6 flex-shrink-0 rounded-full"
				/>
				<span class="ml-3 block truncate">{selectedNewUser.userDetails?.name ?? 'Users'}</span>
			</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
				<!-- Heroicon name: mini/chevron-up-down -->
				<svg
					class="h-5 w-5 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</button>
		<ul
			class="absolute z-10 mt-1 transition duration-300 {showUserList
				? 'opacity-100 ease-in'
				: 'opacity-0 ease-out'} max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
		>
			{#if allUserLists.length > 0}
				{#each allUserLists as wannaBeMember}
					<li
						on:click={() => {
							selectedNewUser.userId = wannaBeMember.id;
							selectedNewUser.userDetails = wannaBeMember;
							showUserList = false;
						}}
						class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
						id="listbox-option-0"
						role="option"
					>
						<div class="flex items-center">
							<img
								src={wannaBeMember.profileIcon}
								alt=""
								class="h-6 w-6 flex-shrink-0 rounded-full"
							/>
							<span
								class="ml-3 block truncate font-normal {wannaBeMember.id === selectedNewUser?.userId
									? 'font-semibold'
									: 'font-normal'}">{wannaBeMember.name}</span
							>
						</div>
						<span
							class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600 hover:text-white {wannaBeMember.id ===
							selectedNewUser?.userId
								? ''
								: 'hidden'}"
						>
							<svg
								class="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
					</li>
				{/each}
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
					<div><b>No users</b> All available members are in this project</div>
				</div>
			{/if}
		</ul>
	</div>
</div>
