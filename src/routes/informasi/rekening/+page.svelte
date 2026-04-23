<script lang="ts">
	import { trackUiEvent } from '$lib/utils/track';

	let { data } = $props();
	const accounts = $derived(data.accounts);

	let copiedId = $state<string | null>(null);

	async function copyNumber(id: string, numberText: string) {
		try {
			await navigator.clipboard.writeText(numberText);
			copiedId = id;
			trackUiEvent('copy_rekening', { accountId: id, status: 'success' });
			setTimeout(() => {
				if (copiedId === id) copiedId = null;
			}, 1400);
		} catch {
			copiedId = null;
			trackUiEvent('copy_rekening', { accountId: id, status: 'failed' });
		}
	}
</script>

<svelte:head>
	<title>Rekening bank | Informasi</title>
	<meta
		name="description"
		content="Rekening resmi pembayaran Anmar Binawisata untuk transfer jamaah."
	/>
</svelte:head>

<article class="page">
	<header class="page-head">
		<h1>Rekening resmi</h1>
		<p class="lede">Pastikan transfer hanya ke rekening atas nama perusahaan berikut.</p>
	</header>

	<div class="stack">
		{#each accounts as account (account.id)}
			<section class="card" aria-labelledby={`${account.id}-bank`}>
				<div class="head">
					<div class="logo">
						<img src={account.logoUrl} alt={account.logoAlt} loading="lazy" decoding="async" />
					</div>
					<div class="head-text">
						<h2 id={`${account.id}-bank`}>{account.bank}</h2>
						<p>{account.branch}</p>
					</div>
				</div>

				<div class="meta-box">
					<div class="row">
						<span class="label">No. Rekening</span>
						<div class="value-wrap">
							<strong class="value">{account.accountNumber}</strong>
							<button
								type="button"
								class="copy-btn"
								onclick={() => copyNumber(account.id, account.accountNumber)}
								aria-label={`Salin nomor rekening ${account.bank}`}
							>
								<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9">
									<rect x="9" y="3" width="11" height="14" rx="2" stroke-linejoin="round" />
									<path d="M5 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" stroke-linecap="round" />
								</svg>
							</button>
						</div>
					</div>
					<div class="row">
						<span class="label">Atas Nama</span>
						<strong class="value">{account.accountName}</strong>
					</div>
				</div>
				{#if copiedId === account.id}
					<p class="copied" role="status">Nomor rekening disalin.</p>
				{/if}
			</section>
		{/each}
	</div>

	<p class="note">
		Jika ada nomor rekening berbeda atas nama pribadi, mohon verifikasi dulu melalui kontak resmi perusahaan.
	</p>
</article>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 0.95rem;
		line-height: 1.55;
		color: var(--text);
	}

	.page-head {
		margin-bottom: 0.15rem;
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
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.card {
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 1rem 1.1rem 1.05rem;
		background: var(--white);
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03), 0 10px 28px rgba(0, 0, 0, 0.05);
	}

	.head {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		margin-bottom: 0.8rem;
	}

	.logo {
		min-width: 72px;
		width: 72px;
		height: 42px;
		border-radius: 8px;
		display: grid;
		place-items: center;
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.06);
		padding: 0.35rem 0.5rem;
		overflow: hidden;
	}

	.logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	.head-text h2 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.25rem;
		letter-spacing: -0.02em;
		color: var(--text);
	}

	.head-text p {
		margin: 0.1rem 0 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-light);
	}

	.meta-box {
		background: rgba(0, 0, 0, 0.02);
		border: 1px solid rgba(0, 0, 0, 0.05);
		border-radius: 10px;
		padding: 0.75rem 0.9rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}

	.label {
		font-size: 0.95rem;
		color: #334155;
		font-weight: 500;
	}

	.value-wrap {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.value {
		font-size: 1.08rem;
		font-weight: 800;
		letter-spacing: 0.01em;
		color: #0f172a;
		text-align: right;
	}

	.copy-btn {
		appearance: none;
		border: none;
		background: transparent;
		color: #16a34a;
		padding: 0.15rem;
		border-radius: 6px;
		display: grid;
		place-items: center;
		cursor: pointer;
	}

	.copy-btn:hover,
	.copy-btn:focus-visible {
		background: rgba(22, 163, 74, 0.12);
		outline: none;
	}

	.copied {
		margin: 0.5rem 0 0;
		font-size: 0.78rem;
		font-weight: 700;
		color: #15803d;
	}

	.note {
		font-size: 0.84rem;
		font-weight: 600;
		line-height: 1.5;
		color: var(--text-light);
	}

	@media (max-width: 440px) {
		.value {
			font-size: 0.98rem;
		}

		.row {
			gap: 0.55rem;
		}
	}
</style>
