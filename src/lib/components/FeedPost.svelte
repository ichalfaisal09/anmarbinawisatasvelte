<script lang="ts">
	import { toMediaUrl } from '$lib/media-url';

	let {
		title,
		imageUrl,
		waNumber = '',
		companyName = '',
		logoUrl = '',
		createdAt = '',
		expiresAt = '',
		officeHours = '',
		priorityImage = false,
		staggerIndex = 0
	}: {
		title: string;
		imageUrl: string;
		waNumber?: string;
		companyName?: string;
		logoUrl?: string;
		createdAt?: string;
		expiresAt?: string;
		officeHours?: string;
		priorityImage?: boolean;
		staggerIndex?: number;
	} = $props();

	const brand = $derived((companyName ?? '').trim() || 'Anmar Binawisata');
	const logo = $derived((logoUrl ?? '').trim() || '');
	const initial = $derived((brand.slice(0, 1) || 'A').toUpperCase());

	let imageLoaded = $state(false);

	$effect(() => {
		void imageUrl;
		imageLoaded = false;
	});

	const waClean = $derived(String(waNumber ?? '').replace(/[^\d]/g, ''));
	const waLink = $derived(
		waClean === ''
			? '#'
			: `https://wa.me/${waClean}?text=${encodeURIComponent(`Halo ${brand}, saya tertarik dengan promo: ${title}`)}`
	);

	const postedLabel = $derived.by(() => {
		const d = new Date(createdAt);
		if (!Number.isFinite(d.getTime())) return '';
		return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
	});

	const isActive = $derived.by(() => {
		const end = Date.parse(expiresAt);
		if (!Number.isFinite(end)) return false;
		return end > Date.now();
	});

	const imgAlt = $derived(`Promo: ${title}`);
	const postImageUrl = $derived(toMediaUrl(imageUrl));
	const brandLogoUrl = $derived(toMediaUrl(logo));
</script>

