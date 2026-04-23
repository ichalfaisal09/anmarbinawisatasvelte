<script lang="ts">
	let { data } = $props();

	const ppiu = $derived(data.permits.find((p) => p.id === 'ppiu'));
	const pihk = $derived(data.permits.find((p) => p.id === 'pihk'));
</script>

<svelte:head>
	<title>Legalitas | Informasi</title>
	<meta
		name="description"
		content="Legalitas Anmar Binawisata: izin PPIU, izin PIHK, dan dokumen perusahaan."
	/>
</svelte:head>

<article class="page">
	<header class="page-head">
		<h1>Legalitas</h1>
		<p class="lede">Informasi izin operasional dan dokumen legal perusahaan.</p>
	</header>

	<section class="card" aria-labelledby="ppiu-heading">
		<div class="head-row">
			<div class="badge" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75">
					<circle cx="12" cy="12" r="6" />
					<path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M5 19l2-2" stroke-linecap="round" />
				</svg>
			</div>
			<div class="head-text">
				<h2 id="ppiu-heading">{ppiu?.title ?? 'Izin PPIU'}</h2>
				<p class="sub">{ppiu?.subtitle ?? 'Penyelenggara Perjalanan Ibadah Umrah'}</p>
			</div>
		</div>

		<div class="meta-box">
			<div class="meta-row">
				<span class="key">Nomor izin</span>
				<strong class="value">{ppiu?.licenseNumber ?? '-'}</strong>
			</div>
			<div class="meta-row">
				<span class="key">Berlaku hingga</span>
				<span class="value muted">{ppiu?.validUntil ?? '-'}</span>
			</div>
		</div>
	</section>

	<section class="card" aria-labelledby="pihk-heading">
		<div class="head-row">
			<div class="badge" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75">
					<path d="M2 14h7l3-4 3 4h7" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M5 10h3M18 10h1" stroke-linecap="round" />
					<path d="M7 14v5M17 14v5" stroke-linecap="round" />
				</svg>
			</div>
			<div class="head-text">
				<h2 id="pihk-heading">{pihk?.title ?? 'Izin PIHK'}</h2>
				<p class="sub">{pihk?.subtitle ?? 'Penyelenggara Ibadah Haji Khusus'}</p>
			</div>
		</div>

		<div class="meta-box">
			<div class="meta-row">
				<span class="key">Nomor izin</span>
				<strong class="value">{pihk?.licenseNumber ?? '-'}</strong>
			</div>
			<div class="meta-row">
				<span class="key">Berlaku hingga</span>
				<span class="value muted">{pihk?.validUntil ?? '-'}</span>
			</div>
		</div>
	</section>

	<section class="card" aria-labelledby="doc-heading">
		<div class="head-row">
			<div class="badge" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75">
					<path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke-linejoin="round" />
					<path d="M14 3v4h4M9 11h6M9 15h6" stroke-linecap="round" />
				</svg>
			</div>
			<div class="head-text">
				<h2 id="doc-heading">Dokumen Perusahaan</h2>
				<p class="sub">Legalitas badan usaha</p>
			</div>
		</div>

		<ul class="doc-list" role="list">
			{#each data.companyDocs as doc (doc.name)}
				<li class="doc-item">
					<span>{doc.name}</span>
					<span class="ok" aria-label={`${doc.name} tersedia`}>
						<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="9" />
							<path d="M8.5 12.2 11 14.7l4.8-4.9" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</span>
				</li>
			{/each}
		</ul>
	</section>
</article>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		line-height: 1.55;
		color: var(--text);
	}

	.page-head {
		margin-bottom: 0.1rem;
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

	.card {
		padding: 1.1rem 1.15rem 1.15rem;
		border: 1px solid var(--border);
		border-radius: 16px;
		background: var(--white);
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03), 0 10px 28px rgba(0, 0, 0, 0.05);
	}

	.head-row {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		margin-bottom: 0.85rem;
	}

	.badge {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		color: var(--primary);
		background: rgba(6, 78, 59, 0.1);
		border: 1px solid rgba(6, 78, 59, 0.15);
		flex-shrink: 0;
	}

	.head-text h2 {
		font-family: var(--font-display);
		font-size: 1.18rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0 0 0.1rem;
		color: var(--text);
	}

	.sub {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-light);
	}

	.meta-box {
		background: rgba(0, 0, 0, 0.02);
		border: 1px solid rgba(0, 0, 0, 0.05);
		border-radius: 10px;
		padding: 0.8rem 0.9rem;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.meta-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.8rem;
	}

	.key {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text);
	}

	.value {
		font-size: 1.1rem;
		font-weight: 800;
		color: #0f172a;
		text-align: right;
	}

	.value.muted {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-light);
	}

	.doc-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.doc-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem;
		padding: 0.7rem 0.8rem;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.02);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
	}

	.ok {
		display: grid;
		place-items: center;
		color: #16a34a;
	}

	@media (max-width: 480px) {
		.value {
			font-size: 1rem;
		}
	}
</style>
