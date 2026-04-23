<script lang="ts">
	let { size = 24, class: className = '' }: { size?: number; class?: string } = $props();
</script>

<svg
	class={className || undefined}
	viewBox="0 0 24 24"
	width={size}
	height={size}
	fill="currentColor"
	aria-hidden="true"
>
	<path
		d="M22 23h-6.001a1 1 0 0 1-1-1v-5.657a2.346 2.346 0 0 0-2.344-2.343h-.621A2.346 2.346 0 0 0 9.69 16.343V22a1 1 0 0 1-1 1H2.69a1 1 0 0 1-1-1V10.735a1 1 0 0 1 .43-.822L11.061 2.97a1.583 1.583 0 0 1 1.878 0l8.941 6.943a1 1 0 0 1 .43.822V22a1 1 0 0 1-1 1Z"
	/>
</svg>
