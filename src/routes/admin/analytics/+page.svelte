<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let submitting = $state(false);
	let toast = $state<string | null>(null);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	function showToast(text: string) {
		if (toastTimer) clearTimeout(toastTimer);
		toast = text;
		toastTimer = setTimeout(() => {
			toast = null;
			toastTimer = undefined;
		}, 4500);
	}

	const dt = new Intl.DateTimeFormat('id-ID', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	});
</script>

<svelte:head>
	<title>Analytics | Admin Panel</title>
</svelte:head>

<div class="wrap">
	{#if toast}
		<div class="toast" role="status">{toast}</div>
	{/if}

	<div class="head">
		<h1>Analytics</h1>
		<p class="meta">Kelola integrasi analytics dan pantau event pengunjung secara real-time ringan.</p>
	</div>

	<form
		method="POST"
		action="?/save"
		class="card"
		use:enhance={() => {
			submitting = true;
			return async ({ result, update }) => {
				await update({ reset: false });
				submitting = false;
				if (result.type === 'success') {
					const d = result.data as { ok?: boolean; message?: string } | undefined;
					if (d?.ok && d.message) showToast(d.message);
				}
			};
		}}
	>
		<div class="card-head">
			<h2>Konfigurasi Integrasi</h2>
			<p class="lede">Kelola GA4 dan Meta Pixel dari satu tempat terpisah.</p>
		</div>

		{#if form?.scope === 'analytics' && form.message}
			<div class="banner err" role="alert">{form.message}</div>
		{/if}

		<label class="toggle">
			<div class="toggle-top">
				<span>Tracking analytics aktif</span>
				<input name="trackingEnabled" type="checkbox" checked={Boolean(data.settings.trackingEnabled)} />
			</div>
			<p class="hint">Jika dimatikan, script analytics tidak dimuat dan event tidak dikirim.</p>
		</label>

		<div class="grid">
			<label>
				<span>GA4 Measurement ID</span>
				<input
					name="ga4MeasurementId"
					type="text"
					value={data.settings.ga4MeasurementId}
					placeholder="G-XXXXXXXXXX"
					autocomplete="off"
				/>
			</label>

			<label>
				<span>Meta Pixel ID</span>
				<input
					name="metaPixelId"
					type="text"
					value={data.settings.metaPixelId}
					placeholder="123456789012345"
					autocomplete="off"
				/>
			</label>
		</div>

		<button type="submit" class="btn-submit" disabled={submitting}>
			{submitting ? 'Menyimpan…' : 'Simpan analytics'}
		</button>
	</form>

	<div class="card logs-card">
		<div class="logs-head">
			<div>
				<h2>Event log internal</h2>
				<p class="lede">Menampilkan event {data.days} hari terakhir (maks 250 baris terbaru).</p>
			</div>
			<form method="GET" class="days-filter">
				<label>
					<span>Periode</span>
					<select name="days" onchange={(e) => (e.currentTarget.form as HTMLFormElement).submit()}>
						<option value="7" selected={String(data.days) === '7'}>7 hari</option>
						<option value="14" selected={String(data.days) === '14'}>14 hari</option>
						<option value="30" selected={String(data.days) === '30'}>30 hari</option>
					</select>
				</label>
			</form>
		</div>

		{#if Object.keys(data.eventCounts).length > 0}
			<div class="chips">
				{#each Object.entries(data.eventCounts) as [name, count]}
					<span class="chip">{name}: <strong>{count}</strong></span>
				{/each}
			</div>
		{/if}

		{#if data.logs.length === 0}
			<div class="empty">
				<div class="empty-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
						<path d="M3 12h4l2-5 4 10 2-5h6" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
				<div>
					<p class="empty-title">Belum ada event dalam periode ini.</p>
					<p class="empty-lede">Coba trigger dari halaman publik: klik WhatsApp, copy rekening, atau buka galeri.</p>
				</div>
			</div>
		{:else}
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>Waktu</th>
							<th>Event</th>
							<th>Path</th>
							<th>Payload</th>
						</tr>
					</thead>
					<tbody>
						{#each data.logs as item (item.id)}
							<tr>
								<td>{dt.format(new Date(item.timestamp))}</td>
								<td><code>{item.event}</code></td>
								<td><code>{item.pathname}</code></td>
								<td class="payload"><code>{JSON.stringify(item.payload)}</code></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>

<style>
	.wrap {
		width: 100%;
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
		border: 1px solid rgba(6, 78, 59, 0.28);
		background: rgba(6, 78, 59, 0.08);
		color: var(--primary);
	}
	.card {
		background: var(--white);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 18px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
		max-width: 720px;
	}
	.logs-card {
		max-width: 100%;
	}
	.card-head h2 {
		margin: 0;
		font-size: 1.05rem;
	}
	.lede {
		margin: 6px 0 0;
		color: var(--text-light);
		font-weight: 600;
	}
	.banner.err {
		padding: 10px 12px;
		border-radius: 10px;
		font-weight: 800;
		font-size: 0.95rem;
		color: #7f1d1d;
		background: rgba(180, 35, 24, 0.1);
		border: 1px solid rgba(180, 35, 24, 0.22);
	}
	.toggle {
		padding: 10px 12px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: #fafafa;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.toggle-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	label span {
		font-weight: 600;
		font-size: 0.95rem;
	}
	.toggle input[type='checkbox'] {
		height: 20px;
		width: 20px;
		margin: 0;
		accent-color: var(--primary);
	}
	.hint {
		margin: 0;
		font-size: 0.84rem;
		color: var(--text-light);
		font-weight: 600;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.logs-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}
	.logs-head h2 {
		margin: 0;
		font-size: 1.05rem;
	}
	.days-filter label {
		gap: 4px;
	}
	.days-filter span {
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--text-light);
	}
	.days-filter select {
		height: 38px;
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 0 10px;
		font: inherit;
		background: var(--white);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.chip {
		padding: 6px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: #fafafa;
		font-size: 0.8rem;
		font-weight: 700;
	}
	.empty {
		margin: 0;
		color: var(--text-light);
		font-weight: 700;
		display: flex;
		align-items: flex-start;
		gap: 10px;
		border: 1px dashed var(--border);
		border-radius: 12px;
		padding: 12px;
		background: #fafafa;
	}
	.empty-icon {
		width: 32px;
		height: 32px;
		border-radius: 10px;
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
	.table-wrap {
		width: 100%;
		overflow: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 760px;
	}
	th,
	td {
		padding: 9px 10px;
		border-bottom: 1px solid var(--border);
		text-align: left;
		vertical-align: top;
		font-size: 0.85rem;
	}
	th {
		color: var(--text-light);
		font-weight: 800;
		background: rgba(0, 0, 0, 0.02);
	}
	.payload code {
		white-space: pre-wrap;
		word-break: break-word;
		font-size: 0.76rem;
	}
	input {
		border: 1px solid var(--border);
		border-radius: 10px;
		font: inherit;
		background: var(--white);
		padding: 12px 14px;
		height: 46px;
	}
	.btn-submit {
		margin-top: 4px;
		height: 46px;
		border: 0;
		border-radius: 12px;
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
