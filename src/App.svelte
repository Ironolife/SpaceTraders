<script lang="ts">
  import Footer from './components/Footer/Footer.svelte';
  import Header from './components/Header/Header.svelte';
  import { route, userData } from './stores';
  import Tailwind from './styles/Tailwind.svelte';
  import router from './utils/router';
  import Auth from './components/Auth.svelte';

  router.listen();
</script>

<Tailwind />

<Header />
<main class="py-8 px-4" style="flex: 1 0 auto;">
  {#if $userData}
    <svelte:component this={$route.component} />
  {/if}
</main>
<Footer />

{#if !$userData}
  <Auth />
{/if}
