<script lang="ts">
  import { getContext } from 'svelte';

  import { createFlightPlanStore, systems } from '../stores';
  import type { UserShip } from '../types';
  import Card from './Common/Card.svelte';
  import Spinner from './Common/Spinner.svelte';
  import ShipBaseInfo from './Ship/ShipBaseInfo.svelte';
  import ShipStatsInfo from './Ship/ShipStatsInfo.svelte';
  import StarryBackground from './StarryBackground.svelte';
  import FlightBaseInfo from './System/FlightBaseInfo.svelte';
  import LocationBaseInfo from './System/LocationBaseInfo.svelte';

  export let ship: UserShip;

  $: location = $systems
    ? ship.location
      ? $systems
          .map(({ locations }) => locations)
          .flat()
          .find(({ symbol }) => symbol === ship.location)
      : null
    : undefined;

  const flightPlanStore: ReturnType<typeof createFlightPlanStore> = getContext(
    'flightPlan'
  );
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-row">
  <Card>
    <ShipBaseInfo {ship} flex size="lg" />
  </Card>
  <Card>
    <ShipStatsInfo {ship} size="lg" />
  </Card>
  <div class="md:col-span-2 lg:col-span-1">
    <Card>
      {#if $systems}
        {#if ship.location}
          <LocationBaseInfo {location} flex size="lg" />
        {:else if $flightPlanStore}
          <FlightBaseInfo flightPlan={$flightPlanStore} flex size="lg" />
        {:else if $flightPlanStore === null}
          <div class="h-full grid place-items-center text-xl">
            No flight plan found
          </div>
        {:else}
          <Spinner loadingText="fetching flight plan" />
        {/if}
      {:else}
        <Spinner loadingText="fetching systems" />
      {/if}
    </Card>
  </div>
</div>
