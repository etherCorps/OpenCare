/** Dispatch event on click outside of node */
export function clickOutsideHandler(node: any, excludeElementClass?: string) {
	const isExcludedElementsContainTheEventTarget = (eventTarget: any) => {
		/** @type {boolean} */
		let status = false;
		if (excludeElementClass) {
			const elements = document.getElementsByClassName(excludeElementClass);
			for (const element of elements) {
				if (element.contains(eventTarget)) {
					status = true;
					break;
				}
			}
		}
		return status;
	};

	const handleClick = (event: any) => {
		if (
			node &&
			!node.contains(event.target) &&
			!event.defaultPrevented &&
			!isExcludedElementsContainTheEventTarget(event.target)
		) {
			node.dispatchEvent(new CustomEvent('outsideClick', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
