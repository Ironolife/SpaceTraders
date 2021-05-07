<script lang="ts">
  import type { Location, UserShip } from '../../types';
  import getFlightInfo from '../../utils/getFlightInfo';
  import Button from '../Common/Button.svelte';
  import InfoList from '../Common/InfoList.svelte';
  import LocationIcon from '../Icons/LocationIcon.svelte';

  export let ship: UserShip;
  export let location: Location;
  export let currentLocation: Location;
  export let onLaunch: (location: string) => Promise<void>;

  $: ({ distance, fuelRequired, duration } = getFlightInfo(
    ship,
    currentLocation,
    location
  ));

  $: fuel = ship.cargo.find(({ good }) => good === 'FUEL')?.quantity || 0;

  const getDisabledText = (): string | null => {
    if (fuel < fuelRequired) return 'Insuffient ⛽';

    return null;
  };

  let isLoading = false;
  const handleLaunch = async () => {
    isLoading = true;
    await onLaunch(location.symbol);
    isLoading = false;
  };
</script>

{#if currentLocation.symbol !== location.symbol}
  <InfoList
    entries={[
      { key: 'Distance', value: distance.toFixed(1) },
      { key: 'Duration', value: `${duration}s` },
      { key: 'Fuel Required', value: fuelRequired.toFixed(0) },
    ]}
  />
  <Button
    fullWidth
    props={{ disabled: !!getDisabledText() }}
    disabledText={getDisabledText()}
    {isLoading}
    on:click={handleLaunch}
  >
    Launch
  </Button>
{:else}
  <div
    class="flex-1 flex flex-col justify-center items-center  text-xl text-green-400"
  >
    <div class="mb-2">
      <LocationIcon size={32} />
    </div>
    <span>Current Location</span>
  </div>
{/if}
