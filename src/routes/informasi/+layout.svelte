<script lang="ts">
	import { page } from '$app/state';
	import { ROUTE, normalizePathname } from '$lib/routes';

	let { children } = $props();

	const path = $derived(normalizePathname(page.url.pathname));
	const isHub = $derived(path === ROUTE.INFORMASI);
</script>

<div class="info-layout">
	{#if !isHub}
		<a class="back-hub" href={ROUTE.INFORMASI}>← Daftar informasi</a>
	{/if}
	{@render children()}
</div>

<style>
	.info-layout {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 36rem;
		margin: 0 auto;
		width: 100%;
	}

	.back-hub {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--primary);
		align-self: flex-start;
		padding: 0.25rem 0;
	}

	.back-hub:hover,
	.back-hub:focus-visible {
		text-decoration: underline;
		outline: none;
	}
</style>
