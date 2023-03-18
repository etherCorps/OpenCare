<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { appName, logoURL } from '$lib/client/constants';
	import { loginBroadcast } from '$lib/client/broadcaster';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	export let form: ActionData;
	$: if (form && form.message)
		toast.error(form.message, {
			duration: 1500,
			style: 'border-radius: 200px; background: #333; color: #fff;'
		});
	if (browser) {
		loginBroadcast.onmessage = ({ data }) => {
			if (data === 'loggedIn') {
				let defaultRedirect = '/dashboard';
				if ($page.url.search.startsWith('?next')) {
					defaultRedirect = $page.url.searchParams.get('next') as string;
				}
				goto(defaultRedirect);
			}
		};
	}
</script>

<svelte:head>
	<title>{appName} - LogIn ➦</title>
</svelte:head>

<section class="py-12 sm:py-16 lg:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-sm">
			<div class="text-center">
				<img class="mx-auto h-12 w-auto" src={logoURL} alt="Company Logo" />
				<h1 class="mt-12 text-3xl font-bold text-primary-900">Sign In</h1>
				<p class="mt-4 text-sm font-medium text-primary-500">Begin your work</p>
			</div>

			<form method="POST" class="mt-4" use:enhance>
				<div class="space-y-4">
					<Input
						value={form?.data?.email ?? ''}
						name="email"
						type="email"
						placeholder="Type email address here"
						label="Email"
						error={form && form.errors && form.errors.email}
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
							Login
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</section>
