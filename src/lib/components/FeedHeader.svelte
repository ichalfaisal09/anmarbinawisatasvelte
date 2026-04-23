<script lang="ts">
	let {
		companyName = '',
		logoUrl = '/logo.svg'
	}: { companyName?: string; logoUrl?: string } = $props();

	const displayName = $derived((companyName ?? '').trim() || 'Anmar Binawisata');
	const displayLogo = $derived((logoUrl ?? '').trim() || '/logo.svg');
</script>

<header class="header">
	<div class="header-inner">
		<a class="brand" href="/" aria-label={displayName}>
			<img class="brand-logo" src={displayLogo} alt="" width="28" height="28" />
			<span class="brand-name">{displayName}</span>
		</a>
		<div class="nav-minimal">
			<a href="/" aria-label="Home">
				<svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
					<path
						d="M22 23h-6.001a1 1 0 0 1-1-1v-5.657a2.346 2.346 0 0 0-2.344-2.343h-.621A2.346 2.346 0 0 0 9.69 16.343V22a1 1 0 0 1-1 1H2.69a1 1 0 0 1-1-1V10.735a1 1 0 0 1 .43-.822L11.061 2.97a1.583 1.583 0 0 1 1.878 0l8.941 6.943a1 1 0 0 1 .43.822V22a1 1 0 0 1-1 1Z"
					></path>
				</svg>
			</a>
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
		background: var(--white);
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
		font-weight: 700;
		font-size: 1.2rem;
		letter-spacing: -0.05em;
		color: inherit;
		min-width: 0;
	}

	.brand-logo {
		border-radius: 8px;
		flex: 0 0 auto;
	}

	.brand-name {
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.nav-minimal svg {
		color: var(--text);
	}
</style>
