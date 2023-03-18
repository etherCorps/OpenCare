<script>
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { currentProject } from '$lib/client/stores';
	import { fetchHelper } from '$lib/utils/helpers';
	import toast from 'svelte-french-toast';

	let disabledUpdateProject = true;
	let formData;

	const deleteProject = async () => {
		const responseData = await fetchHelper('DELETE', '/projects', { id: $currentProject.id });
		if (responseData.success) {
			toast.success(`Successfully deleted ${responseData.info.name} project.`);
			await invalidateAll();
			await goto('/projects');
		}
		if (!responseData.success) toast.error(responseData.message ?? 'Error');
	};
	$: if (formData?.success) {
		toast.success('Project updated successfully');
	}
	$: if (formData && !formData?.success) {
		console.log(formData);
		toast.error(formData?.message);
	}

	const updateProjectEnhancer = ({ form }) => {
		disabledUpdateProject = true;
		return async ({ result, update }) => {
			formData = result.data;
			disabledUpdateProject = false;
			if (result?.data?.success) {
				disabledUpdateProject = true;
				// await update();
				await invalidateAll();
			}
		};
	};
</script>

<section class="space-y-4">
	<div>
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Project Details</h3>
					<p class="mt-1 text-sm text-gray-600">
						This information is editable and belongs to this project. Make sure to save changes.
					</p>
				</div>
			</div>
			<div class="mt-5 md:col-span-2 md:mt-0">
				<form method="POST" use:enhance={updateProjectEnhancer}>
					<div class="shadow sm:overflow-hidden sm:rounded-md">
						<input type="hidden" name="projectId" value={$currentProject.id} />
						<div class="space-y-6 px-4 py-5 sm:p-6">
							<div class="grid grid-cols-3 gap-6">
								<div class="col-span-3 sm:col-span-2">
									<label for="projectName" class="block text-sm font-medium text-gray-700"
										>Project Name</label
									>
									<div class="mt-1 flex rounded-md shadow-sm">
										<input
											value={formData?.data?.name ?? $currentProject.name}
											on:input={() => {
												disabledUpdateProject = false;
											}}
											type="text"
											name="projectName"
											id="projectName"
											class="block w-full flex-1 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
											placeholder="www.example.com"
										/>
									</div>
								</div>
							</div>

							<div>
								<label for="projectDescription" class="block text-sm font-medium text-gray-700"
									>Project Description</label
								>
								<div class="mt-1">
									<textarea
										value={formData?.data?.description ?? $currentProject.description}
										on:input={() => {
											disabledUpdateProject = false;
										}}
										id="projectDescription"
										name="projectDescription"
										rows="3"
										class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
										placeholder="Hello it's a description"
									/>
								</div>
							</div>
						</div>
						<div class="px-4 py-3 text-right sm:px-6">
							<button
								disabled={disabledUpdateProject}
								formaction="/projects?/updateProject"
								type="submit"
								class="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-primary-300"
								>Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="space-y-4 rounded-xl border border-danger-200 px-4 py-2 shadow">
		<div class="mx-auto flex flex-row items-center justify-between">
			<div>
				<h3 class="text-xl font-semibold text-danger-600">Danger Zone</h3>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 ">
			<button
				type="button"
				class="rounded-lg border border-danger-300 px-4 py-2 text-center text-sm font-medium text-danger-700 shadow-sm transition-all hover:bg-danger-100 focus:ring focus:ring-danger-100 disabled:cursor-not-allowed disabled:border-danger-100 disabled:bg-danger-50 disabled:text-danger-400"
				>Delete All Tickets of {$currentProject.name}
			</button>
			<button
				on:click={deleteProject}
				type="button"
				class="rounded-lg border border-danger-500 bg-danger-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-danger-700 hover:bg-danger-700 focus:ring focus:ring-danger-200 disabled:cursor-not-allowed disabled:border-danger-300 disabled:bg-danger-300"
				>Delete {$currentProject.name} Project
			</button>
		</div>
	</div>
</section>
