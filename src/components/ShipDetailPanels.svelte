<script lang="ts">
  import type { KeyValuePair, UserShip } from '../types';
  import CargoItemsGrid from './Cargo/CargoItemsGrid.svelte';
  import Tabs from './Common/Tabs.svelte';
  import MarketItemsGrid from './MarketItem/MarketItemsGrid.svelte';
  import FlightGrid from './System/FlightGrid.svelte';

  export let ship: UserShip;

  let selectedTab: string;

  $: getTabs = (): KeyValuePair[] => {
    const tabs = [
      { key: 'Flight Plan', value: 'flight' },
      { key: 'Ship Cargo', value: 'cargo' },
    ];

    if (ship.location) {
      tabs.unshift({ key: 'Marketplace', value: 'marketplace' });
    }

    if (!tabs.map(({ value }) => value).includes(selectedTab))
      selectedTab = tabs[0].value;

    return tabs;
  };
</script>

<div class="mb-8">
  <Tabs tabs={getTabs()} bind:selectedValue={selectedTab} />
</div>

{#if selectedTab === 'marketplace'}
  <MarketItemsGrid {ship} />
{:else if selectedTab === 'cargo'}
  <CargoItemsGrid {ship} />
{:else if selectedTab === 'flight'}
  <FlightGrid {ship} />
{/if}
