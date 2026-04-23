<script lang="ts">
	import { onDestroy } from 'svelte';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let submittingBrand = $state(false);
	let submittingContact = $state(false);
	let submittingSecurity = $state(false);
	let toast = $state<string | null>(null);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	let logoPreview = $state<string | null>(null);
	let logoFileName = $state('');
	let logoInputEl = $state<HTMLInputElement | null>(null);

	const logoDisplay = $derived(logoPreview ?? (data.settings.logoUrl?.trim() || '/logo.svg'));

	function showToast(text: string) {
		if (toastTimer) clearTimeout(toastTimer);
		toast = text;
		toastTimer = setTimeout(() => {
			toast = null;
			toastTimer = undefined;
		}, 4500);
	}

	function revokePreview() {
		if (logoPreview) {
			try {
				URL.revokeObjectURL(logoPreview);
			} catch {
				// ignore
			}
		}
		logoPreview = null;
		logoFileName = '';
	}

	function onLogoPick(input: HTMLInputElement) {
		revokePreview();
		const file = input.files?.[0];
		if (!file) return;
		logoPreview = URL.createObjectURL(file);
		logoFileName = file.name;
	}

	onDestroy(() => {
		revokePreview();
	});
</script>

<svelte:head>
	<title>Settings | Admin Panel</title>
</svelte:head>

