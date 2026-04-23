<script lang="ts">
	let { size = 18, class: className = '' }: { size?: number; class?: string } = $props();
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
	<circle cx="12" cy="12" r="9" />
	<path d="M12 7v6l3 2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
