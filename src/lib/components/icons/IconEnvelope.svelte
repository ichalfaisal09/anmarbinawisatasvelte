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
	<rect x="3" y="5" width="18" height="14" rx="2" />
	<path d="m3 7 9 6 9-6" stroke-linecap="round" stroke-linejoin="round" />
</svg>
