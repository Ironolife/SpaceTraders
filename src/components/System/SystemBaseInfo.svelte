<script lang="ts">
  import type { System, UserShip } from '../../types';
  import InfoLayout from '../Common/InfoLayout.svelte';
  import LocationIcon from '../Icons/LocationIcon.svelte';

  export let system: System;
  export let ship: UserShip | undefined = undefined;
  export let flex = false;
  export let size: 'md' | 'lg' = 'md';

  $: ({ symbol, name, locations } = system);

  $: isInSystem = !!system.locations.find(
    ({ symbol }) => symbol === ship?.location
  );
</script>

<InfoLayout {flex} {size}>
  <span slot="topLeft" class:text-green-400={isInSystem}>
    <span class="flex items-center" class:text-green-400={isInSystem}>
      {#if isInSystem}
        <span class="mr-2">
          <LocationIcon />
        </span>
      {/if}
      <span>
        {symbol}
      </span>
    </span>
  </span>
  <span slot="topRight">🌍 {locations.length}</span>
  <span slot="icon">🌌</span>
  <span slot="label" class="capitalize">{name}</span>
</InfoLayout>
