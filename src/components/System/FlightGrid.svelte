<script lang="ts">
  import { getContext } from 'svelte';
  import { submitFlightPlan } from '../../api/flight';
  import { createFlightPlanStore, systems, userData } from '../../stores';
  import type { System, UserShip } from '../../types';
  import BackButton from '../Common/BackButton.svelte';
  import Button from '../Common/Button.svelte';
  import Card from '../Common/Card.svelte';
  import Grid from '../Common/Grid.svelte';
  import Spinner from '../Common/Spinner.svelte';
  import FlightCostsInfo from './FlightCostsInfo.svelte';
  import FlightDetails from './FlightDetails.svelte';
  import LocationBaseInfo from './LocationBaseInfo.svelte';
  import SystemBaseInfo from './SystemBaseInfo.svelte';

  export let ship: UserShip;

  $: currentLocation = $systems
    ? ship.location
      ? $systems
          .map(({ locations }) => locations)
          .flat()
          .find(({ symbol }) => symbol === ship.location)
      : null
    : undefined;

  let selectedSystem: System | null = null;

  const flightPlanStore: ReturnType<typeof createFlightPlanStore> = getContext(
    'flightPlan'
  );

  const onLaunch = async (location: string) => {
    flightPlanStore.update(
      $userData,
      await submitFlightPlan($userData, ship.id, location)
    );
  };

  $: getSelectSystemDisabledText = (system: System): string | null => {
    if (!system.locations.map(({ symbol }) => symbol).includes(ship.location))
      return 'Not in system';
    return null;
  };
</script>

{#if $systems}
  {#if ship.location}
    {#if $systems.length}
      {#if !selectedSystem}
        <Grid>
          {#each $systems as system (system.symbol)}
            <Card>
              <div class="flex flex-col space-y-4">
                <SystemBaseInfo {system} {ship} />
                <Button
                  fullWidth
                  props={{ disabled: !!getSelectSystemDisabledText(system) }}
                  disabledText={getSelectSystemDisabledText(system)}
                  on:click={() => (selectedSystem = system)}
                >
                  Select
                </Button>
              </div>
            </Card>
          {/each}
        </Grid>
      {:else}
        <div class="mb-8 flex items-center space-x-4">
          <BackButton on:click={() => (selectedSystem = null)} />
          <h2 class="text-2xl">
            🌌 {selectedSystem.name} · {selectedSystem.symbol}
          </h2>
        </div>
        {#if selectedSystem.locations.length}
          <Grid>
            {#each selectedSystem.locations as location (location.symbol)}
              <Card>
                <div class="h-full flex flex-col space-y-4">
                  <LocationBaseInfo {location} />
                  <FlightCostsInfo
                    {ship}
                    {location}
                    {currentLocation}
                    {onLaunch}
                  />
                </div>
              </Card>
            {/each}
          </Grid>
        {:else}
          <div class="py-8 text-center text-xl">No locations found</div>
        {/if}
      {/if}
    {:else}
      <div class="py-8 text-center text-xl">No systems found</div>
    {/if}
  {:else if $flightPlanStore}
    <FlightDetails flightPlan={$flightPlanStore} />
  {:else if $flightPlanStore === null}
    <div class="py-8 text-center text-xl">No flight plan found</div>
  {:else}
    <div class="py-8">
      <Spinner loadingText="fetching flight plan" />
    </div>
  {/if}
{:else}
  <div class="py-8">
    <Spinner loadingText="fetching systems" />
  </div>
{/if}
