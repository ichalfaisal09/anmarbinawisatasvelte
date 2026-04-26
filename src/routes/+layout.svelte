<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
	import FeedContactCard from '$lib/components/FeedContactCard.svelte';
	import FeedHeader from '$lib/components/FeedHeader.svelte';
	import FeedHomeAmbience from '$lib/components/FeedHomeAmbience.svelte';
	import FeedWorldClocks from '$lib/components/FeedWorldClocks.svelte';
	import PublicBottomNav from '$lib/components/PublicBottomNav.svelte';
	import { ROUTE, normalizePathname } from '$lib/routes';

	let { children, data } = $props();

	const isAdminRoute = $derived(page.url.pathname.startsWith('/admin'));
	const isHomeFeed = $derived(normalizePathname(page.url.pathname) === ROUTE.HOME);
	const siteTitle = $derived((data.company.companyName ?? '').trim() || 'Anmar Binawisata');
	const siteDescription = $derived(
		`Travel haji umrah Makassar terpercaya bersama ${siteTitle}. Program umrah, haji khusus, informasi legalitas, rekening resmi, dan galeri kegiatan jamaah.`
	);
	const logoUrl = $derived(data.company.logoUrl?.trim() ? data.company.logoUrl : '/logo.svg');
	const ogImage = $derived(logoUrl.startsWith('http') ? logoUrl : `${page.url.origin}${logoUrl}`);
	const ga4MeasurementId = $derived((data.company.ga4MeasurementId ?? '').trim().toUpperCase());
	const metaPixelId = $derived((data.company.metaPixelId ?? '').trim());
	const trackingEnabled = $derived(Boolean(data.company.trackingEnabled));
</script>

<svelte:head>
	<title>{siteTitle}</title>
	<meta name="description" content={siteDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={siteTitle} />
	<meta property="og:description" content={siteDescription} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={siteTitle} />
	<meta name="twitter:description" content={siteDescription} />
	<meta name="twitter:image" content={ogImage} />
	{#if !isAdminRoute}
		{@html `<script>window.__trackingEnabled = ${trackingEnabled ? 'true' : 'false'};</script>`}
	{/if}
	{#if !isAdminRoute && trackingEnabled && ga4MeasurementId}
		<script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}></script>
		{@html `<script>
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
window.gtag('js', new Date());
window.gtag('config', '${ga4MeasurementId}');
		</script>`}
	{/if}
	{#if !isAdminRoute && trackingEnabled && metaPixelId}
		{@html `<script>
!function(f,b,e,v,n,t,s){
if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
window.fbq = window.fbq || fbq;
window.fbq('init', '${metaPixelId}');
window.fbq('track', 'PageView');
		</script>`}
		<noscript>
			<img
				height="1"
				width="1"
				style="display:none"
				alt=""
				src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
			/>
		</noscript>
	{/if}
</svelte:head>

{#if !isAdminRoute}
	<FeedHeader
		companyName={data.company.companyName}
		logoUrl={data.company.logoUrl?.trim() ? data.company.logoUrl : '/logo.svg'}
	/>
{/if}

{#if isAdminRoute}
	<main class="admin-main">
		{@render children()}
	</main>
{:else if isHomeFeed}
	<main class="container public-shell home-feed">
		<FeedHomeAmbience />
		<div class="feed-container">
			<FeedWorldClocks />
			{@render children()}
			<FeedContactCard company={data.company} />
		</div>
		<PublicBottomNav company={data.company} />
	</main>
{:else}
	<main class="container public-shell">
		<div class="public-page-stack">
			{@render children()}
		</div>
		<PublicBottomNav company={data.company} />
	</main>
{/if}

<style>
	main {
		min-height: 100vh;
	}
	.admin-main {
		min-height: 100vh;
		padding: 0;
	}
	.public-page-stack {
		padding-top: 80px;
		padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 5.25rem);
		min-height: 100vh;
	}

	.home-feed {
		position: relative;
		overflow-x: clip;
	}

	.home-feed .feed-container {
		position: relative;
		z-index: 1;
		gap: 1.1rem;
	}
</style>


