<script lang="ts">
	import { ROUTE } from '$lib/routes';

	let { data } = $props();

	const brandTitle = $derived((data.company.companyName ?? '').trim() || 'Perusahaan');
	const I = ROUTE.INFORMASI;

	const links = [
		{ href: `${I}/tentang`, title: 'Tentang kami', desc: 'Profil singkat perusahaan dan visi layanan.' },
		{ href: `${I}/legalitas`, title: 'Legalitas', desc: 'Dokumen izin dan kepatuhan operasional.' },
		{ href: `${I}/layanan`, title: 'Layanan', desc: 'Ruang lingkup jasa yang kami tawarkan.' },
		{ href: `${I}/rekening`, title: 'Rekening bank', desc: 'Informasi rekening resmi pembayaran.' },
		{ href: ROUTE.INFORMASI_KONTAK, title: 'Kontak', desc: 'WhatsApp, telepon, email, dan jam operasional.' },
		{ href: `${I}/kantor`, title: 'Kantor & lokasi', desc: 'Alamat kantor dan petunjuk akses.' },
		{ href: `${I}/galeri`, title: 'Galeri', desc: 'Foto kegiatan dan dokumentasi singkat.' }
	] as const;
</script>

<svelte:head>
	<title>Informasi | {brandTitle}</title>
	<meta name="description" content="Tentang, legalitas, layanan, rekening, kontak, kantor, dan galeri." />
</svelte:head>

<div class="hub">
	<h1 class="title">Informasi</h1>
	<p class="lead">Pilih topik di bawah untuk detail. Konten pada halaman ini dapat disesuaikan setelah review.</p>

	<ul class="grid" role="list">
		{#each links as item}
			<li>
				<a class="card" href={item.href}>
					<span class="card-title">{item.title}</span>
					<span class="card-desc">{item.desc}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.hub {
		padding-bottom: 0.5rem;
	}

	.title {
		font-size: 1.65rem;
		margin-bottom: 0.35rem;
		color: var(--text);
	}

	.lead {
		color: var(--text-light);
		font-size: 0.95rem;
		margin-bottom: 1.25rem;
		line-height: 1.55;
	}

	.grid {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1rem 1.1rem;
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--white);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.card:hover,
	.card:focus-visible {
		border-color: rgba(6, 78, 59, 0.35);
		box-shadow: 0 8px 24px rgba(6, 78, 59, 0.08);
		outline: none;
	}

	.card-title {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--primary);
	}

	.card-desc {
		font-size: 0.875rem;
		color: var(--text-light);
		line-height: 1.45;
	}
</style>
