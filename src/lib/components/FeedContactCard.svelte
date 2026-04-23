<script lang="ts">
	import {
		IconClock,
		IconEnvelope,
		IconMapPin,
		IconPhone,
		IconWhatsApp
	} from '$lib/components/icons';
	import { ROUTE } from '$lib/routes';
	import type { CompanyPublic } from '$lib/types/company-public';

	function nonEmpty(s: unknown): boolean {
		return String(s ?? '').trim().length > 0;
	}

	let {
		company,
		showFullContactLink = true
	}: {
		company: CompanyPublic;
		/** Tautan ke halaman kontak lengkap (nonaktif di `/informasi/kontak`). */
		showFullContactLink?: boolean;
	} = $props();

	const waClean = $derived(String(company.waNumber ?? '').replace(/[^\d]/g, ''));
	const telHref = $derived(`tel:${(company.officePhone ?? '').replace(/\s/g, '')}`);
	const mapsUrl = $derived((company.mapsUrl ?? '').trim());
	const emailTrim = $derived((company.email ?? '').trim());
	const hoursTrim = $derived((company.officeHours ?? '').trim());
	const addressTrim = $derived((company.address ?? '').trim());
	const phoneTrim = $derived((company.officePhone ?? '').trim());

	const has = $derived(
		waClean.length > 0 ||
			nonEmpty(company.officeHours) ||
			nonEmpty(company.address) ||
			nonEmpty(company.officePhone) ||
			nonEmpty(company.email) ||
			nonEmpty(company.mapsUrl)
	);

	const hasDetails = $derived(hoursTrim.length > 0 || addressTrim.length > 0);

	const hasQuickActions = $derived(
		waClean.length > 0 || phoneTrim.length > 0 || emailTrim.length > 0 || mapsUrl.length > 0
	);
</script>

