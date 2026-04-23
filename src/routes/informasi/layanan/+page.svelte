<script lang="ts">
	const programs = [
		{
			id: 'umrah' as const,
			title: 'Umrah Regular',
			description: 'Program umrah dengan pelayanan terbaik dan pembimbing berpengalaman.',
			tags: ['9 Hari', 'Hotel *4', 'Visa Umrah']
		},
		{
			id: 'haji' as const,
			title: 'Haji Khusus',
			description: 'Program haji khusus dengan fasilitas premium dan pendampingan penuh.',
			tags: ['25 Hari', 'Hotel *5', 'Visa Haji']
		}
	];

	const extras = [
		{
			id: 'visa',
			title: 'Proses Visa',
			description: 'Pengurusan visa cepat dan aman',
			icon: 'passport' as const
		},
		{
			id: 'hotel',
			title: 'Hotel',
			description: 'Akomodasi nyaman & strategis',
			icon: 'hotel' as const
		},
		{
			id: 'transport',
			title: 'Transportasi',
			description: 'Armada modern & nyaman',
			icon: 'bus' as const
		},
		{
			id: 'muthowif',
			title: 'Muthowif',
			description: 'Pembimbing berpengalaman',
			icon: 'guide' as const
		}
	];
</script>

<svelte:head>
	<title>Layanan | Informasi</title>
	<meta
		name="description"
		content="Program Umrah Regular, Haji Khusus, dan layanan tambahan: visa, hotel, transportasi, muthowif — Anmar Binawisata."
	/>
</svelte:head>

<article class="page">
	<header class="page-head">
		<h1>Layanan</h1>
		<p class="lede">Paket ibadah dan pendukung perjalanan jamaah umrah & haji.</p>
	</header>

	<div class="programs">
		{#each programs as p (p.id)}
			<section class="card card--program" aria-labelledby="prog-{p.id}">
				<div class="badge badge--lg" aria-hidden="true">
					{#if p.id === 'umrah'}
						<svg
							viewBox="0 0 24 24"
							width="26"
							height="26"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
						>
							<path d="M12 2.5 5.5 6v12L12 21.5 18.5 18V6L12 2.5Z" stroke-linejoin="round" />
							<path d="M5.5 6 12 9.5 18.5 6M12 9.5V21.5" stroke-linecap="round" />
							<path d="M9 12h6M9 15h6" stroke-linecap="round" />
						</svg>
					{:else}
						<svg
							viewBox="0 0 24 24"
							width="26"
							height="26"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
						>
							<path d="M4 21h16M8 21V12l2-1V8h4v3l2 1v9" stroke-linejoin="round" />
							<path d="M8 12c0-3 2.5-5 4-6.5 1.5 1.5 4 3.5 4 6.5" stroke-linecap="round" />
							<path d="M11 16h2" stroke-linecap="round" />
						</svg>
					{/if}
				</div>
				<div class="program-body">
					<h2 id="prog-{p.id}">{p.title}</h2>
					<p class="desc">{p.description}</p>
					<ul class="tags" aria-label="Ringkasan paket">
						{#each p.tags as tag (tag)}
							<li class="tag">{tag}</li>
						{/each}
					</ul>
				</div>
			</section>
		{/each}
	</div>

	<section class="extra-section" aria-labelledby="extra-heading">
		<h2 id="extra-heading" class="section-title">Layanan tambahan</h2>
		<div class="extra-grid">
			{#each extras as x (x.id)}
				<div class="card card--extra">
					<div class="badge badge--sm" aria-hidden="true">
						{#if x.icon === 'passport'}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								fill="none"
								stroke="currentColor"
								stroke-width="1.75"
							>
								<rect x="5" y="4" width="14" height="16" rx="2" stroke-linejoin="round" />
								<circle cx="12" cy="10" r="2" />
								<path d="M8 16h8" stroke-linecap="round" />
							</svg>
						{:else if x.icon === 'hotel'}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								fill="none"
								stroke="currentColor"
								stroke-width="1.75"
							>
								<path d="M4 21V8l4-2v15M4 12h16v9M8 21V12h8v9" stroke-linejoin="round" />
								<path d="M12 8V4h8v17" stroke-linejoin="round" />
							</svg>
						{:else if x.icon === 'bus'}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								fill="none"
								stroke="currentColor"
								stroke-width="1.75"
							>
								<path
									d="M5 17h14v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2Z"
									stroke-linejoin="round"
								/>
								<path d="M5 17V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9" stroke-linejoin="round" />
								<path d="M7 10h10M7 13h5" stroke-linecap="round" />
							</svg>
						{:else}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								fill="none"
								stroke="currentColor"
								stroke-width="1.75"
							>
								<circle cx="12" cy="8" r="3" />
								<path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke-linejoin="round" />
							</svg>
						{/if}
					</div>
					<h3>{x.title}</h3>
					<p class="extra-desc">{x.description}</p>
				</div>
			{/each}
		</div>
	</section>
</article>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
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

	.programs {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.card {
		border: 1px solid var(--border);
		border-radius: 16px;
		background: var(--white);
		box-shadow:
			0 1px 0 rgba(0, 0, 0, 0.03),
			0 10px 28px rgba(0, 0, 0, 0.05);
	}

	.card--program {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.15rem 1.2rem 1.2rem;
	}

	@media (min-width: 560px) {
		.card--program {
			flex-direction: row;
			align-items: flex-start;
			gap: 1.1rem;
		}
	}

	.badge {
		flex-shrink: 0;
		border-radius: 14px;
		display: grid;
		place-items: center;
		color: var(--primary);
		background: rgba(6, 78, 59, 0.1);
		border: 1px solid rgba(6, 78, 59, 0.15);
	}

	.badge--lg {
		width: 56px;
		height: 56px;
		border-radius: 14px;
	}

	.badge--sm {
		width: 42px;
		height: 42px;
		border-radius: 12px;
		margin-bottom: 0.55rem;
	}

	.program-body {
		min-width: 0;
		flex: 1;
	}

	.card--program h2 {
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0 0 0.45rem;
		color: var(--primary);
		letter-spacing: -0.02em;
	}

	.desc {
		margin: 0 0 0.75rem;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--text);
		line-height: 1.5;
	}

	.tags {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.02em;
		padding: 0.32rem 0.65rem;
		border-radius: 999px;
		color: var(--primary);
		background: rgba(6, 78, 59, 0.1);
		border: 1px solid rgba(6, 78, 59, 0.18);
	}

	.extra-section {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.section-title {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 700;
		margin: 0;
		color: var(--text);
		letter-spacing: -0.02em;
	}

	.extra-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	@media (max-width: 420px) {
		.extra-grid {
			grid-template-columns: 1fr;
		}
	}

	.card--extra {
		padding: 1rem 1rem 1.05rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.card--extra h3 {
		font-family: var(--font-main);
		font-size: 0.95rem;
		font-weight: 800;
		margin: 0 0 0.3rem;
		color: var(--primary);
	}

	.extra-desc {
		margin: 0;
		font-size: 0.82rem;
		font-weight: 600;
		line-height: 1.45;
		color: var(--text-light);
	}
</style>
