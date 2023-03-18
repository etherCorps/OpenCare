<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { fade } from 'svelte/transition';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { clickOutsideHandler } from '$lib/utils/clickOutside';

	export let showAddNewProject;
	let formData;
	let disableForm = false;
	let showConfirmation = false;
	$: if (formData?.success) {
		showConfirmation = true;
		toast.success('Project Created Successfully');
	}
	const createProjectEnhancer = ({ form }) => {
		disableForm = true;
		return async ({ result, update }) => {
			formData = result.data;
			disableForm = false;
			if (result?.data?.success) {
				form.reset();
				await update();
				await invalidateAll();
				await goto('/projects');
			}
		};
	};
</script>

<div class="h-80 bg-opacity-10">
	<div
		on:keydown={(e) => {
			if (e.keyCode === 27) showAddNewProject = false;
		}}
	>
		<div class="fixed inset-0 z-10 bg-gray-500/50" />
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
			<div
				class="mx-auto overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-xl"
				use:clickOutsideHandler
				on:outsideClick={() => (showAddNewProject = false)}
			>
				<div class="relative p-6">
					<button
						on:click={() => {
							showAddNewProject = false;
						}}
						type="button"
						class="absolute top-4 right-4 rounded-lg p-1 text-center font-medium text-primary-500 transition-all hover:bg-primary-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-6 w-6"
						>
							<path
								d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
							/>
						</svg>
					</button>
					<h3 class="text-lg font-medium text-primary-900">Add New Project</h3>
				</div>
				<form method="post" use:enhance={createProjectEnhancer}>
					<div class="space-y-5 px-6">
						{#if showConfirmation}
							<div transition:fade class="flex rounded-md bg-green-50 p-4 text-sm text-green-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="mr-3 h-5 w-5 flex-shrink-0"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
										clip-rule="evenodd"
									/>
								</svg>
								<div><b>Project successfully created</b> Name: {formData?.name}</div>
								<button
									type="button"
									class="ml-auto"
									on:click={() => {
										showConfirmation = false;
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-5 w-5"
									>
										<path
											d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
										/>
									</svg>
								</button>
							</div>
						{/if}
						<div>
							<label
								for="p-name"
								class="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
								>Project Name</label
							>
							<input
								type="text"
								id="p-name"
								name="projectName"
								value={formData?.data?.projectName ?? ''}
								class="block w-full rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
						{formData?.errors?.projectName
									? 'border-red-300 focus:border-red-300 focus:ring-red-200 focus:ring-opacity-50'
									: 'border-primary-300 focus:border-primary-600 focus:ring-primary-600'}
						"
								placeholder="EtherCare"
							/>
							{#if formData?.errors?.projectName}
								{#each formData.errors.projectName as message}
									<p class="mt-1 text-sm text-red-500">{message}</p>
								{/each}
							{/if}
						</div>
						<div>
							<label
								for="p-desc"
								class="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
								>Description</label
							>
							<textarea
								value={formData?.data?.projectDescription ?? ''}
								name="projectDescription"
								id="p-desc"
								class="block w-full rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
						 {formData?.errors?.projectDescription
									? 'border-red-300 focus:border-red-300 focus:ring-red-200 focus:ring-opacity-50'
									: 'border-primary-300 focus:border-primary-600 focus:ring-primary-600'}"
								rows="3"
								placeholder="Enter a description..."
							/>
							{#if formData?.errors?.projectDescription}
								{#each formData.errors.projectDescription as message}
									<p class="mt-1 text-sm text-red-500">{message}</p>
								{/each}
							{/if}
						</div>
					</div>

					<div class="mt-5 flex justify-end gap-3 bg-primary-50 py-3 px-6">
						<button
							on:click={() => {
								showAddNewProject = false;
							}}
							type="button"
							class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
							>Cancel</button
						>
						<button
							disabled={disableForm}
							formaction="/projects?/createProject"
							type="submit"
							class="rounded-lg border border-primary-500 bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
							>Create Project</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