<div class="wrap">
	{#if toast}
		<div class="toast" role="status">{toast}</div>
	{/if}

	<div class="head">
		<div>
			<h1>Settings</h1>
			<p class="meta">Atur identitas perusahaan, logo, dan kontak untuk dipakai di website.</p>
		</div>
	</div>

	<div class="cards">
		<form
			method="POST"
			action="?/saveBrand"
			enctype="multipart/form-data"
			class="card"
			use:enhance={() => {
				submittingBrand = true;
				return async ({ result, update }) => {
					/* reset:false: default reset() mengacaukan input value={data...} setelah simpan */
					await update({ reset: false });
					submittingBrand = false;
					if (result.type === 'success') {
						const d = result.data as { ok?: boolean; message?: string } | undefined;
						if (d?.ok && d.message) {
							showToast(d.message);
							if (logoInputEl) logoInputEl.value = '';
							revokePreview();
						}
					}
				};
			}}
		>
			<div class="card-head">
				<h2 class="card-title">Identitas perusahaan</h2>
				<p class="card-sub">Nama dan logo tampil di header website.</p>
			</div>

			{#if form?.scope === 'brand' && form.message}
				<div class="banner err" role="alert">{form.message}</div>
			{/if}

			<label>
				<span>Nama perusahaan</span>
				<input
					name="companyName"
					type="text"
					required
					placeholder="Contoh: Anmar Binawisata"
					value={'scope' in (form ?? {}) && form?.scope === 'brand' && form && 'companyName' in form
						? String(form.companyName ?? '')
						: data.settings.companyName}
				/>
			</label>

			<label>
				<span>Subtitle sidebar admin</span>
				<input
					name="adminSidebarSubtitle"
					type="text"
					maxlength="80"
					placeholder="Admin Panel"
					value={'scope' in (form ?? {}) && form?.scope === 'brand' && form && 'adminSidebarSubtitle' in form
						? String(form.adminSidebarSubtitle ?? '')
						: data.settings.adminSidebarSubtitle}
				/>
				<p class="field-hint">Tampil di bawah nama perusahaan pada menu kiri panel admin.</p>
			</label>

			<div class="logo-block">
				<span class="logo-label">Logo</span>
				<div class="logo-row">
					<div class="logo-preview-wrap">
						<img class="logo-preview" src={logoDisplay} alt="" width="80" height="80" />
					</div>
					<div class="logo-upload">
						<input
							bind:this={logoInputEl}
							id="company-logo"
							name="logo"
							type="file"
							accept="image/jpeg,image/png,image/webp,image/gif"
							class="file-native"
							onchange={(e) => onLogoPick(e.currentTarget)}
						/>
						<label class="drop" for="company-logo">
							<span class="drop-title">{logoFileName || 'Klik untuk pilih logo'}</span>
							<span class="drop-sub">JPG / PNG / WEBP / GIF, maks 2MB. Biarkan kosong untuk mempertahankan logo saat ini.</span>
						</label>
					</div>
				</div>
			</div>

			<button type="submit" class="btn-submit" disabled={submittingBrand}>
				{submittingBrand ? 'Menyimpan…' : 'Simpan identitas'}
			</button>
		</form>

		<form
			method="POST"
			action="?/save"
			class="card"
			use:enhance={() => {
				submittingContact = true;
				return async ({ result, update }) => {
					await update({ reset: false });
					submittingContact = false;
					if (result.type === 'success') {
						const d = result.data as { ok?: boolean; message?: string } | undefined;
						if (d?.ok && d.message) showToast(d.message);
					}
				};
			}}
		>
			<div class="card-head">
				<h2 class="card-title">Kontak & lokasi</h2>
				<p class="card-sub">Nomor WhatsApp, telepon, email, dan tautan peta.</p>
			</div>

			{#if form?.scope === 'contact' && form.message}
				<div class="banner err" role="alert">{form.message}</div>
			{/if}

			<div class="grid">
				<label>
					<span>Nomor WhatsApp (contoh: 62812xxxx)</span>
					<input name="waNumber" type="text" value={data.settings.waNumber} />
				</label>

				<label>
					<span>Telepon Kantor</span>
					<input name="officePhone" type="text" value={data.settings.officePhone} />
				</label>

				<label>
					<span>Email</span>
					<input name="email" type="email" value={data.settings.email} />
				</label>

				<label>
					<span>Jam Kantor</span>
					<input
						id="office-hours"
						name="officeHours"
						type="text"
						value={data.settings.officeHours}
						maxlength="240"
						placeholder="Senin–Jumat: 09.00–17.00 WIB"
						aria-describedby="office-hours-hint"
						autocomplete="off"
					/>
					<p id="office-hours-hint" class="field-hint">
						Satu baris ringkas + zona waktu (mis. <strong>WIB</strong>). Contoh lain: <span class="mono"
							>Senin–Jumat 09.00–17.00 · Sabtu 09.00–12.00 · Minggu libur</span
						>. Teks ini tampil di halaman utama bawah feed.
					</p>
				</label>
			</div>

			<label>
				<span>Alamat</span>
				<textarea name="address" rows="3" value={data.settings.address}></textarea>
			</label>

			<label>
				<span>Link Google Maps</span>
				<input name="mapsUrl" type="url" value={data.settings.mapsUrl} />
			</label>

			<button type="submit" class="btn-submit" disabled={submittingContact}>
				{submittingContact ? 'Menyimpan…' : 'Simpan kontak'}
			</button>
		</form>

		<form
			method="POST"
			action="?/savePassword"
			class="card"
			use:enhance={() => {
				submittingSecurity = true;
				return async ({ result, update }) => {
					await update({ reset: false });
					submittingSecurity = false;
					if (result.type === 'success') {
						const d = result.data as { ok?: boolean; message?: string } | undefined;
						if (d?.ok && d.message) showToast(d.message);
					}
				};
			}}
		>
			<div class="card-head">
				<h2 class="card-title">Keamanan admin</h2>
				<p class="card-sub">Ganti password login panel admin.</p>
			</div>

			{#if form?.scope === 'security' && form.message}
				<div class="banner err" role="alert">{form.message}</div>
			{/if}

			<div class="grid">
				<label>
					<span>Password lama</span>
					<input name="currentPassword" type="password" autocomplete="current-password" required />
				</label>
				<label>
					<span>Password baru (minimal 10 karakter)</span>
					<input name="newPassword" type="password" autocomplete="new-password" minlength="10" required />
				</label>
				<label>
					<span>Konfirmasi password baru</span>
					<input name="confirmPassword" type="password" autocomplete="new-password" minlength="10" required />
				</label>
			</div>

			<button type="submit" class="btn-submit" disabled={submittingSecurity}>
				{submittingSecurity ? 'Menyimpan…' : 'Simpan password'}
			</button>
		</form>
	</div>
</div>

<style>
	.wrap {
		width: 100%;
	}
	.head {
		margin-bottom: 14px;
	}
	h1 {
		margin: 0;
		font-size: 1.4rem;
	}
	.meta {
		margin: 6px 0 0;
		color: var(--text-light);
		font-weight: 600;
		max-width: 52ch;
		line-height: 1.45;
	}
	.cards {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.card {
		background: var(--white);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 18px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		box-shadow: var(--shadow-soft);
	}
	.card-head {
		margin-bottom: 2px;
	}
	.card-title {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 900;
		letter-spacing: -0.02em;
	}
	.card-sub {
		margin: 6px 0 0;
		color: var(--text-light);
		font-weight: 600;
		font-size: 0.9rem;
		line-height: 1.4;
	}
	.toast {
		position: fixed;
		right: 18px;
		bottom: 18px;
		z-index: 60;
		max-width: min(420px, calc(100vw - 36px));
		padding: 12px 14px;
		border-radius: var(--radius-md);
		font-weight: 800;
		box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
		border: 1px solid rgba(6, 78, 59, 0.28);
		background: rgba(6, 78, 59, 0.08);
		color: var(--primary);
	}
	.banner.err {
		padding: 10px 12px;
		border-radius: var(--radius-sm);
		font-weight: 800;
		font-size: 0.95rem;
		color: #7f1d1d;
		background: rgba(180, 35, 24, 0.1);
		border: 1px solid rgba(180, 35, 24, 0.22);
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	label span,
	.logo-label {
		font-weight: 600;
		font-size: 0.95rem;
	}
	.field-hint {
		margin: 0;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--text-light);
		line-height: 1.45;
		max-width: 62ch;
	}
	.field-hint .mono {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--text);
	}
	input,
	textarea {
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		font: inherit;
		background: var(--white);
		padding: 12px 14px;
	}
	input {
		height: 46px;
	}
	textarea {
		resize: vertical;
		min-height: 96px;
	}

	.logo-block {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.logo-row {
		display: flex;
		gap: 14px;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	.logo-preview-wrap {
		flex: 0 0 auto;
		width: 88px;
		height: 88px;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 1px solid var(--border);
		background: #f4f4f5;
	}
	.logo-preview {
		width: 88px;
		height: 88px;
		object-fit: cover;
		display: block;
	}
	.logo-upload {
		flex: 1;
		min-width: 200px;
		position: relative;
		min-height: 88px;
	}
	.file-native {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
	.drop {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 12px 14px;
		border: 1px dashed rgba(6, 78, 59, 0.35);
		border-radius: var(--radius-md);
		background: rgba(6, 78, 59, 0.04);
		min-height: 88px;
		justify-content: center;
		pointer-events: none;
	}
	.logo-upload:hover .drop {
		border-color: rgba(6, 78, 59, 0.55);
		background: rgba(6, 78, 59, 0.07);
	}
	.drop-title {
		font-weight: 800;
		color: var(--text);
	}
	.drop-sub {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-light);
		line-height: 1.4;
	}

	.btn-submit {
		margin-top: 4px;
		height: 46px;
		border: 0;
		border-radius: var(--radius-sm);
		font-weight: 800;
		cursor: pointer;
		background: var(--primary);
		color: white;
	}
	.btn-submit:disabled {
		opacity: 0.75;
		cursor: wait;
	}
	@media (max-width: 760px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
