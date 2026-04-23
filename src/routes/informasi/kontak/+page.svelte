<script lang="ts">
	import FeedContactCard from '$lib/components/FeedContactCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Kontak | Informasi</title>
</svelte:head>

<article class="page">
	<h1>Kontak</h1>
	<p class="lead">Ringkasan kontak resmi. Data diambil dari pengaturan perusahaan di admin.</p>
	<FeedContactCard company={data.company} showFullContactLink={false} />
</article>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		font-size: 1.5rem;
		color: var(--text);
	}

	.lead {
		font-size: 0.9rem;
		color: var(--text-light);
		line-height: 1.5;
		margin: 0;
	}
</style>
