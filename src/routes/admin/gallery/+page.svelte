<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Galeri | Admin Panel</title>
</svelte:head>

<div class="wrap">
	<header class="head">
		<h1>Galeri</h1>
		<p class="meta">Kelola foto galeri publik: tambah, edit, dan hapus.</p>
	</header>

	{#if form?.message}
		<div class="banner" class:err={form?.ok !== true} class:ok={form?.ok === true} role="status">
			{form.message}
		</div>
	{/if}

	<section class="card">
		<h2>Tambah foto</h2>
		<form method="POST" action="?/add" enctype="multipart/form-data" class="stack">
			<div class="grid">
				<label>
					<span>Alt text *</span>
					<input name="alt" type="text" required placeholder="Contoh: Jamaah umrah di Masjidil Haram" />
				</label>
				<label>
					<span>Caption (opsional)</span>
					<input name="caption" type="text" placeholder="Contoh: Dokumentasi umrah Ramadhan" />
				</label>
			</div>
			<div class="grid">
				<label>
					<span>Image URL (opsional)</span>
					<input name="imageUrl" type="text" placeholder="/uploads/gallery/nama-file.webp" />
				</label>
				<label>
					<span>Upload file (opsional)</span>
					<input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
				</label>
			</div>
			<p class="hint">Isi salah satu: URL gambar atau upload file baru (maks 6MB).</p>
			<button type="submit" class="btn-primary">Tambah foto</button>
		</form>
	</section>

	<section class="card">
		<h2>Daftar foto ({data.gallery.length})</h2>
		{#if data.gallery.length === 0}
			<div class="empty">
				<div class="empty-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
						<path d="M4 16l4.5-4.5a2 2 0 0 1 2.8 0l2.2 2.2 2.4-2.4a2 2 0 0 1 2.8 0L20 12.6" />
						<rect x="3" y="5" width="18" height="14" rx="2" />
						<circle cx="8.5" cy="9.5" r="1.2" fill="currentColor" stroke="none" />
					</svg>
				</div>
				<div>
					<p class="empty-title">Belum ada data galeri.</p>
					<p class="empty-lede">Tambahkan foto pertama untuk mulai menampilkan dokumentasi di halaman publik.</p>
				</div>
			</div>
		{:else}
			<div class="list">
				{#each data.gallery as item (item.id)}
					<article class="item">
						<div class="preview">
							<img src={item.imageUrl} alt={item.alt} loading="lazy" />
						</div>
						<form method="POST" action="?/update" enctype="multipart/form-data" class="item-form">
							<input type="hidden" name="id" value={item.id} />
							<div class="grid">
								<label>
									<span>Alt text *</span>
									<input name="alt" type="text" required value={item.alt} />
								</label>
								<label>
									<span>Caption</span>
									<input name="caption" type="text" value={item.caption ?? ''} />
								</label>
							</div>
							<div class="grid">
								<label>
									<span>Image URL</span>
									<input name="imageUrl" type="text" value={item.imageUrl} />
								</label>
								<label>
									<span>Ganti file (opsional)</span>
									<input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
								</label>
							</div>
							<div class="actions">
								<button type="submit" class="btn-secondary">Simpan perubahan</button>
							</div>
						</form>
						<form method="POST" action="?/delete" class="delete-form">
							<input type="hidden" name="id" value={item.id} />
							<button type="submit" class="btn-danger">Hapus</button>
						</form>
					</article>
				{/each}
			</div>
		{/if}
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
	.card h2 {
		margin: 0 0 12px;
		font-size: 1.02rem;
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
	input {
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--white);
		padding: 0 12px;
		height: 46px;
		font: inherit;
	}
	.hint {
		margin: 0;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--text-light);
	}
	.btn-primary,
	.btn-secondary,
	.btn-danger {
		height: 46px;
		padding: 0 12px;
		border-radius: var(--radius-sm);
		border: none;
		font-weight: 800;
		cursor: pointer;
	}
	.btn-primary {
		background: var(--primary);
		color: #fff;
	}
	.btn-secondary {
		background: #0f172a;
		color: #fff;
	}
	.btn-danger {
		background: #b42318;
		color: #fff;
	}
	.empty {
		margin: 0;
		color: var(--text-light);
		font-weight: 700;
		display: flex;
		align-items: flex-start;
		gap: 10px;
		border: 1px dashed var(--border);
		border-radius: var(--radius-md);
		padding: 12px;
		background: #fafafa;
	}
	.empty-icon {
		width: 32px;
		height: 32px;
		border-radius: var(--radius-sm);
		display: grid;
		place-items: center;
		color: var(--primary);
		background: rgba(6, 78, 59, 0.1);
		flex-shrink: 0;
	}
	.empty-title {
		margin: 0;
		color: var(--text);
		font-size: 0.9rem;
		font-weight: 800;
	}
	.empty-lede {
		margin: 4px 0 0;
		font-size: 0.8rem;
		line-height: 1.4;
		font-weight: 600;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.item {
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 12px;
		display: grid;
		grid-template-columns: 110px 1fr auto;
		gap: 12px;
		align-items: start;
	}
	.preview {
		width: 110px;
		aspect-ratio: 1;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		overflow: hidden;
		background: #f3f4f6;
	}
	.preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.item-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.actions {
		display: flex;
		justify-content: flex-start;
	}
	.delete-form {
		display: flex;
		align-items: start;
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.item {
			grid-template-columns: 1fr;
		}
		.preview {
			width: 100%;
			max-width: 180px;
		}
	}
</style>
