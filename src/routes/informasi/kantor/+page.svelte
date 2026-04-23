<script lang="ts">
	let { data } = $props();

	const maps = $derived((data.company.mapsUrl ?? '').trim());
	const address = $derived((data.company.address ?? '').trim());
</script>

<svelte:head>
	<title>Kantor & lokasi | Informasi</title>
</svelte:head>

<article class="page">
	<h1>Kantor & lokasi</h1>
	{#if address}
		<section class="block">
			<h2>Alamat</h2>
			<p>{address}</p>
		</section>
	{:else}
		<p class="muted">Alamat belum diisi di pengaturan perusahaan.</p>
	{/if}

	{#if maps}
		<a class="cta" href={maps} target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>
	{/if}

	<p class="note">Jam kunjungan mengikuti jam operasional yang tercantum di halaman kontak.</p>
</article>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		line-height: 1.6;
		color: var(--text);
	}

	h1 {
		font-size: 1.5rem;
	}

	h2 {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-light);
		font-family: var(--font-main);
		font-weight: 700;
		margin-bottom: 0.35rem;
	}

	.block {
		padding: 0.85rem 1rem;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--white);
	}

	.muted {
		color: var(--text-light);
		font-size: 0.95rem;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1rem;
		border-radius: 10px;
		background: var(--primary);
		color: var(--white);
		font-weight: 700;
		font-size: 0.95rem;
		width: fit-content;
		transition: opacity 0.15s;
	}

	.cta:hover,
	.cta:focus-visible {
		opacity: 0.9;
		outline: none;
	}

	.note {
		font-size: 0.875rem;
		color: var(--text-light);
	}
</style>
