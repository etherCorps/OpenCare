<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';
	import { logoURL, appName } from '$lib/client/constants';
	import { enhance } from '$app/forms';

	export let form: ActionData;
	$: if (form && form.message)
		toast.error(form.message, {
			duration: 1500,
			style: 'border-radius: 200px; background: #333; color: #fff;'
		});
</script>

<svelte:head>
	<title>{appName} - Create Admin 🎟️</title>
</svelte:head>
<section class="py-12 sm:py-16 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-sm">
			<div class="text-center">
				<img class="mx-auto h-12 w-auto" src={logoURL} alt="Company Logo" />
				<h1 class="mt-12 text-3xl font-bold text-primary-900">Create super admin</h1>
				<p class="mt-4 text-sm font-medium text-primary-500">
					This user going to have all the permissions for the management.
				</p>
			</div>

			<form method="POST" class="mt-4" use:enhance>
				<div class="space-y-4">
					<Input
						value={form?.data?.name ?? ''}
						name="name"
						type="text"
						placeholder="Type your name here"
						label="Full Name"
						error={form && form.errors && form.errors.name}
					/>
					<Input
						value={form?.data?.email ?? ''}
						name="email"
						type="email"
						placeholder="Type email address here"
						label="Email"
						error={form && form.errors && form.errors.email}
					/>
					<Input
						value={form?.data?.phone ?? ''}
						name="phone"
						type="tel"
						placeholder="Type your contact here"
						label="Contact Number"
						error={form && form.errors && form.errors.phone}
					/>
					<Input
						name="password"
						type="password"
						placeholder="Type strong password here"
						label="Password"
						error={form && form.errors && form.errors.password}
					/>

					<div>
						<button
							type="submit"
							class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
						>
							Create Super Admin
						</button>
					</div>
				</div>
			</form>

			<div class="mt-6 text-center">
				<p class="text-sm font-medium text-primary-900">
					Already have an account? <a href="/login" title="" class="font-bold hover:underline">
						Login now
					</a>
				</p>
			</div>
		</div>
	</div>
</section>
