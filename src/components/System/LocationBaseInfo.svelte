<script lang="ts">
  import type { Location } from '../../types';
  import { getLocationIcon } from '../../utils/IconMaps';
  import InfoLayout from '../Common/InfoLayout.svelte';

  export let location: Location;
  export let flex = false;
  export let size: 'md' | 'lg' = 'md';

  $: ({ symbol, name, type, x, y } = location);
</script>

<InfoLayout {flex} {size}>
  <span slot="topLeft">🛰️ {symbol}</span>
  <span slot="topRight">🧭 {x} , {y}</span>
  <span slot="icon">{getLocationIcon(type)}</span>
  <span slot="label" class="capitalize">
    {name} · {type.replaceAll('_', ' ').toLowerCase()}
  </span>
</InfoLayout>
