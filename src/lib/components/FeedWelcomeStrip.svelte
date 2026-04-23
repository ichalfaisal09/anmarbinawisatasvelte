<script lang="ts">
	let {
		brandName,
		postCount,
		activePromoCount
	}: {
		brandName: string;
		postCount: number;
		activePromoCount: number;
	} = $props();

	const brand = $derived((brandName ?? '').trim() || 'Kami');
</script>

<section class="welcome" aria-labelledby="welcome-heading">
	<div class="welcome-inner">
		<p class="eyebrow">Etalase digital</p>
		<h2 id="welcome-heading" class="headline">
			<span class="brand">{brand}</span>
			<span class="dot" aria-hidden="true"></span>
			<span class="rest">promo & penawaran terkini</span>
		</h2>
		<div class="stats" role="status">
			<span class="pill">
				<strong>{postCount}</strong>
				<span>posting</span>
			</span>
			{#if activePromoCount > 0}
				<span class="pill pill--accent">
					<strong>{activePromoCount}</strong>
					<span>promo aktif</span>
				</span>
			{/if}
		</div>
		<p class="tips">
			Scroll untuk jelajahi · Tap WhatsApp untuk respon cepat · Waktu Makassar & Mekkah di atas
		</p>
	</div>
</section>

<style>
	.welcome {
		position: relative;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 1px solid rgba(6, 78, 59, 0.18);
		background: linear-gradient(
			125deg,
			rgba(255, 255, 255, 0.92) 0%,
			rgba(240, 253, 250, 0.88) 42%,
			rgba(255, 251, 235, 0.75) 100%
		);
		box-shadow: var(--shadow-soft), inset 0 1px 0 rgba(255, 255, 255, 0.85);
	}

	.welcome::before {
		content: '';
		position: absolute;
		inset: -40% -20%;
		background: conic-gradient(from 120deg at 50% 50%, transparent, rgba(217, 119, 6, 0.08), transparent 55%);
		animation: spin-slow 36s linear infinite;
		pointer-events: none;
	}

	@keyframes spin-slow {
		to {
			transform: rotate(360deg);
		}
	}

	.welcome-inner {
		position: relative;
		z-index: 1;
		padding: 0.9rem 1rem 0.7rem;
		text-align: center;
	}

	.eyebrow {
		margin: 0 0 0.2rem;
		font-size: 0.64rem;
		font-weight: 900;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--primary);
		opacity: 0.85;
	}

	.headline {
		margin: 0 0 0.55rem;
		font-family: var(--font-display);
		font-size: clamp(1.02rem, 3.8vw, 1.18rem);
		font-weight: 680;
		line-height: 1.32;
		letter-spacing: var(--tracking-tight);
		color: var(--text);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.25rem 0.4rem;
	}

	.brand {
		background: linear-gradient(100deg, var(--primary), #0d9488);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--accent), #fbbf24);
		box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
		flex-shrink: 0;
	}

	.rest {
		font-weight: 620;
		color: var(--text);
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.pill {
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
		padding: 0.28rem 0.65rem;
		border-radius: 999px;
		font-size: 0.7rem;
		font-weight: 720;
		color: var(--text);
		background: rgba(255, 255, 255, 0.75);
		border: 1px solid rgba(0, 0, 0, 0.06);
	}

	.pill strong {
		font-size: 0.85rem;
		font-variant-numeric: tabular-nums;
	}

	.pill span:last-child {
		font-weight: 600;
		color: var(--text-light);
	}

	.pill--accent {
		border-color: rgba(217, 119, 6, 0.35);
		background: rgba(255, 251, 235, 0.85);
	}

	.tips {
		margin: 0;
		padding: 0.15rem 0 0;
		font-size: 0.66rem;
		font-weight: 680;
		line-height: 1.42;
		color: var(--text-light);
		letter-spacing: 0.014em;
		text-align: center;
		max-width: 22rem;
		margin-left: auto;
		margin-right: auto;
	}

	@media (prefers-reduced-motion: reduce) {
		.welcome::before {
			animation: none;
		}
	}
</style>
