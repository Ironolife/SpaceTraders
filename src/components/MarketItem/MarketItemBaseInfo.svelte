<script lang="ts">
  import type { MarketItem } from '../../types';
  import { getItemIcon } from '../../utils/IconMaps';
  import InfoLayout from '../Common/InfoLayout.svelte';
  import QuantityIcon from '../Icons/QuantityIcon.svelte';
  import StorageIcon from '../Icons/StorageIcon.svelte';

  export let marketItem: MarketItem;
  export let flex = false;
  export let size: 'md' | 'lg' = 'md';

  $: ({ symbol, quantityAvailable, volumePerUnit } = marketItem);
</script>

<InfoLayout {flex} {size}>
  <span slot="topLeft">
    <span class="flex items-center">
      <span class="mr-2 opacity-50">
        <QuantityIcon />
      </span>
      <span>{quantityAvailable}</span>
    </span>
  </span>
  <span slot="topRight">
    <span class="flex items-center">
      <span class="mr-2 opacity-50">
        <StorageIcon />
      </span>
      <span>{volumePerUnit}</span>
    </span>
  </span>
  <span slot="icon">{getItemIcon(symbol)}</span>
  <span slot="label" class="capitalize">
    {symbol.replaceAll('_', ' ').toLowerCase()}
  </span>
</InfoLayout>
