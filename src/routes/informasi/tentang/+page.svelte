<svelte:head>
	<title>Tentang kami | Informasi</title>
	<meta
		name="description"
		content="Visi, misi, nilai amanah & profesional, serta profil Anmar Binawisata — travel umrah dan haji."
	/>
</svelte:head>

<article class="page">
	<header class="page-head">
		<h1>Tentang kami</h1>
		<p class="lede">Anmar Binawisata — perjalanan ibadah umrah dan haji yang mengutamakan jamaah.</p>
	</header>

	<section class="card" aria-labelledby="visi-heading">
		<div class="badge" aria-hidden="true">
			<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75">
				<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" stroke-linejoin="round" />
				<circle cx="12" cy="12" r="3" />
			</svg>
		</div>
		<h2 id="visi-heading">Visi kami</h2>
		<p class="body">
			Menjadi perusahaan travel umrah dan haji terpercaya yang mengutamakan kenyamanan dan kekhusyukan ibadah
			jamaah.
		</p>
	</section>

	<section class="card" aria-labelledby="misi-heading">
		<div class="badge" aria-hidden="true">
			<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75">
				<circle cx="12" cy="12" r="9" />
				<circle cx="12" cy="12" r="4" />
				<path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke-linecap="round" />
			</svg>
		</div>
		<h2 id="misi-heading">Misi kami</h2>
		<ul class="checklist">
			<li>
				<span class="check" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.25">
						<path d="M5 12l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</span>
				Memberikan pelayanan terbaik dan profesional
			</li>
			<li>
				<span class="check" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.25">
						<path d="M5 12l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</span>
				Memastikan keamanan dan kenyamanan jamaah
			</li>
			<li>
				<span class="check" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.25">
						<path d="M5 12l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</span>
				Membimbing ibadah sesuai tuntunan yang benar
			</li>
		</ul>
	</section>

	<div class="pair">
		<section class="card card--half" aria-labelledby="amanah-heading">
			<div class="badge" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75">
					<path
						d="M12 21C7 16.5 4 13.2 4 9.5A3.5 3.5 0 0 1 12 6.5 3.5 3.5 0 0 1 20 9.5c0 3.7-3 7-8 11.5Z"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<h2 id="amanah-heading">Amanah</h2>
			<p class="body">Menjalankan kepercayaan dengan penuh tanggung jawab</p>
		</section>

		<section class="card card--half" aria-labelledby="profesional-heading">
			<div class="badge" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75">
					<path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-linejoin="round" />
					<rect x="3" y="7" width="18" height="13" rx="2" stroke-linejoin="round" />
					<path d="M12 12v3" stroke-linecap="round" />
				</svg>
			</div>
			<h2 id="profesional-heading">Profesional</h2>
			<p class="body">Pelayanan berkualitas dengan standar tinggi</p>
		</section>
	</div>

	<section class="card" aria-labelledby="profil-heading">
		<div class="badge" aria-hidden="true">
			<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75">
				<path d="M4 21V8l8-4 8 4v13" stroke-linejoin="round" />
				<path d="M10 21V12h4v9" stroke-linejoin="round" />
				<path d="M4 12h16" stroke-linecap="round" />
			</svg>
		</div>
		<h2 id="profil-heading">Profil perusahaan</h2>
		<div class="body-stack">
			<p class="body">
				Anmar Binawisata adalah perusahaan travel umrah dan haji yang berdedikasi untuk memberikan pengalaman
				ibadah terbaik bagi jamaah.
			</p>
			<p class="body">
				Dengan pengalaman lebih dari 20 tahun, kami telah melayani ribuan jamaah dengan tingkat kepuasan yang
				tinggi.
			</p>
		</div>
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
		margin-bottom: 0.15rem;
	}

	h1 {
		font-size: 1.55rem;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 0.35rem;
	}

	.lede {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-light);
		line-height: 1.45;
	}

	.card {
		position: relative;
		padding: 1.1rem 1.15rem 1.15rem;
		border: 1px solid var(--border);
		border-radius: 16px;
		background: var(--white);
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03), 0 10px 28px rgba(0, 0, 0, 0.05);
	}

	.card h2 {
		font-family: var(--font-display);
		font-size: 1.12rem;
		font-weight: 700;
		margin: 0 0 0.55rem;
		color: var(--primary);
		letter-spacing: -0.02em;
	}

	.badge {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		margin-bottom: 0.65rem;
		color: var(--primary);
		background: rgba(6, 78, 59, 0.1);
		border: 1px solid rgba(6, 78, 59, 0.15);
	}

	.body {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--text);
	}

	.body-stack {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.checklist {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.checklist li {
		display: flex;
		align-items: flex-start;
		gap: 0.55rem;
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.45;
		color: var(--text);
	}

	.check {
		flex-shrink: 0;
		margin-top: 0.08rem;
		color: var(--primary);
		display: grid;
		place-items: center;
	}

	.pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.card--half h2 {
		font-size: 1.02rem;
	}

	.card--half .body {
		font-size: 0.86rem;
		font-weight: 600;
		color: var(--text-light);
	}

	@media (max-width: 480px) {
		.pair {
			grid-template-columns: 1fr;
		}
	}
</style>
