<script>
	export let showCurrentModal;
	export let header = '';
	import { clickOutsideHandler } from '$lib/utils/clickOutside';
</script>

<div class="h-80 bg-opacity-10">
	<div
		on:keydown={(e) => {
			if (e.keyCode === 27) showCurrentModal = false;
		}}
	>
		<div class="fixed inset-0 z-10 bg-gray-500/50" />
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
			<div
				class="mx-auto overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-xl"
				use:clickOutsideHandler
				on:outsideClick={() => (showCurrentModal = false)}
			>
				<div class="relative p-6">
					<button
						on:click={() => {
							showCurrentModal = false;
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
					<h3 class="text-lg font-medium text-primary-900">{header}</h3>
				</div>

				<slot />
			</div>
		</div>
	</div>
</div>
