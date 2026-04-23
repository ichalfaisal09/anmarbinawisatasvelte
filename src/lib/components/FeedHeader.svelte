<script lang="ts">
	import { page } from '$app/state';
	import { IconDocumentLines, IconHomeFilled } from '$lib/components/icons';
	import { ROUTE, normalizePathname } from '$lib/routes';

	let { companyName = '', logoUrl = '/logo.svg' }: { companyName?: string; logoUrl?: string } =
		$props();

	const displayName = $derived((companyName ?? '').trim() || 'Anmar Binawisata');
	const displayLogo = $derived((logoUrl ?? '').trim() || '/logo.svg');

	const path = $derived(normalizePathname(page.url.pathname));
	const isHome = $derived(path === ROUTE.HOME);
</script>

<header class="header">
	<div class="header-inner">
		<a class="brand" href={ROUTE.HOME} aria-label={displayName}>
			<img class="brand-logo" src={displayLogo} alt="" width="28" height="28" />
			<span class="brand-name">{displayName}</span>
		</a>
		<div class="nav-minimal">
			{#if isHome}
				<a class="nav-ic" href={ROUTE.INFORMASI} aria-label="Informasi">
					<IconDocumentLines size={24} />
				</a>
			{:else}
				<a class="nav-ic" href={ROUTE.HOME} aria-label="Beranda — galeri promo">
					<IconHomeFilled size={24} />
				</a>
			{/if}
		</div>
	</div>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--border);
		z-index: 1000;
		display: flex;
		align-items: center;
	}

	.header-inner {
		max-width: 935px;
		width: 100%;
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-main);
		font-weight: 800;
		font-size: 1.08rem;
		letter-spacing: -0.03em;
		color: inherit;
		min-width: 0;
	}

	.brand-logo {
		border-radius: var(--radius-sm);
		flex: 0 0 auto;
	}

	.brand-name {
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.nav-ic {
		display: grid;
		place-items: center;
		padding: 6px;
		margin: -6px;
		border-radius: var(--radius-sm);
		color: var(--text);
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.nav-ic:hover,
	.nav-ic:focus-visible {
		background: rgba(6, 78, 59, 0.08);
		color: var(--primary);
		outline: none;
	}
</style>
