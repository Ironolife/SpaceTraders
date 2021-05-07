<script lang="ts">
  import type { CargoItem } from '../../types';
  import { getItemIcon } from '../../utils/IconMaps';
  import InfoLayout from '../Common/InfoLayout.svelte';
  import QuantityIcon from '../Icons/QuantityIcon.svelte';
  import StorageIcon from '../Icons/StorageIcon.svelte';

  export let cargoItem: CargoItem;
  export let flex = false;
  export let size: 'md' | 'lg' = 'md';

  $: ({ good, quantity, totalVolume } = cargoItem);
</script>

<InfoLayout {flex} {size}>
  <span slot="topLeft">
    <span class="flex items-center">
      <span class="mr-2 opacity-50">
        <QuantityIcon />
      </span>
      <span>{quantity}</span>
    </span>
  </span>
  <span slot="topRight">
    <span class="flex items-center">
      <span class="mr-2 opacity-50">
        <StorageIcon />
      </span>
      <span>{totalVolume / quantity}</span>
    </span>
  </span>
  <span slot="icon">{getItemIcon(good)}</span>
  <span slot="label" class="capitalize">
    {good.replaceAll('_', ' ').toLowerCase()}
  </span>
</InfoLayout>
