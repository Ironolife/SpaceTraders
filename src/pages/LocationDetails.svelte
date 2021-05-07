<script lang="ts">
  import { onMount } from 'svelte';
  import { getMarketplace } from '../api/market';
  import { getDockedShips, getLocation, getSystems } from '../api/system';
  import BackButton from '../components/Common/BackButton.svelte';
  import Card from '../components/Common/Card.svelte';
  import Grid from '../components/Common/Grid.svelte';
  import Spinner from '../components/Common/Spinner.svelte';
  import MarketItemsGrid from '../components/MarketItem/MarketItemsGrid.svelte';
  import DockedShipsInfo from '../components/System/DockedShipsInfo.svelte';
  import LocationBaseInfo from '../components/System/LocationBaseInfo.svelte';
  import { route, systems, userData } from '../stores';
  import type { DockedShip, Marketplace } from '../types';
  import router from '../utils/router';

  $: system =
    $systems?.find(({ symbol }) => symbol === $route.params?.system) || null;
  $: location =
    system?.locations.find(
      ({ symbol }) => symbol === $route.params?.location
    ) || null;

  let dockedShips: DockedShip[] | undefined = undefined;

  $: hasShipDocked = $userData.user.ships
    .map(({ location }) => location)
    .includes($route.params?.location);

  onMount(async () => {
    if (!$systems) {
      const _systems = await getSystems($userData);
      systems.set(_systems);
    }

    dockedShips = await getDockedShips($userData, $route.params?.location);
  });
</script>

{#if $systems}
  <div class="mb-8 flex items-center space-x-4">
    <BackButton
      on:click={() => router.route(`/systems/${$route.params?.system}`)}
    />
    <h1 class="text-2xl leading-10">🛰️ {$route.params?.location}</h1>
  </div>
  {#if location}
    <section class="mb-8">
      <grid class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <LocationBaseInfo {location} size="lg" flex />
        </Card>
        <Card>
          <div class="h-full" style="min-height: 180px">
            {#if dockedShips}
              <DockedShipsInfo {dockedShips} />
            {:else}
              <Spinner loadingText="fetching docked ships" />
            {/if}
          </div>
        </Card>
      </grid>
    </section>
    <section>
      <h1 class="mb-8 text-2xl leading-10">Marketplace</h1>
      {#if hasShipDocked}
        <MarketItemsGrid />
      {:else}
        <div class="py-8 text-center text-xl">No ship docked</div>
      {/if}
    </section>
  {:else}
    <div class="py-8 text-center text-xl">Location not found</div>
  {/if}
{:else}
  <Spinner loadingText="fetching systems" />
{/if}
