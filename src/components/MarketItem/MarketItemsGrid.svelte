<script lang="ts">
  import { onMount } from 'svelte';
  import { getMarketplace } from '../../api/market';
  import { route, userData } from '../../stores';
  import type { MarketItem, UserShip } from '../../types';
  import Card from '../Common/Card.svelte';
  import Grid from '../Common/Grid.svelte';
  import Spinner from '../Common/Spinner.svelte';
  import MarketItemBaseInfo from './MarketItemBaseInfo.svelte';
  import MarketItemOperation from './MarketItemOperation.svelte';
  import MarketItemPriceInfo from './MarketItemPriceInfo.svelte';

  export let ship: UserShip | undefined = undefined;
  let marketItems: MarketItem[] | undefined = undefined;

  onMount(async () => {
    const marketplace = (
      await getMarketplace($userData, ship?.location || $route.params?.location)
    ).marketplace;

    if (marketplace) {
      marketItems = marketplace.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    }
  });
</script>

{#if marketItems}
  {#if marketItems.length}
    <Grid>
      {#each marketItems as marketItem (marketItem.symbol)}
        <Card>
          <div class="flex flex-col">
            <div class="mb-4">
              <MarketItemBaseInfo {marketItem} />
            </div>
            <div class:mb-4={!!ship}>
              <MarketItemPriceInfo {marketItem} />
            </div>
            {#if ship}
              <MarketItemOperation {marketItem} {ship} />
            {/if}
          </div>
        </Card>
      {/each}
    </Grid>
  {:else}
    <div class="py-8 text-center text-xl">No items found</div>
  {/if}
{:else}
  <div class="py-8">
    <Spinner loadingText="fetching marketplace" />
  </div>
{/if}
