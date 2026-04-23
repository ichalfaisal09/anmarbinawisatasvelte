<script lang="ts">
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	let { data } = $props();

	type PostFilter = 'all' | 'active' | 'expired';
	let filter = $state<PostFilter>('active');
	let pendingDelete = $state<{ id: number; title: string } | null>(null);
	let deleteSubmitting = $state(false);
	let toast = $state<{ kind: 'ok' | 'err'; text: string } | null>(null);

	let deleteModalEl = $state<HTMLDivElement | null>(null);
	let returnFocusEl: HTMLElement | null = null;

	function getFocusable(root: HTMLElement): HTMLElement[] {
		const sel =
			'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
		return Array.from(root.querySelectorAll<HTMLElement>(sel)).filter((el) => !el.closest('[inert]'));
	}

	function openDeleteConfirm(post: { id: number; title: string }) {
		returnFocusEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		pendingDelete = post;
	}

	function onDeleteModalKeydown(e: KeyboardEvent) {
		if (!pendingDelete || !deleteModalEl || e.key !== 'Tab') return;
		const nodes = getFocusable(deleteModalEl);
		if (nodes.length === 0) return;
		const first = nodes[0];
		const last = nodes[nodes.length - 1];
		if (e.shiftKey) {
			if (document.activeElement === first) {
				e.preventDefault();
				last.focus();
			}
		} else if (document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	$effect(() => {
		if (!pendingDelete || !deleteModalEl) return;
		const trigger = returnFocusEl;
		void tick().then(() => {
			if (!deleteModalEl) return;
			const nodes = getFocusable(deleteModalEl);
			(nodes[0] ?? deleteModalEl).focus();
		});
		return () => {
			if (trigger && document.contains(trigger)) trigger.focus();
		};
	});

	let toastTimer: ReturnType<typeof setTimeout> | undefined;
	function showToast(kind: 'ok' | 'err', text: string) {
		if (toastTimer) clearTimeout(toastTimer);
		toast = { kind, text };
		toastTimer = setTimeout(() => {
			toast = null;
			toastTimer = undefined;
		}, 4500);
	}

	function dismissNotice() {
		goto('/admin', { replaceState: true, noScroll: true });
	}

	function noticeLabel() {
		if (data.notice === 'created') return 'Post baru berhasil dibuat.';
		if (data.notice === 'updated') return 'Perubahan berhasil disimpan.';
		return '';
	}

	const dt = new Intl.DateTimeFormat('id-ID', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	});

	function formatDateTime(iso: string) {
		const d = new Date(iso);
		if (!Number.isFinite(d.getTime())) return '-';
		return dt.format(d);
	}

	const counts = $derived.by(() => {
		const now = Date.now();
		let active = 0;
		let expired = 0;
		for (const p of data.posts) {
			if (Date.parse(p.expiresAt) > now) active += 1;
			else expired += 1;
		}
		return { active, expired, all: data.posts.length };
	});

	const visiblePosts = $derived.by(() => {
		const now = Date.now();
		if (filter === 'all') return data.posts;
		if (filter === 'active') return data.posts.filter((p) => Date.parse(p.expiresAt) > now);
		return data.posts.filter((p) => Date.parse(p.expiresAt) <= now);
	});

	function isExpired(iso: string) {
		return Date.parse(iso) <= Date.now();
	}
</script>

<svelte:head>
	<title>Posts | Admin Panel</title>
</svelte:head>

<svelte:window
	onkeydown={(e) => {
		if (pendingDelete && e.key === 'Escape') pendingDelete = null;
		else onDeleteModalKeydown(e);
	}}
/>

<div class="wrap">
	{#if data.notice}
		<div class="notice" role="status">
			<p class="notice-text">{noticeLabel()}</p>
			<button type="button" class="notice-dismiss" onclick={dismissNotice}>Tutup</button>
		</div>
	{/if}

	{#if toast}
		<div class="toast" class:toast-ok={toast.kind === 'ok'} class:toast-err={toast.kind === 'err'} role="status">
			{toast.text}
		</div>
	{/if}

	<div class="head">
		<div>
			<h1>Posts</h1>
			<p class="meta">Daftar post feed + kontrol masa tayang.</p>
		</div>
		<div class="head-right">
			<div class="stat">
				<span>Aktif <strong>{counts.active}</strong></span>
				<span class="dot">•</span>
				<span>Expired <strong>{counts.expired}</strong></span>
				<span class="dot">•</span>
				<span>Total <strong>{counts.all}</strong></span>
			</div>
			<a class="btn-primary" href="/admin/posts/new">Post Baru</a>
		</div>
	</div>

	<div class="card">
		{#if data.posts.length === 0}
			<div class="empty-hero">
				<div class="empty-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.6">
						<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
						<rect x="3" y="5" width="18" height="14" rx="2" />
						<circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
					</svg>
				</div>
				<h2 class="empty-title">Belum ada post di feed</h2>
				<p class="empty-lede">Buat post pertama untuk mulai menampilkan promo di halaman utama.</p>
				<a class="btn-primary empty-cta" href="/admin/posts/new">Post Baru</a>
			</div>
		{:else}
			<div class="tabs" role="tablist" aria-label="Filter post">
				<button
					type="button"
					class:active={filter === 'active'}
					onclick={() => (filter = 'active')}
					role="tab"
					aria-selected={filter === 'active'}
				>
					Aktif <span class="tab-count">({counts.active})</span>
				</button>
				<button
					type="button"
					class:active={filter === 'expired'}
					onclick={() => (filter = 'expired')}
					role="tab"
					aria-selected={filter === 'expired'}
				>
					Expired <span class="tab-count">({counts.expired})</span>
				</button>
				<button
					type="button"
					class:active={filter === 'all'}
					onclick={() => (filter = 'all')}
					role="tab"
					aria-selected={filter === 'all'}
				>
					Semua <span class="tab-count">({counts.all})</span>
				</button>
			</div>

			{#if visiblePosts.length === 0}
				<p class="empty">
					Tidak ada post di filter ini. Coba pilih tab <strong>Semua</strong>.
				</p>
			{:else}
				<div class="table-wrap">
					<table class="table">
						<thead>
							<tr>
								<th class="th-thumb">Thumbnail</th>
								<th>Judul</th>
								<th class="th-date">Tanggal post</th>
								<th class="th-date">Tanggal berakhir</th>
								<th class="th-actions">Aksi</th>
							</tr>
						</thead>
						<tbody>
							{#each visiblePosts as post (post.id)}
								<tr>
									<td class="td-thumb">
										<div class="thumb-wrap">
											<img class="thumb" src={post.imageUrl} alt={post.title} loading="lazy" />
										</div>
									</td>
									<td class="td-title">
										<div class="title-row">
											<span class="badge" class:bad={isExpired(post.expiresAt)}>
												{isExpired(post.expiresAt) ? 'Expired' : 'Aktif'}
											</span>
										</div>
										<div class="title-text">{post.title}</div>
									</td>
									<td class="td-muted">{formatDateTime(post.createdAt)}</td>
									<td class="td-muted">{formatDateTime(post.expiresAt)}</td>
									<td class="td-actions">
										<div class="actions">
											<a class="link-edit" href={`/admin/posts/${post.id}/edit`}>Edit</a>
											<button type="button" class="btn-del" onclick={() => openDeleteConfirm(post)}>
												Hapus
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		{/if}
	</div>

	<p class="hint">Upload gambar disimpan di <code>static/uploads</code>.</p>
</div>

{#if pendingDelete}
	<button
		type="button"
		class="modal-backdrop"
		tabindex="-1"
		aria-label="Tutup dialog"
		onclick={() => (pendingDelete = null)}
	></button>
	<div
		bind:this={deleteModalEl}
		class="modal"
		role="dialog"
		aria-modal="true"
		aria-labelledby="del-title"
		tabindex="-1"
	>
		<h2 id="del-title" class="modal-title">Hapus post?</h2>
		<p class="modal-body">
			Post <strong>{pendingDelete.title}</strong> akan dihapus permanen beserta file gambarnya (jika tersimpan di
			server).
		</p>
		<form
			method="POST"
			action="?/delete"
			class="modal-actions"
			use:enhance={() => {
				deleteSubmitting = true;
				return async ({ result, update }) => {
					await update({ reset: false });
					deleteSubmitting = false;
					if (result.type === 'success' && result.data && 'success' in result.data && result.data.success) {
						pendingDelete = null;
						const d = result.data as { success: true; message: string };
						showToast('ok', d.message);
					} else if (result.type === 'failure') {
						const d = result.data as { message?: string } | undefined;
						showToast('err', d?.message ?? 'Gagal menghapus post.');
					}
				};
			}}
		>
			<input type="hidden" name="id" value={pendingDelete.id} />
			<button type="button" class="btn-modal-ghost" onclick={() => (pendingDelete = null)} disabled={deleteSubmitting}>
				Batal
			</button>
			<button type="submit" class="btn-modal-danger" disabled={deleteSubmitting}>
				{deleteSubmitting ? 'Menghapus…' : 'Ya, hapus'}
			</button>
		</form>
	</div>
{/if}

<style>
	.notice {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 14px;
		border-radius: 12px;
		border: 1px solid rgba(6, 78, 59, 0.22);
		background: rgba(6, 78, 59, 0.08);
		margin-bottom: 12px;
	}
	.notice-text {
		margin: 0;
		font-weight: 800;
		color: var(--primary);
	}
	.notice-dismiss {
		height: 36px;
		padding: 0 12px;
		border-radius: 10px;
		border: 1px solid var(--border);
		background: var(--white);
		font-weight: 900;
		cursor: pointer;
		white-space: nowrap;
	}
	.notice-dismiss:hover {
		border-color: rgba(6, 78, 59, 0.35);
	}

	.toast {
		position: fixed;
		right: 18px;
		bottom: 18px;
		z-index: 60;
		max-width: min(420px, calc(100vw - 36px));
		padding: 12px 14px;
		border-radius: 12px;
		font-weight: 800;
		box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
		border: 1px solid var(--border);
		background: var(--white);
		color: var(--text);
	}
	.toast-ok {
		border-color: rgba(6, 78, 59, 0.28);
		background: rgba(6, 78, 59, 0.08);
		color: var(--primary);
	}
	.toast-err {
		border-color: rgba(180, 35, 24, 0.28);
		background: rgba(180, 35, 24, 0.08);
		color: #7f1d1d;
	}

	.wrap {
		width: 100%;
	}
	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 14px;
	}
	h1 {
		font-size: 1.4rem;
		margin: 0;
	}
	.meta {
		color: var(--text-light);
		margin: 6px 0 0;
		font-weight: 700;
	}
	.head-right {
		display: flex;
		gap: 10px;
		align-items: center;
		flex-wrap: wrap;
		justify-content: flex-end;
	}
	.stat {
		min-height: 40px;
		height: auto;
		padding: 10px 14px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--white);
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 900;
		flex-wrap: wrap;
		row-gap: 6px;
	}
	.dot {
		opacity: 0.45;
		font-weight: 900;
	}
	.btn-primary {
		height: 40px;
		padding: 0 14px;
		border-radius: 12px;
		border: 0;
		background: var(--primary);
		color: white;
		font-weight: 900;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.card {
		background: var(--white);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 0;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}

	.tabs {
		display: flex;
		gap: 8px;
		padding: 12px 12px 0;
		flex-wrap: wrap;
		border-bottom: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.015);
	}
	.tabs button {
		border: 1px solid transparent;
		background: transparent;
		color: var(--text-light);
		font-weight: 900;
		padding: 10px 12px;
		border-radius: 12px 12px 0 0;
		cursor: pointer;
	}
	.tabs button:hover {
		background: rgba(0, 0, 0, 0.03);
		color: var(--text);
	}
	.tabs button.active {
		background: var(--white);
		color: var(--primary);
		border-color: var(--border);
		border-bottom-color: var(--white);
		margin-bottom: -1px;
	}
	.tab-count {
		font-weight: 900;
		color: var(--text-light);
	}

	.table-wrap {
		width: 100%;
		overflow: auto;
	}
	.table {
		width: 100%;
		border-collapse: collapse;
		min-width: 920px;
	}
	thead th {
		text-align: left;
		font-size: 0.85rem;
		color: var(--text-light);
		font-weight: 900;
		padding: 12px 14px;
		border-bottom: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.02);
		white-space: nowrap;
	}
	tbody td {
		vertical-align: middle;
		padding: 12px 14px;
		border-bottom: 1px solid var(--border);
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}

	.th-thumb {
		width: 120px;
	}
	.th-date {
		width: 210px;
	}
	.th-actions {
		width: 220px;
	}

	.td-thumb {
		position: relative;
	}
	.thumb-wrap {
		width: 96px;
		height: 96px;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid var(--border);
		background: #f3f4f6;
	}
	.thumb {
		width: 96px;
		height: 96px;
		display: block;
		object-fit: cover;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}
	.badge {
		display: inline-flex;
		align-items: center;
		height: 22px;
		padding: 0 10px;
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		border: 1px solid rgba(6, 78, 59, 0.22);
		background: rgba(6, 78, 59, 0.1);
		color: var(--primary);
	}
	.badge.bad {
		border-color: rgba(180, 35, 24, 0.25);
		background: rgba(180, 35, 24, 0.1);
		color: #7f1d1d;
	}
	.title-text {
		font-weight: 900;
		letter-spacing: -0.02em;
	}

	.td-muted {
		color: var(--text-light);
		font-weight: 800;
		font-size: 0.9rem;
		white-space: nowrap;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}
	.link-edit {
		font-weight: 900;
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.btn-del {
		height: 36px;
		padding: 0 12px;
		border-radius: 10px;
		font-weight: 900;
		border: 0;
		cursor: pointer;
		background: #b42318;
		color: white;
	}

	.empty {
		padding: 16px 14px;
		color: var(--text-light);
		font-weight: 800;
		margin: 0;
	}

	.empty-hero {
		padding: 44px 18px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
	.empty-icon {
		width: 72px;
		height: 72px;
		border-radius: 18px;
		display: grid;
		place-items: center;
		color: var(--primary);
		background: rgba(6, 78, 59, 0.1);
		border: 1px solid rgba(6, 78, 59, 0.18);
	}
	.empty-title {
		margin: 10px 0 0;
		font-size: 1.2rem;
		font-weight: 900;
		letter-spacing: -0.02em;
	}
	.empty-lede {
		margin: 0;
		max-width: 44ch;
		color: var(--text-light);
		font-weight: 700;
		line-height: 1.5;
	}
	.empty-cta {
		margin-top: 8px;
		text-decoration: none;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
		padding: 0;
		margin: 0;
		background: rgba(15, 23, 42, 0.45);
		cursor: pointer;
		appearance: none;
	}
	.modal {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 55;
		width: min(92vw, 440px);
		background: var(--white);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 18px;
		box-shadow: 0 22px 60px rgba(0, 0, 0, 0.22);
	}
	.modal-title {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 900;
		letter-spacing: -0.02em;
	}
	.modal-body {
		margin: 10px 0 0;
		color: var(--text-light);
		font-weight: 700;
		line-height: 1.45;
	}
	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 16px;
	}
	.btn-modal-ghost {
		height: 40px;
		padding: 0 14px;
		border-radius: 12px;
		border: 1px solid var(--border);
		background: var(--white);
		font-weight: 900;
		cursor: pointer;
	}
	.btn-modal-ghost:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}
	.btn-modal-danger {
		height: 40px;
		padding: 0 14px;
		border-radius: 12px;
		border: 0;
		background: #b42318;
		color: white;
		font-weight: 900;
		cursor: pointer;
	}
	.btn-modal-danger:disabled {
		opacity: 0.75;
		cursor: wait;
	}
	.hint {
		margin-top: 12px;
		color: var(--text-light);
		font-size: 0.9rem;
	}
	code {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
	}

	@media (max-width: 900px) {
		.head {
			flex-direction: column;
			align-items: stretch;
		}
		.head-right {
			justify-content: flex-start;
		}
	}
</style>
