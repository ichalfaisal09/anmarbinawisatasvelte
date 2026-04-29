<script lang="ts">
	import { onDestroy } from 'svelte';
	import { enhance } from '$app/forms';

	const MAX_IMAGE_BYTES = 6 * 1024 * 1024;
	const MAX_IMAGE_MB = 6;
	const MAX_IMAGE_DIMENSION = 4096;

	let { form } = $props();

	let createPreviewUrl = $state<string | null>(null);
	let submitting = $state(false);
	let createFileName = $state('');
	let clientError = $state('');

	function revokeUrl(url: string | null) {
		if (!url) return;
		try {
			URL.revokeObjectURL(url);
		} catch {
			// ignore
		}
	}

	async function setCreatePreviewFromInput(input: HTMLInputElement) {
		const file = input.files?.[0];
		revokeUrl(createPreviewUrl);
		createPreviewUrl = null;
		createFileName = '';
		clientError = '';

		if (!file) return;
		if (file.size > MAX_IMAGE_BYTES) {
			input.value = '';
			clientError = `Ukuran gambar maksimal ${MAX_IMAGE_MB}MB. Silakan kompres gambar lalu coba lagi.`;
			return;
		}
		const tempUrl = URL.createObjectURL(file);
		const img = new Image();
		const dimensionOk = await new Promise<boolean>((resolve) => {
			img.onload = () => resolve(img.naturalWidth <= MAX_IMAGE_DIMENSION && img.naturalHeight <= MAX_IMAGE_DIMENSION);
			img.onerror = () => resolve(false);
			img.src = tempUrl;
		});
		URL.revokeObjectURL(tempUrl);
		if (!dimensionOk) {
			input.value = '';
			clientError = `Dimensi gambar maksimal ${MAX_IMAGE_DIMENSION}x${MAX_IMAGE_DIMENSION}px.`;
			return;
		}
		createPreviewUrl = URL.createObjectURL(file);
		createFileName = file.name;
	}

	onDestroy(() => {
		revokeUrl(createPreviewUrl);
	});
</script>

<svelte:head>
	<title>Post Baru | Admin Panel</title>
</svelte:head>

<div class="wrap">
	<div class="head">
		<div>
			<h1>Post Baru</h1>
			<p class="meta">Upload gambar + atur tanggal berakhir promosi.</p>
		</div>
		<a class="btn-ghost" href="/admin">Batal</a>
	</div>

	<form
		method="POST"
		enctype="multipart/form-data"
		class="card"
		onsubmit={(e) => {
			if (clientError) e.preventDefault();
		}}
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		{#if clientError}
			<div class="banner err" role="alert">{clientError}</div>
		{/if}
		{#if form?.message}
			<div class="banner err" role="alert">{form.message}</div>
		{/if}

		<label>
			<span>Judul</span>
			<input name="title" type="text" required value={form?.title ?? ''} />
		</label>

		<label>
			<span>Tanggal berakhir</span>
			<input name="expiresAt" type="datetime-local" required value={form?.expiresAt ?? ''} />
			<p class="field-hint">
				Mengikuti zona waktu peramban Anda. Post tidak tampil di feed setelah waktu ini lewat.
			</p>
		</label>

		<label>
			<span>Gambar</span>
			<div class="upload">
				<input
					id="create-image"
					name="image"
					type="file"
					accept="image/*"
					required
					class="file-native"
					onchange={(e) => setCreatePreviewFromInput(e.currentTarget)}
				/>
				<label class="drop" for="create-image">
					{#if createPreviewUrl}
						<img class="preview" src={createPreviewUrl} alt="Preview gambar" />
						<div class="drop-meta">
							<div class="drop-title">Preview</div>
							<div class="drop-sub">{createFileName}</div>
							<div class="drop-hint">Klik untuk ganti gambar</div>
						</div>
					{:else}
						<div class="drop-empty">
							<div class="drop-title">Pilih gambar</div>
							<div class="drop-sub">JPG / PNG / WEBP / GIF (maks 6MB, 4096x4096px)</div>
							<div class="drop-hint">Klik area ini untuk memilih file</div>
						</div>
					{/if}
				</label>
			</div>
		</label>

		<button type="submit" disabled={submitting}>{submitting ? 'Menyimpan…' : 'Simpan Post'}</button>
	</form>
</div>

<style>
	.wrap {
		width: min(760px, 100%);
	}
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 14px;
	}
	h1 {
		margin: 0;
		font-size: 1.35rem;
	}
	.meta {
		margin: 6px 0 0;
		color: var(--text-light);
		font-weight: 600;
		line-height: 1.45;
		max-width: 52ch;
	}
	.btn-ghost {
		height: 40px;
		padding: 0 14px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border);
		background: var(--white);
		font-weight: 900;
		display: inline-flex;
		align-items: center;
		justify-content: center;
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
	.banner.err {
		padding: 10px 12px;
		border-radius: var(--radius-sm);
		font-weight: 800;
		font-size: 0.95rem;
		color: #7f1d1d;
		background: rgba(180, 35, 24, 0.1);
		border: 1px solid rgba(180, 35, 24, 0.22);
	}
	.field-hint {
		margin: 0;
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--text-light);
		line-height: 1.45;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	label span {
		font-weight: 800;
		font-size: 0.95rem;
	}
	input {
		height: 46px;
		padding: 0 14px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		font: inherit;
		background: var(--white);
		width: 100%;
	}
	button {
		height: 46px;
		border: 0;
		border-radius: var(--radius-sm);
		font-weight: 900;
		cursor: pointer;
		background: var(--primary);
		color: white;
	}
	button:disabled {
		opacity: 0.75;
		cursor: wait;
	}

	.upload {
		position: relative;
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
		border: 1px dashed rgba(6, 78, 59, 0.35);
		border-radius: var(--radius-md);
		background: rgba(6, 78, 59, 0.04);
		padding: 14px;
		min-height: 170px;
		display: grid;
		place-items: center;
		text-align: center;
	}
	.drop:hover {
		border-color: rgba(6, 78, 59, 0.55);
		background: rgba(6, 78, 59, 0.06);
	}
	.drop-title {
		font-weight: 900;
		letter-spacing: -0.02em;
	}
	.drop-sub {
		margin-top: 6px;
		color: var(--text-light);
		font-weight: 700;
		font-size: 0.95rem;
	}
	.drop-hint {
		margin-top: 10px;
		color: var(--text-light);
		font-weight: 700;
		font-size: 0.85rem;
	}
	.preview {
		width: min(100%, 520px);
		height: 240px;
		object-fit: cover;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border);
		background: #f3f4f6;
	}
	.drop-meta {
		margin-top: 10px;
	}
</style>
