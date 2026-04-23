<script lang="ts">
	let { data, form } = $props();

	const ppiu = $derived(data.legalitas.permits.find((p) => p.id === 'ppiu'));
	const pihk = $derived(data.legalitas.permits.find((p) => p.id === 'pihk'));
	const bsi = $derived(data.rekening.find((r) => r.id === 'bsi'));
	const mandiri = $derived(data.rekening.find((r) => r.id === 'mandiri'));

	const docsText = $derived(data.legalitas.companyDocs.map((d) => d.name).join('\n'));
</script>

<svelte:head>
	<title>Informasi | Admin Panel</title>
</svelte:head>

<div class="wrap">
	<header class="head">
		<h1>Informasi</h1>
		<p class="meta">Kelola konten legalitas dan rekening untuk halaman informasi publik.</p>
	</header>

	{#if form?.message}
		<div class="banner" class:ok={form?.ok === true} class:err={form?.ok !== true} role="status">
			{form.message}
		</div>
	{/if}

	<section class="card">
		<h2>Legalitas</h2>
		<form method="POST" action="?/saveLegalitas" class="stack">
			<div class="grid">
				<label>
					<span>Nomor izin PPIU *</span>
					<input name="ppiuLicenseNumber" type="text" required value={ppiu?.licenseNumber ?? ''} />
				</label>
				<label>
					<span>Berlaku hingga PPIU</span>
					<input name="ppiuValidUntil" type="text" value={ppiu?.validUntil ?? '-'} />
				</label>
			</div>
			<div class="grid">
				<label>
					<span>Nomor izin PIHK *</span>
					<input name="pihkLicenseNumber" type="text" required value={pihk?.licenseNumber ?? ''} />
				</label>
				<label>
					<span>Berlaku hingga PIHK</span>
					<input name="pihkValidUntil" type="text" value={pihk?.validUntil ?? '-'} />
				</label>
			</div>
			<label>
				<span>Dokumen perusahaan (1 baris = 1 dokumen)</span>
				<textarea name="companyDocs" rows="4">{docsText}</textarea>
			</label>
			<button type="submit" class="btn-primary">Simpan legalitas</button>
		</form>
	</section>

	<section class="card">
		<h2>Rekening bank</h2>
		<form method="POST" action="?/saveRekening" class="stack">
			<h3>Bank BSI</h3>
			<div class="grid">
				<label><span>Nama bank *</span><input name="bsiBank" type="text" required value={bsi?.bank ?? ''} /></label>
				<label><span>Cabang</span><input name="bsiBranch" type="text" value={bsi?.branch ?? ''} /></label>
				<label><span>No rekening *</span><input name="bsiNumber" type="text" required value={bsi?.accountNumber ?? ''} /></label>
				<label><span>Atas nama *</span><input name="bsiName" type="text" required value={bsi?.accountName ?? ''} /></label>
				<label><span>Logo URL</span><input name="bsiLogoUrl" type="text" value={bsi?.logoUrl ?? ''} /></label>
				<label><span>Logo alt</span><input name="bsiLogoAlt" type="text" value={bsi?.logoAlt ?? ''} /></label>
			</div>

			<h3>Bank Mandiri</h3>
			<div class="grid">
				<label><span>Nama bank *</span><input name="mandiriBank" type="text" required value={mandiri?.bank ?? ''} /></label>
				<label><span>Cabang</span><input name="mandiriBranch" type="text" value={mandiri?.branch ?? ''} /></label>
				<label><span>No rekening *</span><input name="mandiriNumber" type="text" required value={mandiri?.accountNumber ?? ''} /></label>
				<label><span>Atas nama *</span><input name="mandiriName" type="text" required value={mandiri?.accountName ?? ''} /></label>
				<label><span>Logo URL</span><input name="mandiriLogoUrl" type="text" value={mandiri?.logoUrl ?? ''} /></label>
				<label><span>Logo alt</span><input name="mandiriLogoAlt" type="text" value={mandiri?.logoAlt ?? ''} /></label>
			</div>

			<button type="submit" class="btn-primary">Simpan rekening</button>
		</form>
	</section>
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.head h1 {
		margin: 0;
		font-size: 1.4rem;
	}
	.meta {
		margin: 6px 0 0;
		color: var(--text-light);
		font-weight: 600;
		line-height: 1.45;
		max-width: 56ch;
	}
	.banner {
		padding: 10px 12px;
		border-radius: var(--radius-sm);
		font-weight: 800;
		font-size: 0.93rem;
	}
	.banner.ok {
		color: var(--primary);
		background: rgba(6, 78, 59, 0.08);
		border: 1px solid rgba(6, 78, 59, 0.22);
	}
	.banner.err {
		color: #7f1d1d;
		background: rgba(180, 35, 24, 0.1);
		border: 1px solid rgba(180, 35, 24, 0.22);
	}
	.card {
		background: var(--white);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 18px;
		box-shadow: var(--shadow-soft);
	}
	h2 {
		margin: 0 0 12px;
		font-size: 1.03rem;
	}
	h3 {
		margin: 2px 0 2px;
		font-size: 0.95rem;
		color: var(--text-light);
		font-weight: 700;
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	label span {
		font-size: 0.92rem;
		font-weight: 600;
	}
	input,
	textarea {
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--white);
		padding: 0 12px;
		height: 46px;
		font: inherit;
	}
	textarea {
		resize: vertical;
		min-height: 110px;
		padding: 12px;
	}
	.btn-primary {
		height: 46px;
		padding: 0 12px;
		border-radius: var(--radius-sm);
		border: none;
		font-weight: 800;
		cursor: pointer;
		background: var(--primary);
		color: #fff;
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
