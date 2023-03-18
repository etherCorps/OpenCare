<script>
	let showUserList = false;
	export let label = 'Dropdown';
	export let dropDownItems = [];
	export let selectedItem;
</script>

<div className="mb-5">
	{#if label}
		<label id="listbox-label" className="block text-sm font-medium text-gray-700">DropDown</label>
	{/if}
	<div className="relative mt-1">
		<button
			on:click={() => {
				showUserList = !showUserList;
			}}
			type="button"
			className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
		>
			<span className="ml-3 block truncate">{selectedItem ?? 'Options'}</span>
			<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
				<svg
					className="h-5 w-5 text-gray-400"
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
			className="absolute z-10 mt-1 transition duration-300 {showUserList
				? 'opacity-100 ease-in'
				: 'opacity-0 ease-out'} max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
			tabIndex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
		>
			<!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
			{#if dropDownItems.length > 0}
				{#each dropDownItems as item}
					<li
						on:click={() => {
							selectedItem = item;
						}}
						className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-primary-600 hover:text-white"
						id="listbox-option-0"
						role="option"
					>
						<div className="flex items-center">
							<span
								className="ml-3 block truncate font-normal {item === selectedItem
									? 'font-semibold'
									: 'font-normal'}">{item}</span
							>
						</div>
						<span
							className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600 hover:text-white {item ===
							selectedItem
								? ''
								: 'hidden'}"
						>
							<svg
								className="h-5 w-5"
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
			{/if}
		</ul>
	</div>
</div>
