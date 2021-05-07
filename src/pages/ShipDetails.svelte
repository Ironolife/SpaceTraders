<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { scrapShip } from '../api/ship';
  import { getSystems } from '../api/system';
  import BackButton from '../components/Common/BackButton.svelte';
  import Button from '../components/Common/Button.svelte';
  import ConfirmDialog from '../components/Common/ConfirmDialog.svelte';
  import ShipDetailedInfo from '../components/ShipDetailedInfo.svelte';
  import ShipDetailPanels from '../components/ShipDetailPanels.svelte';
  import { createFlightPlanStore, route, systems, userData } from '../stores';
  import router from '../utils/router';

  $: ship =
    $userData.user.ships.find(({ id }) => id === $route.params?.shipId) || null;

  const flightPlanStore = createFlightPlanStore();
  setContext('flightPlan', flightPlanStore);

  onMount(async () => {
    if (ship && !ship.location) {
      flightPlanStore.fetch($userData, ship.id);
    }
    if (!$systems) {
      const _systems = await getSystems($userData);
      systems.set(_systems);
    }
  });

  let confirmScrapOpen = false;
  const onScrap = async (confirm?: boolean) => {
    if (confirm) {
      await scrapShip($userData, ship.id);
      router.route('/ships');
    }
    confirmScrapOpen = false;
  };
</script>

<div class="mb-8 flex items-center space-x-4">
  <BackButton on:click={() => router.route('/ships')} />
  <h1 class="text-2xl leading-10">Ship Detail</h1>
  <span class="flex-1" />
  {#if ship}
    <Button color="quaternary" on:click={() => (confirmScrapOpen = true)}>
      Scrap
    </Button>
  {/if}
</div>
{#if ship}
  <section class="mb-8">
    <ShipDetailedInfo {ship} />
  </section>
  <section>
    <ShipDetailPanels {ship} />
  </section>
{:else}
  <div class="py-8 text-center text-xl">Ship not found</div>
{/if}

{#if confirmScrapOpen}
  <ConfirmDialog onConfirm={onScrap}>
    <span slot="header">Scrap Ship?</span>
    <span slot="content">This action cannot be undone.</span>
  </ConfirmDialog>
{/if}
