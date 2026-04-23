<script lang="ts">
	import { onMount } from 'svelte';

	const TZ_MAKASSAR = 'Asia/Makassar';
	const TZ_MEKKAH = 'Asia/Riyadh';

	let ready = $state(false);
	let tick = $state(0);

	const clocks = $derived.by(() => {
		void tick;
		const d = new Date();

		const timeHm = (tz: string) =>
			new Intl.DateTimeFormat('en-GB', {
				timeZone: tz,
				hour: '2-digit',
				minute: '2-digit',
				hourCycle: 'h23'
			}).format(d);

		const dateLong = (tz: string) =>
			new Intl.DateTimeFormat('id-ID', {
				timeZone: tz,
				weekday: 'short',
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			}).format(d);

		/** Hijriah resmi Arab Saudi (Umm al-Qura), zona Mekkah. */
		let mkkDateHijri: string | null = null;
		try {
			mkkDateHijri = new Intl.DateTimeFormat('id-ID', {
				timeZone: TZ_MEKKAH,
				calendar: 'islamic-umalqura',
				weekday: 'short',
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			}).format(d);
		} catch {
			mkkDateHijri = null;
		}

		return {
			mksTime: timeHm(TZ_MAKASSAR),
			mksDate: dateLong(TZ_MAKASSAR),
			mkkTime: timeHm(TZ_MEKKAH),
			mkkDate: dateLong(TZ_MEKKAH),
			mkkDateHijri
		};
	});

	onMount(() => {
		ready = true;
		tick += 1;
		const id = setInterval(() => {
			tick += 1;
		}, 30_000);
		return () => clearInterval(id);
	});
</script>

<section class="strip" aria-labelledby="tz-heading">
	<div class="strip-head">
		<h2 id="tz-heading" class="strip-title">Referensi waktu</h2>
		<p class="strip-lede">
			Makassar (Masehi, WITA). Mekkah: jam AST + tanggal <strong>Hijriah</strong> (Umm al-Qura).
		</p>
	</div>
	<div class="strip-grid">
		<div class="cell">
			<h3 class="cell-label">Makassar</h3>
			<p class="cell-meta">Masehi · WITA</p>
			{#if ready}
				<p class="cell-time">{clocks.mksTime}</p>
				<p class="cell-date">{clocks.mksDate}</p>
			{:else}
				<p class="cell-skel">Memuat…</p>
			{/if}
		</div>
		<div class="cell-divider" aria-hidden="true"></div>
		<div class="cell">
			<h3 class="cell-label">Mekkah</h3>
			<p class="cell-meta">Hijriah · AST</p>
			{#if ready}
				<p class="cell-time">{clocks.mkkTime}</p>
				{#if clocks.mkkDateHijri}
					<p class="cell-date">{clocks.mkkDateHijri}</p>
				{:else}
					<p class="cell-date">{clocks.mkkDate}</p>
				{/if}
			{:else}
				<p class="cell-skel">Memuat…</p>
			{/if}
		</div>
	</div>
</section>

<style>
	.strip {
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: linear-gradient(132deg, #ffffff 0%, #f0fdf9 38%, #fffbeb 72%, #ffffff 100%);
		background-size: 220% 220%;
		animation: strip-shift 26s ease-in-out infinite;
		padding: 0.85rem 0.95rem 0.95rem;
		box-shadow: var(--shadow-soft);
	}

	@keyframes strip-shift {
		0%,
		100% {
			background-position: 0% 40%;
		}
		50% {
			background-position: 100% 60%;
		}
	}

	.strip-head {
		margin-bottom: 0.72rem;
		text-align: center;
	}

	.strip-title {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 680;
		letter-spacing: var(--tracking-tight);
		margin: 0 0 0.2rem;
		color: var(--text);
	}

	.strip-lede {
		margin: 0;
		font-size: 0.76rem;
		font-weight: 620;
		line-height: 1.38;
		color: var(--text-light);
	}

	.strip-grid {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 0 0.65rem;
		align-items: stretch;
	}

	.cell-divider {
		width: 1px;
		background: rgba(0, 0, 0, 0.08);
		align-self: stretch;
		min-height: 3.5rem;
	}

	.cell {
		padding: 0.68rem 0.75rem 0.76rem;
		border-radius: var(--radius-sm);
		background: rgba(6, 78, 59, 0.05);
		border: 1px solid rgba(6, 78, 59, 0.12);
		min-width: 0;
		min-height: 7.25rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 0.24rem;
		transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
	}

	.cell:hover {
		transform: translateY(-1px);
		box-shadow: 0 6px 18px rgba(6, 78, 59, 0.1);
		border-color: rgba(6, 78, 59, 0.22);
	}

	.cell-label {
		margin: 0;
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--primary);
		line-height: 1.2;
	}

	.cell-meta {
		margin: 0;
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		color: var(--text-light);
		line-height: 1.25;
	}

	.cell-date {
		margin: 0;
		font-size: 0.73rem;
		font-weight: 620;
		color: var(--text-light);
		line-height: 1.35;
		max-width: 100%;
	}

	.cell-time {
		margin: 0;
		font-size: 1.18rem;
		font-weight: 900;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.02em;
		color: var(--text);
		line-height: 1.15;
	}

	.cell-skel {
		margin: 0.35rem 0 0;
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--text-light);
	}

	@media (min-width: 640px) {
		.strip-head {
			display: flex;
			flex-wrap: wrap;
			align-items: baseline;
			justify-content: center;
			gap: 0.35rem 0.65rem;
			margin-bottom: 0.55rem;
		}
		.strip-title {
			margin-bottom: 0;
		}
		.strip-lede {
			font-size: 0.76rem;
		}
		.cell-time {
			font-size: 1.08rem;
		}
		.cell {
			min-height: 6.85rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.strip {
			animation: none;
			background: var(--white);
		}

		.cell {
			transition: none;
		}

		.cell:hover {
			transform: none;
			box-shadow: none;
		}
	}

	@media (max-width: 420px) {
		.strip-grid {
			grid-template-columns: 1fr;
			gap: 0.5rem 0;
		}
		.cell-divider {
			display: none;
		}
		.cell {
			min-height: 6.9rem;
		}
	}
</style>
