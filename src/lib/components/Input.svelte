<script lang="ts">
	import { string } from 'zod';

	export let type: string = '',
		name: string = '',
		placeholder: string = '',
		label: string = '',
		disabled: boolean = false,
		required: boolean = true,
		value: string = '';

	export let error: [string];
</script>

<div class="mx-auto max-w-md">
	<label
		for={name}
		class="mb-1 block text-sm font-medium text-primary-700 {required
			? 'after:ml-0.5 after:text-red-500 after:content-[`*`]'
			: ''}">{label}</label
	>
	<input
		{type}
		id={name}
		{name}
		{disabled}
		{value}
		class="block w-full rounded-lg px-4 py-3 placeholder-primary-500 caret-primary-600 shadow-sm disabled:cursor-not-allowed disabled:bg-primary-50 disabled:text-primary-500 {error
			? 'border-red-300 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50'
			: 'border-primary-300 focus:border-primary-600 focus:ring-primary-600'}"
		{placeholder}
	/>
	{#if error}
		{#each error as message}
			<p class="mt-1 text-sm text-red-500">{message}</p>
		{/each}
	{/if}
</div>

<!--<div>-->
<!--	<label for={name} class="text-sm font-bold text-primary-900"> {label} </label>-->
<!--	<div class="mt-2">-->
<!--		<input-->
<!--			{type}-->
<!--			{name}-->
<!--			id={name}-->
<!--			{placeholder}-->
<!--			value=""-->
<!--			class="block w-full rounded-lg border border-primary-300 px-4 py-3 placeholder-primary-500 caret-primary-600 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"-->
<!--		/>-->
<!--	</div>-->
<!--</div>-->
