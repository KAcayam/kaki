<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { siteConfig } from '$lib/config/siteConfig';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { Toaster } from 'svelte-sonner';

	let { pageTitle, children }: { pageTitle?: string; children?: any } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{pageTitle ? `${pageTitle} - ${siteConfig.name}` : siteConfig.name}</title>
	<meta name="description" content={siteConfig.description} />
</svelte:head>

<div class="flex min-h-screen w-full flex-col">
	<Header />
	<main class="flex-1">
		<Toaster richColors position="bottom-center" />
		{@render children()}
	</main>
	<Footer />
</div>
