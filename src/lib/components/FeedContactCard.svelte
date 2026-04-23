<script lang="ts">
	type Company = {
		waNumber: string;
		officeHours: string;
		address: string;
		officePhone: string;
		email: string;
		mapsUrl: string;
	};

	let { company }: { company: Company } = $props();

	const waClean = $derived(String(company.waNumber ?? '').replace(/[^\d]/g, ''));

	const has = $derived.by(() => {
		const h = (s: string) => (s ?? '').trim().length > 0;
		return (
			waClean.length > 0 ||
			h(company.officeHours) ||
			h(company.address) ||
			h(company.officePhone) ||
			h(company.email) ||
			h(company.mapsUrl)
		);
	});
</script>

{#if has}
	<section class="contact-card" aria-labelledby="contact-heading">
		<h2 id="contact-heading" class="title">Kontak & jam kantor</h2>

		{#if waClean}
			<div class="block">
				<h3 class="label">WhatsApp</h3>
				<p class="value">
					<a class="link" href={`https://wa.me/${waClean}`} target="_blank" rel="noopener noreferrer">
						Chat WhatsApp
					</a>
				</p>
			</div>
		{/if}

		{#if (company.officeHours ?? '').trim()}
			<div class="block">
				<h3 class="label">Jam operasional</h3>
				<p class="value hours">{(company.officeHours ?? '').trim()}</p>
			</div>
		{/if}

		{#if (company.address ?? '').trim()}
			<div class="block">
				<h3 class="label">Alamat</h3>
				<p class="value">{(company.address ?? '').trim()}</p>
			</div>
		{/if}

		{#if (company.officePhone ?? '').trim()}
			<div class="block">
				<h3 class="label">Telepon</h3>
				<p class="value">
					<a class="link" href={`tel:${(company.officePhone ?? '').replace(/\s/g, '')}`}>
						{(company.officePhone ?? '').trim()}
					</a>
				</p>
			</div>
		{/if}

		{#if (company.email ?? '').trim()}
			<div class="block">
				<h3 class="label">Email</h3>
				<p class="value">
					<a class="link" href={`mailto:${(company.email ?? '').trim()}`}>{(company.email ?? '').trim()}</a>
				</p>
			</div>
		{/if}

		{#if (company.mapsUrl ?? '').trim()}
			<div class="block">
				<a class="maps" href={(company.mapsUrl ?? '').trim()} target="_blank" rel="noopener noreferrer">
					Buka lokasi di Google Maps
				</a>
			</div>
		{/if}
	</section>
{/if}

<style>
	.contact-card {
		margin-top: 0.5rem;
		margin-bottom: 2rem;
		padding: 1.25rem 1.15rem 1.3rem;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--white);
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03), 0 10px 32px rgba(0, 0, 0, 0.06);
	}

	.title {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0 0 0.85rem;
		color: var(--text);
	}

	.block {
		margin-bottom: 0.85rem;
	}
	.block:last-child {
		margin-bottom: 0;
	}

	.label {
		margin: 0 0 0.2rem;
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-light);
	}

	.value {
		margin: 0;
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.45;
		color: var(--text);
	}

	.hours {
		white-space: pre-line;
	}

	.link {
		color: var(--primary);
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.maps {
		display: inline-flex;
		align-items: center;
		margin-top: 0.15rem;
		padding: 0.45rem 0.85rem;
		border-radius: 10px;
		background: rgba(6, 78, 59, 0.1);
		color: var(--primary);
		font-weight: 800;
		font-size: 0.88rem;
		text-decoration: none;
		border: 1px solid rgba(6, 78, 59, 0.2);
	}
	.maps:hover {
		background: rgba(6, 78, 59, 0.14);
	}
</style>
