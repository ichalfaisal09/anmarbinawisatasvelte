<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';

	let { children, data } = $props();
	let sidebarOpen = $state(false);
	const pathname = $derived(page.url.pathname);
	const isLoginRoute = $derived(pathname === '/admin/login');
	const isPostsNavActive = $derived(pathname === '/admin' || pathname.startsWith('/admin/posts'));
	const isGalleryNavActive = $derived(pathname === '/admin/gallery');
	const isInformasiNavActive = $derived(pathname === '/admin/informasi');
	const isSettingsNavActive = $derived(pathname === '/admin/settings');
	const isAnalyticsNavActive = $derived(pathname === '/admin/analytics');

	const displayCompanyName = $derived((data.company.companyName ?? '').trim() || 'Anmar Binawisata');
	const displayLogo = $derived(data.company.logoUrl?.trim() ? data.company.logoUrl : '/logo.svg');
	const displayAdminSubtitle = $derived(
		(data.company.adminSidebarSubtitle ?? '').trim() || 'Admin Panel'
	);
</script>

{#if isLoginRoute}
	<main class="login-only">
		{@render children()}
	</main>
{:else}
	<div class="admin">
		<button
			type="button"
			class="mobile-backdrop"
			class:show={sidebarOpen}
			aria-label="Tutup menu"
			onclick={() => (sidebarOpen = false)}
		></button>
		<aside class:open={sidebarOpen} class="sidebar" aria-label="Admin navigation">
			<a class="brand" href="/admin" aria-label="Admin dashboard" onclick={() => (sidebarOpen = false)}>
				<img class="logo" src={displayLogo} alt="" width="32" height="32" />
				<div class="brand-text">
					<div class="brand-name">{displayCompanyName}</div>
					<div class="brand-sub">{displayAdminSubtitle}</div>
				</div>
			</a>

			<nav class="nav">
				<a class:active={isPostsNavActive} href="/admin" onclick={() => (sidebarOpen = false)}>Posts</a>
				<a class:active={isGalleryNavActive} href="/admin/gallery" onclick={() => (sidebarOpen = false)}>Galeri</a>
				<a class:active={isInformasiNavActive} href="/admin/informasi" onclick={() => (sidebarOpen = false)}
					>Informasi</a
				>
				<a class:active={isSettingsNavActive} href="/admin/settings" onclick={() => (sidebarOpen = false)}
					>Settings</a
				>
				<a class:active={isAnalyticsNavActive} href="/admin/analytics" onclick={() => (sidebarOpen = false)}
					>Analytics</a
				>
			</nav>

			<div class="spacer"></div>

			<form method="POST" action="/admin?/logout" class="logout" use:enhance>
				<button type="submit">Logout</button>
			</form>
		</aside>

		<div class="main">
			<header class="topbar">
				<button
					type="button"
					class="icon-btn"
					aria-label={sidebarOpen ? 'Tutup menu' : 'Buka menu'}
					onclick={() => (sidebarOpen = !sidebarOpen)}
				>
					<svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
						<path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
					</svg>
				</button>

				<div class="crumb">
					{#if pathname === '/admin'}
						Posts
					{:else if pathname.startsWith('/admin/posts/') && pathname.endsWith('/edit')}
						Edit Post
					{:else if pathname.startsWith('/admin/posts/new')}
						Post Baru
					{:else if pathname === '/admin/gallery'}
						Galeri
					{:else if pathname === '/admin/informasi'}
						Informasi
					{:else if pathname === '/admin/settings'}
						Settings
					{:else if pathname === '/admin/analytics'}
						Analytics
					{:else}
						Admin
					{/if}
				</div>

				<div class="topbar-right">
					<a class="chip" href="/" target="_blank" rel="noopener noreferrer">Lihat Website</a>
				</div>
			</header>

			<div class="content">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<svelte:window
	onkeydown={(e) => {
		if (sidebarOpen && e.key === 'Escape') sidebarOpen = false;
	}}
/>

<style>
	.login-only {
		min-height: 100dvh;
		background: var(--white);
	}

	.admin {
		min-height: 100vh;
		display: grid;
		grid-template-columns: 260px 1fr;
		background: var(--bg);
	}

	/* Hidden by default so it does not consume a desktop grid cell. */
	.mobile-backdrop {
		display: none;
	}

	.sidebar {
		position: sticky;
		top: 0;
		height: 100vh;
		background: var(--white);
		border-right: 1px solid var(--border);
		padding: 18px 14px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px;
		border-radius: 14px;
	}
	.brand:hover {
		background: rgba(0, 0, 0, 0.03);
	}
	.logo {
		border-radius: 12px;
	}
	.brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.15;
	}
	.brand-name {
		font-weight: 900;
		letter-spacing: -0.02em;
	}
	.brand-sub {
		color: var(--text-light);
		font-weight: 700;
		font-size: 0.9rem;
	}

	.nav {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.nav a {
		padding: 10px 12px;
		border-radius: 12px;
		font-weight: 800;
		color: var(--text);
	}
	.nav a:hover {
		background: rgba(0, 0, 0, 0.03);
	}
	.nav a.active {
		background: rgba(6, 78, 59, 0.12);
		color: var(--primary);
	}

	.spacer {
		flex: 1;
	}

	.logout button {
		width: 100%;
		height: 42px;
		border-radius: 12px;
		border: 1px solid var(--border);
		background: var(--white);
		font-weight: 900;
		cursor: pointer;
	}
	.logout button:hover {
		border-color: rgba(6, 78, 59, 0.35);
	}

	.main {
		min-width: 0;
	}
	.topbar {
		position: sticky;
		top: 0;
		z-index: 10;
		height: 62px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 18px;
		background: rgba(250, 250, 250, 0.9);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border);
	}
	.icon-btn {
		width: 40px;
		height: 40px;
		border-radius: 12px;
		border: 1px solid var(--border);
		background: var(--white);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.icon-btn:hover {
		border-color: rgba(6, 78, 59, 0.35);
	}
	.crumb {
		font-weight: 900;
		letter-spacing: -0.02em;
	}
	.topbar-right {
		display: flex;
		gap: 10px;
		align-items: center;
	}
	.chip {
		height: 40px;
		padding: 0 14px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--white);
		font-weight: 900;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.content {
		padding: 18px;
		max-width: 1200px;
	}

	/* Mobile sidebar drawer */
	@media (max-width: 900px) {
		.mobile-backdrop {
			display: block;
			position: fixed;
			inset: 0;
			border: 0;
			padding: 0;
			margin: 0;
			opacity: 0;
			pointer-events: none;
			background: rgba(2, 6, 23, 0.35);
			backdrop-filter: blur(1px);
			transition: opacity 0.2s ease;
			z-index: 19;
		}
		.mobile-backdrop.show {
			opacity: 1;
			pointer-events: auto;
		}
		.admin {
			grid-template-columns: 1fr;
		}
		.sidebar {
			position: fixed;
			left: 0;
			top: 0;
			transform: translateX(-102%);
			transition: transform 0.2s ease;
			width: 280px;
			z-index: 20;
			box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
		}
		.sidebar.open {
			transform: translateX(0);
		}
		.content {
			max-width: 100%;
		}
	}
</style>

