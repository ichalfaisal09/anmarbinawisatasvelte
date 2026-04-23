<script lang="ts">
	import { page } from '$app/state';
	import { IconDocumentLines, IconHomeStroke, IconWhatsApp } from '$lib/components/icons';
	import { ROUTE, isInformasiSection, normalizePathname } from '$lib/routes';
	import type { CompanyPublic } from '$lib/types/company-public';
	import { trackUiEvent } from '$lib/utils/track';

	let { company }: { company: Pick<CompanyPublic, 'waNumber'> } = $props();

	const path = $derived(normalizePathname(page.url.pathname));
	const homeActive = $derived(path === ROUTE.HOME);
	const infoActive = $derived(isInformasiSection(path));

	const waClean = $derived(String(company.waNumber ?? '').replace(/[^\d]/g, ''));
	const waHref = $derived(waClean ? `https://wa.me/${waClean}` : '');

	function onWhatsappClick() {
		trackUiEvent('click_whatsapp', { location: 'bottom_nav' });
	}
</script>

<nav class="bottom-nav" aria-label="Navigasi utama">
	<a
		class="tab"
		class:active={homeActive}
		href={ROUTE.HOME}
		aria-current={homeActive ? 'page' : undefined}
	>
		<span class="icon" aria-hidden="true">
			<IconHomeStroke />
		</span>
		<span class="label">Beranda</span>
	</a>

	<a
		class="tab"
		class:active={infoActive}
		href={ROUTE.INFORMASI}
		aria-current={infoActive ? 'page' : undefined}
	>
		<span class="icon" aria-hidden="true">
			<IconDocumentLines />
		</span>
		<span class="label">Informasi</span>
	</a>

	{#if waHref}
		<a class="tab wa" href={waHref} target="_blank" rel="noopener noreferrer" onclick={onWhatsappClick}>
			<span class="icon" aria-hidden="true">
				<IconWhatsApp />
			</span>
			<span class="label">WhatsApp</span>
		</a>
	{:else}
		<button
			type="button"
			class="tab wa"
			disabled
			title="Nomor WhatsApp belum diatur"
			aria-label="WhatsApp belum diatur"
		>
			<span class="icon" aria-hidden="true">
				<IconWhatsApp muted />
			</span>
			<span class="label">WhatsApp</span>
		</button>
	{/if}
</nav>

<style>
	.bottom-nav {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1001;
		display: flex;
		align-items: stretch;
		justify-content: space-around;
		gap: 0;
		padding: 0.35rem 0.5rem calc(0.45rem + env(safe-area-inset-bottom, 0px));
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(8px);
		border-top: 1px solid var(--border);
		box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.05);
	}

	.tab {
		appearance: none;
		font: inherit;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
		padding: 0.35rem 0.25rem;
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		font-size: 0.67rem;
		font-weight: 600;
		color: var(--text-light);
		text-decoration: none;
		min-width: 0;
		cursor: pointer;
		transition:
			color 0.15s,
			background 0.15s;
	}

	.tab .icon {
		display: grid;
		place-items: center;
		line-height: 0;
	}

	.tab:hover,
	.tab:focus-visible {
		color: var(--text);
		background: rgba(6, 78, 59, 0.06);
		outline: none;
	}

	.tab.active {
		color: var(--primary);
		background: rgba(6, 78, 59, 0.1);
	}

	.tab.wa {
		color: #128c7e;
	}

	.tab.wa:hover,
	.tab.wa:focus-visible {
		color: #075e54;
		background: rgba(18, 140, 126, 0.1);
	}

	.tab.wa:disabled {
		cursor: not-allowed;
		color: var(--text-light);
		opacity: 0.85;
	}

	.tab.wa:disabled:hover,
	.tab.wa:disabled:focus-visible {
		background: transparent;
		color: var(--text-light);
	}

	.label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}
</style>
