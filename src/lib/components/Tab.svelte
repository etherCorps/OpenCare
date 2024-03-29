<script lang="ts">
	// Slots
	/**
	 * @slot lead - Provides a leading position, which can be used for icons.
	 */

	import type { Writable } from 'svelte/store';
	import { createEventDispatcher, getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Event Handler
	const dispatch = createEventDispatcher();

	// Context
	export let selected: Writable<any> = getContext('selected');
	export let borderWidth: string = getContext('borderWidth');
	export let borderColor: string = getContext('borderColor');
	export let color: string = getContext('color');
	export let fill: string = getContext('fill');
	export let hover: string = getContext('hover');
	export let rounded: string = getContext('rounded');

	// Props
	/**
	 * The value of each tab.
	 * @type {any}
	 */
	export let value: any = $selected.value;

	// A11y
	/** Defines a semantic label for the tab. */
	export let label = 'tab';

	// Base Classes
	const cBase = 'font-bold list-none py-2.5 px-4 flex items-center space-x-2 cursor-pointer';
	const cBorderColor = 'border-transparent';
	const cBaseLabel = 'font-medium whitespace-nowrap transition-all duration-500';

	// A11y Input Handlers
	function onClickHandler(value: any): void {
		/** @event {{ value }} click - Fires on tab click event.  */
		dispatch('click', value);
		// Update Selected
		selected.set(value);
	}
	function onKeyDown(event: any): void {
		/** @event {{ event }} keydown - Fires on tab keydown event.  */
		dispatch('keydown', event);
		// Enter/Space to toggle element
		if (['Enter', 'Space'].includes(event.code)) {
			event.preventDefault();
			event.target.click();
		}
	}

	// Reactive Classes
	$: isSelected = value == $selected;
	$: classesSelected = isSelected
		? `${borderWidth} ${borderColor} ${color} ${fill} bg-primary-200`
		: `${borderWidth} ${cBorderColor}`;
	$: classesBase = `${cBase} ${classesSelected} ${hover} ${rounded} ${$$props.class ?? ''}`;
	$: classesLead = isSelected ? `${fill}` : 'fill-token';
	$: classesLabel = `${cBaseLabel}`;
</script>

<li
	class="tab ${classesBase} border border-primary-300 px-4 py-2 rounded-full py-2.5 px-4 rounded-lg duration-150 hover:text-primary-500 hover:bg-white active:bg-white/50 font-medium bg-white text-primary-500 shadow-sm"
	on:click={() => {
		onClickHandler(value);
	}}
	on:keydown={onKeyDown}
	on:keyup
	on:keypress
	role="tab"
	tabindex="0"
	data-testid="tab"
>
	<!-- Slot: Lead -->
	{#if $$slots.lead}<div class="tab-lead {classesLead}"><slot name="lead" /></div>{/if}
	<!-- Slot: Default -->
	{#if $$slots.default}<div
			class="tab-label transition duration-300 ease-in-out {classesLabel}"
			aria-label={label}
		>
			<slot />
		</div>{/if}
</li>
