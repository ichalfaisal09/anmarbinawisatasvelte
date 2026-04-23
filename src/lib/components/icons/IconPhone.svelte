<script lang="ts">
	let { size = 22, class: className = '' }: { size?: number; class?: string } = $props();
</script>

<svg
	class={className || undefined}
	viewBox="0 0 24 24"
	width={size}
	height={size}
	fill="none"
	stroke="currentColor"
	stroke-width="1.75"
	aria-hidden="true"
>
	<path
		d="M6.5 4.5h3l1.5 4.5-2 1.2a8.1 8.1 0 0 0 3.8 3.8l1.2-2 4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A17 17 0 0 1 3 6.1 1.5 1.5 0 0 1 4.5 4.5Z"
		stroke-linejoin="round"
	/>
</svg>