<article class="post" style="--stagger:{staggerIndex}">
	<header class="post-header">
		<div class="avatar-wrap" aria-hidden="true">
			{#if logo}
				<img class="avatar-img" src={brandLogoUrl} alt="" width="36" height="36" />
			{:else}
				<span class="avatar-letter">{initial}</span>
			{/if}
		</div>
		<div class="header-text">
			<div class="username">{brand}</div>
			<div class="meta-row">
				{#if postedLabel}
					<time class="posted" datetime={createdAt}>{postedLabel}</time>
				{/if}
				{#if isActive}
					<span class="badge">Promo aktif</span>
				{/if}
			</div>
		</div>
	</header>

	<div class="media-container">
		{#if !imageLoaded}
			<div class="media-skeleton" aria-hidden="true"></div>
		{/if}
		<img
			src={postImageUrl}
			alt={imgAlt}
			class="media-img"
			class:media-img--loaded={imageLoaded}
			loading={priorityImage ? 'eager' : 'lazy'}
			fetchpriority={priorityImage ? 'high' : 'low'}
			decoding="async"
			onload={() => (imageLoaded = true)}
			onerror={() => (imageLoaded = true)}
		/>
	</div>

	<div class="post-content">
		<h2 class="title">{title}</h2>
		<a
			href={waLink}
			class="btn-action"
			target="_blank"
			rel="noopener noreferrer"
			aria-disabled={waLink === '#'}
			class:disabled={waLink === '#'}
		>
			Daftar via WhatsApp
		</a>
		{#if (officeHours ?? '').trim()}
			<p class="cta-note">Balasan chat mengikuti jam operasional kantor.</p>
		{/if}
	</div>
</article>

<style>
	.post {
		--stagger: 0;
		background: var(--white);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		margin-bottom: 0;
		box-shadow: var(--shadow-soft);
		overflow: hidden;
		animation: post-enter 0.62s cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(var(--stagger) * 72ms);
		transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.2s ease;
	}

	.post:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-focus);
		border-color: rgba(6, 78, 59, 0.22);
	}

	@keyframes post-enter {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.post-header {
		display: flex;
		align-items: center;
		padding: 12px 14px;
		gap: 12px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}

	.avatar-wrap {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;
		border: 1px solid var(--border);
		background: rgba(6, 78, 59, 0.08);
		display: grid;
		place-items: center;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.avatar-letter {
		font-size: 0.85rem;
		font-weight: 800;
		color: var(--primary);
	}

	.header-text {
		min-width: 0;
		flex: 1;
	}

	.username {
		font-weight: 780;
		font-size: 0.91rem;
		letter-spacing: var(--tracking-normal);
		line-height: 1.2;
	}

	.meta-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		margin-top: 4px;
	}

	.posted {
		font-size: 0.76rem;
		font-weight: 620;
		color: var(--text-light);
	}

	.badge {
		font-size: 0.65rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 3px 8px;
		border-radius: 999px;
		background: rgba(6, 78, 59, 0.1);
		color: var(--primary);
		border: 1px solid rgba(6, 78, 59, 0.2);
		animation: badge-soft 2.8s ease-in-out infinite;
	}

	@keyframes badge-soft {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(6, 78, 59, 0);
		}
		50% {
			box-shadow: 0 0 0 3px rgba(6, 78, 59, 0.12);
		}
	}

	.media-container {
		width: 100%;
		aspect-ratio: 1 / 1;
		background: linear-gradient(110deg, #ececec 0%, #f5f5f5 40%, #ececec 80%);
		position: relative;
		overflow: hidden;
	}

	.media-skeleton {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			100deg,
			rgba(240, 240, 240, 0) 0%,
			rgba(255, 255, 255, 0.55) 45%,
			rgba(240, 240, 240, 0) 90%
		);
		background-size: 200% 100%;
		animation: shimmer 1.35s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes shimmer {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: -100% 0;
		}
	}

	.media-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		position: relative;
		z-index: 2;
		opacity: 0;
		transition: opacity 0.35s ease, transform 0.45s ease;
	}

	.media-img--loaded {
		opacity: 1;
	}

	.post:hover .media-img--loaded {
		transform: scale(1.02);
	}

	.post-content {
		padding: 14px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.title {
		font-family: var(--font-display);
		font-size: 1.02rem;
		font-weight: 680;
		letter-spacing: var(--tracking-tight);
		margin: 0;
		line-height: 1.33;
		color: var(--text);
	}

	.btn-action {
		background-color: var(--primary);
		color: var(--white);
		padding: 0.75rem 0.85rem;
		border-radius: var(--radius-sm);
		font-weight: 800;
		font-size: 0.88rem;
		width: 100%;
		border: none;
		cursor: pointer;
		text-align: center;
		transition: opacity 0.2s, transform 0.12s ease;
		display: block;
	}

	.btn-action:hover:not(.disabled) {
		opacity: 0.92;
	}

	.btn-action:active:not(.disabled) {
		transform: scale(0.99);
	}

	.btn-action.disabled {
		opacity: 0.55;
		cursor: not-allowed;
		pointer-events: none;
	}

	.cta-note {
		margin: 0;
		font-size: 0.76rem;
		font-weight: 620;
		color: var(--text-light);
		line-height: 1.38;
		text-align: center;
	}

	@media (prefers-reduced-motion: reduce) {
		.post {
			animation: none;
			transition: none;
		}

		.post:hover {
			transform: none;
		}

		.post:hover .media-img--loaded {
			transform: none;
		}

		.badge {
			animation: none;
		}

		.media-img {
			transition: opacity 0.2s ease;
		}
	}

	@media (max-width: 600px) {
		.post {
			border-left: none;
			border-right: none;
			border-radius: 0;
			box-shadow: none;
		}

		.post:hover {
			transform: none;
			box-shadow: none;
		}
	}
</style>