{#if has}
	<section class="contact-card" aria-labelledby="contact-heading">
		<header class="head">
			<h2 id="contact-heading" class="title">Hubungi kami</h2>
			<p class="lede">
				{#if hasQuickActions}
					Pilih cara yang paling nyaman — jam & alamat panjang disembunyikan di bawah agar feed
					tetap ringkas.
				{:else}
					Lihat jam kantor dan alamat di bagian yang bisa dibuka.
				{/if}
			</p>
		</header>

		{#if hasQuickActions}
			<div class="actions" role="group" aria-label="Tindakan kontak cepat">
				{#if waClean}
					<a
						class="act act--wa"
						href={`https://wa.me/${waClean}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="act-ic" aria-hidden="true">
							<IconWhatsApp />
						</span>
						<span class="act-txt">WhatsApp</span>
					</a>
				{/if}

				{#if phoneTrim}
					<a class="act act--tel" href={telHref}>
						<span class="act-ic" aria-hidden="true">
							<IconPhone />
						</span>
						<span class="act-txt">Telepon</span>
					</a>
				{/if}

				{#if emailTrim}
					<a class="act act--mail" href={`mailto:${emailTrim}`}>
						<span class="act-ic" aria-hidden="true">
							<IconEnvelope />
						</span>
						<span class="act-txt">Email</span>
					</a>
				{/if}

				{#if mapsUrl}
					<a class="act act--map" href={mapsUrl} target="_blank" rel="noopener noreferrer">
						<span class="act-ic" aria-hidden="true">
							<IconMapPin />
						</span>
						<span class="act-txt">Maps</span>
					</a>
				{/if}
			</div>
		{/if}

		{#if hasDetails}
			<details class="more">
				<summary class="more-sum">
					<span class="more-sum-ic" aria-hidden="true">
						<IconClock />
					</span>
					Jam kantor & alamat lengkap
				</summary>
				<div class="more-body">
					{#if hoursTrim}
						<div class="detail">
							<span class="detail-label">Jam operasional</span>
							<p class="detail-text hours">{hoursTrim}</p>
						</div>
					{/if}
					{#if addressTrim}
						<div class="detail">
							<span class="detail-label">Alamat</span>
							<p class="detail-text">{addressTrim}</p>
						</div>
					{/if}
				</div>
			</details>
		{/if}

		{#if showFullContactLink}
			<a class="info-link" href={ROUTE.INFORMASI_KONTAK}>Halaman kontak lengkap</a>
		{/if}
	</section>
{/if}

<style>
	.contact-card {
		margin-top: 0.35rem;
		margin-bottom: 1.1rem;
		padding: 1rem 0.95rem 0.9rem;
		border: 1px solid rgba(6, 78, 59, 0.14);
		border-radius: var(--radius-md);
		background: linear-gradient(
			160deg,
			rgba(255, 255, 255, 0.98) 0%,
			rgba(240, 253, 250, 0.55) 100%
		);
		box-shadow: var(--shadow-soft);
	}

	.head {
		margin-bottom: 0.65rem;
	}

	.title {
		font-family: var(--font-display);
		font-size: 1.02rem;
		font-weight: 680;
		letter-spacing: var(--tracking-tight);
		margin: 0 0 0.2rem;
		color: var(--text);
	}

	.lede {
		margin: 0;
		font-size: 0.76rem;
		font-weight: 620;
		line-height: 1.38;
		color: var(--text-light);
	}

	.actions {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(4.5rem, 1fr));
		gap: 0.5rem;
		margin-bottom: 0.55rem;
	}

	.actions + .more {
		margin-top: 0.35rem;
	}

	.act {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.28rem;
		min-height: 3.35rem;
		padding: 0.4rem 0.35rem;
		border-radius: var(--radius-sm);
		text-decoration: none;
		color: var(--text);
		font-size: 0.65rem;
		font-weight: 800;
		letter-spacing: 0.02em;
		border: 1px solid rgba(0, 0, 0, 0.06);
		background: rgba(255, 255, 255, 0.85);
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
	}

	.act:hover,
	.act:focus-visible {
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
		border-color: rgba(6, 78, 59, 0.2);
		outline: none;
	}

	.act:active {
		transform: translateY(0);
	}

	.act-ic {
		display: grid;
		place-items: center;
		line-height: 0;
	}

	.act-txt {
		text-align: center;
		line-height: 1.15;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.act--wa {
		color: #0a7c6a;
		border-color: rgba(10, 124, 106, 0.2);
		background: rgba(220, 252, 231, 0.65);
	}

	.act--tel {
		color: var(--primary);
	}

	.act--mail {
		color: #1d4ed8;
		border-color: rgba(29, 78, 216, 0.15);
		background: rgba(239, 246, 255, 0.7);
	}

	.act--map {
		color: #b45309;
		border-color: rgba(180, 83, 9, 0.2);
		background: rgba(255, 251, 235, 0.85);
	}

	.more {
		margin: 0.5rem 0 0;
		border-radius: var(--radius-sm);
		border: 1px dashed rgba(6, 78, 59, 0.22);
		background: rgba(255, 255, 255, 0.55);
		overflow: hidden;
	}

	.more-sum {
		list-style: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 0.65rem;
		font-size: 0.78rem;
		font-weight: 800;
		color: var(--primary);
		user-select: none;
	}

	.more-sum::-webkit-details-marker {
		display: none;
	}

	.more-sum::after {
		content: '';
		margin-left: auto;
		width: 0.45rem;
		height: 0.45rem;
		border-right: 2px solid currentColor;
		border-bottom: 2px solid currentColor;
		transform: rotate(45deg);
		opacity: 0.65;
		transition: transform 0.2s ease;
	}

	.more[open] .more-sum::after {
		transform: rotate(225deg);
	}

	.more-sum-ic {
		display: grid;
		place-items: center;
		color: var(--accent);
		flex-shrink: 0;
	}

	.more-body {
		padding: 0 0.75rem 0.65rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
	}

	.detail-label {
		display: block;
		font-size: 0.62rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-light);
		margin-bottom: 0.2rem;
	}

	.detail-text {
		margin: 0;
		font-size: 0.84rem;
		font-weight: 620;
		line-height: 1.42;
		color: var(--text);
	}

	.hours {
		white-space: pre-line;
	}

	.info-link {
		display: block;
		margin-top: 0.6rem;
		text-align: center;
		font-size: 0.72rem;
		font-weight: 800;
		color: var(--text-light);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.info-link:hover,
	.info-link:focus-visible {
		color: var(--primary);
		outline: none;
	}

	@media (max-width: 600px) {
		.contact-card {
			border-radius: 0;
			border-left: none;
			border-right: none;
			margin-bottom: 0.75rem;
		}
	}
</style>
