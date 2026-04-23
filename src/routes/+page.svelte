<script lang="ts">
	import FeedPost from '$lib/components/FeedPost.svelte';

	let { data } = $props();

	const brandTitle = $derived((data.company.companyName ?? '').trim() || 'Anmar Binawisata');
	const logoForFeed = $derived(data.company.logoUrl?.trim() ? data.company.logoUrl : '');
	const waClean = $derived(String(data.company.waNumber ?? '').replace(/[^\d]/g, ''));
</script>

<svelte:head>
	<title>{brandTitle} | Galeri promo</title>
</svelte:head>

{#if data.posts.length === 0}
	<div class="feed-empty">
		<div class="feed-empty-inner">
			<div class="feed-empty-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.5">
					<rect x="3" y="5" width="18" height="14" rx="2" />
					<circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
					<path d="M4 16l4-4 3 3 5-5 4 4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>
			<h1 class="feed-empty-title">Belum ada promo di feed</h1>
			<p class="feed-empty-text">
				Post promosi akan tampil di sini setelah ditambahkan dari panel admin. Periksa kembali nanti atau hubungi
				kami langsung.
			</p>
			{#if waClean}
				<a class="feed-empty-cta" href={`https://wa.me/${waClean}`} target="_blank" rel="noopener noreferrer">
					Chat WhatsApp
				</a>
			{/if}
		</div>
	</div>
{:else}
	{#each data.posts as post, i (post.id)}
		<FeedPost
			title={post.title}
			imageUrl={post.imageUrl}
			waNumber={data.company.waNumber}
			companyName={data.company.companyName}
			logoUrl={logoForFeed}
			createdAt={post.createdAt}
			expiresAt={post.expiresAt}
			officeHours={data.company.officeHours}
			priorityImage={i === 0}
		/>
	{/each}
{/if}

<style>
	.feed-empty {
		display: flex;
		justify-content: center;
		padding: 2rem 0 3rem;
	}
	.feed-empty-inner {
		max-width: 26rem;
		text-align: center;
		padding: 2rem 1.25rem;
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--white);
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
	}
	.feed-empty-icon {
		width: 72px;
		height: 72px;
		margin: 0 auto 1rem;
		border-radius: 16px;
		display: grid;
		place-items: center;
		color: var(--primary);
		background: rgba(6, 78, 59, 0.1);
		border: 1px solid rgba(6, 78, 59, 0.15);
	}
	.feed-empty-title {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0 0 0.5rem;
		color: var(--text);
	}
	.feed-empty-text {
		margin: 0 0 1.25rem;
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.5;
		color: var(--text-light);
	}
	.feed-empty-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 46px;
		padding: 0 1.25rem;
		border-radius: 10px;
		background: var(--primary);
		color: var(--white);
		font-weight: 800;
		font-size: 0.9rem;
	}
	.feed-empty-cta:hover {
		opacity: 0.92;
	}
</style>
