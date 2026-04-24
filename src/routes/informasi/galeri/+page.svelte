<script lang="ts">
	import { onDestroy } from 'svelte';
	import { toMediaUrl } from '$lib/media-url';
	import { trackUiEvent } from '$lib/utils/track';

	let { data } = $props();

	let activeIndex = $state<number | null>(null);
	let brokenImageIds = $state<number[]>([]);

	const activeItem = $derived(activeIndex === null ? null : data.gallery[activeIndex] ?? null);

	function openLightbox(index: number) {
		activeIndex = index;
		const item = data.gallery[index];
		trackUiEvent('open_lightbox', { imageId: item?.id ?? -1 });
	}

	function markImageBroken(id: number) {
		if (brokenImageIds.includes(id)) return;
		brokenImageIds = [...brokenImageIds, id];
	}

	function closeLightbox() {
		activeIndex = null;
	}

	function showPrev() {
		if (activeIndex === null || data.gallery.length === 0) return;
		activeIndex = (activeIndex - 1 + data.gallery.length) % data.gallery.length;
		const item = data.gallery[activeIndex];
		trackUiEvent('lightbox_prev', { imageId: item?.id ?? -1 });
	}

	function showNext() {
		if (activeIndex === null || data.gallery.length === 0) return;
		activeIndex = (activeIndex + 1) % data.gallery.length;
		const item = data.gallery[activeIndex];
		trackUiEvent('lightbox_next', { imageId: item?.id ?? -1 });
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (activeIndex === null) return;
		if (event.key === 'Escape') {
			event.preventDefault();
			closeLightbox();
			return;
		}
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			showPrev();
			return;
		}
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			showNext();
		}
	}

	$effect(() => {
		if (activeIndex === null) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prevOverflow;
		};
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<svelte:head>
	<title>Galeri | Informasi</title>
	<meta
		name="description"
		content="Galeri foto travel haji umrah Makassar Anmar Binawisata: kegiatan jamaah, ziarah, dan dokumentasi perjalanan."
	/>
</svelte:head>

<svelte:window onkeydown={onWindowKeydown} />

<article class="page">
	<header class="page-head">
		<h1>Galeri</h1>
		<p class="lede">Cuplikan dokumentasi travel haji umrah Makassar dan kegiatan jamaah.</p>
	</header>

	{#if data.gallery.length === 0}
		<div class="empty" role="status">
			<div class="empty-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5">
					<rect x="3" y="5" width="18" height="14" rx="2" />
					<circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
					<path d="M4 16l4-4 3 3 5-5 4 4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>
			<p class="empty-title">Belum ada foto</p>
			<p class="empty-text">
				Album akan tampil di sini setelah daftar foto ditambahkan di data proyek. Anda juga bisa memakai foto
				promo dari feed sebagai sumber yang sama.
			</p>
		</div>
	{:else}
		<ul class="grid" role="list">
			{#each data.gallery as item, i (item.id)}
				<li class="cell">
					<figure class="fig">
						<button
							type="button"
							class="thumb-link"
							onclick={() => openLightbox(i)}
							aria-label={`Buka gambar fullscreen: ${item.alt}`}
						>
							{#if brokenImageIds.includes(item.id)}
								<span class="thumb-fallback" role="img" aria-label={`Gambar tidak tersedia: ${item.alt}`}>
									Gambar tidak tersedia
								</span>
							{:else}
								<img
									class="thumb"
									src={toMediaUrl(item.imageUrl)}
									alt={item.alt}
									loading="lazy"
									decoding="async"
									onerror={() => markImageBroken(item.id)}
								/>
							{/if}
						</button>
						{#if (item.caption ?? '').trim()}
							<figcaption class="cap">{(item.caption ?? '').trim()}</figcaption>
						{/if}
					</figure>
				</li>
			{/each}
		</ul>
	{/if}
</article>

{#if activeItem}
	<div class="lightbox" role="dialog" aria-modal="true" aria-label="Pratinjau foto galeri" tabindex="-1">
		<button type="button" class="lightbox-backdrop" aria-label="Tutup pratinjau galeri" onclick={closeLightbox}></button>
		<div class="lightbox-inner">
			<div class="lightbox-top">
				<p class="lightbox-counter">{(activeIndex ?? 0) + 1} / {data.gallery.length}</p>
				<button type="button" class="lightbox-close" onclick={closeLightbox} aria-label="Tutup galeri">
					&times;
				</button>
			</div>

			<div class="lightbox-frame">
				<button type="button" class="nav prev" onclick={showPrev} aria-label="Foto sebelumnya">‹</button>
				{#if brokenImageIds.includes(activeItem.id)}
					<div class="lightbox-fallback">Gambar tidak tersedia</div>
				{:else}
					<img
						class="lightbox-img"
						src={toMediaUrl(activeItem.imageUrl)}
						alt={activeItem.alt}
						loading="eager"
						decoding="async"
						onerror={() => markImageBroken(activeItem.id)}
					/>
				{/if}
				<button type="button" class="nav next" onclick={showNext} aria-label="Foto berikutnya">›</button>
			</div>

			{#if (activeItem.caption ?? '').trim()}
				<p class="lightbox-cap">{(activeItem.caption ?? '').trim()}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		color: var(--text);
	}

	.page-head {
		margin-bottom: 0.15rem;
	}

	h1 {
		font-size: 1.55rem;
		font-weight: 700;
		margin: 0 0 0.35rem;
		color: var(--text);
	}

	.lede {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-light);
		line-height: 1.45;
	}

	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
		gap: 0.65rem;
	}

	.cell {
		margin: 0;
	}

	.fig {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.thumb-link {
		appearance: none;
		border: 1px solid var(--border);
		display: block;
		border-radius: 12px;
		overflow: hidden;
		padding: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.04);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
		cursor: zoom-in;
		transition: transform 0.15s ease, box-shadow 0.15s ease;
	}

	.thumb-link:hover,
	.thumb-link:focus-visible {
		transform: translateY(-2px);
		box-shadow: 0 8px 22px rgba(6, 78, 59, 0.12);
		outline: none;
	}

	.thumb {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		display: block;
	}

	.thumb-fallback {
		width: 100%;
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		font-size: 0.74rem;
		font-weight: 700;
		color: var(--text-light);
		background: rgba(255, 255, 255, 0.9);
	}

	.cap {
		font-size: 0.72rem;
		font-weight: 600;
		line-height: 1.35;
		color: var(--text-light);
		padding: 0 0.15rem;
	}

	.empty {
		padding: 2rem 1.15rem;
		text-align: center;
		border: 1px dashed rgba(6, 78, 59, 0.25);
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.85);
	}

	.empty-icon {
		width: 72px;
		height: 72px;
		margin: 0 auto 1rem;
		border-radius: 16px;
		display: grid;
		place-items: center;
		color: var(--primary);
		background: rgba(6, 78, 59, 0.08);
		border: 1px solid rgba(6, 78, 59, 0.12);
	}

	.empty-title {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 700;
		margin: 0 0 0.4rem;
		color: var(--text);
	}

	.empty-text {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 600;
		line-height: 1.5;
		color: var(--text-light);
		max-width: 22rem;
		margin-inline: auto;
	}

	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 1200;
		display: flex;
		align-items: center;
		justify-content: center;
		place-items: center;
		padding: 0.85rem;
	}

	.lightbox-backdrop {
		position: absolute;
		inset: 0;
		appearance: none;
		border: none;
		background: rgba(3, 7, 18, 0.85);
		backdrop-filter: blur(2px);
		cursor: zoom-out;
	}

	.lightbox-inner {
		position: relative;
		width: min(100%, 960px);
		max-height: calc(100vh - 1.7rem);
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.lightbox-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem;
		color: #fff;
	}

	.lightbox-counter {
		margin: 0;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.02em;
	}

	.lightbox-close {
		appearance: none;
		border: 1px solid rgba(255, 255, 255, 0.35);
		background: rgba(255, 255, 255, 0.08);
		color: #fff;
		width: 36px;
		height: 36px;
		border-radius: 10px;
		font-size: 1.65rem;
		line-height: 1;
		cursor: pointer;
		display: grid;
		place-items: center;
	}

	.lightbox-close:hover,
	.lightbox-close:focus-visible {
		background: rgba(255, 255, 255, 0.18);
		outline: none;
	}

	.lightbox-frame {
		position: relative;
		display: grid;
		place-items: center;
		background: rgba(0, 0, 0, 0.18);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 14px;
		min-height: min(72vh, 620px);
		overflow: hidden;
	}

	.lightbox-img {
		max-width: 100%;
		max-height: min(72vh, 620px);
		width: auto;
		height: auto;
		object-fit: contain;
		display: block;
	}

	.lightbox-fallback {
		width: min(100%, 520px);
		min-height: 240px;
		display: grid;
		place-items: center;
		padding: 1.25rem;
		font-size: 0.95rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.85);
		background: rgba(255, 255, 255, 0.07);
		border: 1px dashed rgba(255, 255, 255, 0.32);
		border-radius: 12px;
	}

	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		appearance: none;
		border: 1px solid rgba(255, 255, 255, 0.32);
		background: rgba(15, 23, 42, 0.55);
		color: #fff;
		width: 40px;
		height: 40px;
		border-radius: 999px;
		cursor: pointer;
		font-size: 1.7rem;
		line-height: 1;
		display: grid;
		place-items: center;
	}

	.nav.prev {
		left: 0.55rem;
	}

	.nav.next {
		right: 0.55rem;
	}

	.nav:hover,
	.nav:focus-visible {
		background: rgba(15, 23, 42, 0.8);
		outline: none;
	}

	.lightbox-cap {
		margin: 0;
		color: rgba(255, 255, 255, 0.92);
		text-align: center;
		font-size: 0.86rem;
		font-weight: 600;
		line-height: 1.45;
	}

	@media (prefers-reduced-motion: reduce) {
		.thumb-link:hover,
		.thumb-link:focus-visible {
			transform: none;
		}
	}
</style>
