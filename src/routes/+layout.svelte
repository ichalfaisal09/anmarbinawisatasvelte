<script lang="ts">
	import '../app.css';
	import FeedHeader from '$lib/components/FeedHeader.svelte';
	import FeedContactCard from '$lib/components/FeedContactCard.svelte';
	import FeedWorldClocks from '$lib/components/FeedWorldClocks.svelte';
	import { page } from '$app/state';

	let { children, data } = $props();

	const isAdminRoute = $derived(page.url.pathname.startsWith('/admin'));
</script>

{#if !isAdminRoute}
	<FeedHeader
		companyName={data.company.companyName}
		logoUrl={data.company.logoUrl?.trim() ? data.company.logoUrl : '/logo.svg'}
	/>
{/if}

{#if isAdminRoute}
	<main class="admin-main">
		{@render children()}
	</main>
{:else}
	<main class="container">
		<div class="feed-container">
			<FeedWorldClocks />
			{@render children()}
			<FeedContactCard company={data.company} />
		</div>
	</main>
{/if}

<style>
	main {
		min-height: 100vh;
	}
	.admin-main {
		min-height: 100vh;
		padding: 0;
	}
</style>


