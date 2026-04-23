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
	<path d="M7 3h8l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke-linejoin="round" />
	<path d="M9 9h6M9 13h6M9 17h4" stroke-linecap="round" />
</svg>
