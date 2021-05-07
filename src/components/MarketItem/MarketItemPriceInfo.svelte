<script lang="ts">
  import type { MarketItem } from '../../types';
  import InfoList from '../Common/InfoList.svelte';

  export let marketItem: MarketItem;

  $: ({
    pricePerUnit,
    purchasePricePerUnit,
    sellPricePerUnit,
    spread,
  } = marketItem);
</script>

<InfoList
  entries={[
    { key: 'Spread', value: spread.toFixed(0) },
    { key: 'Base', value: `💵 ${pricePerUnit}` },
    { key: 'Buy', value: `💵 ${purchasePricePerUnit}` },
    { key: 'Sell', value: `💵 ${sellPricePerUnit}` },
  ]}
/>
