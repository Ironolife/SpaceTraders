<script lang="ts">
  import { onMount } from 'svelte';
  import { systems } from '../../stores';
  import type { FlightPlan } from '../../types';
  import getRemainingTime from '../../utils/getRemainingTime';
  import { getLocationIcon } from '../../utils/IconMaps';
  import InfoLayout from '../Common/InfoLayout.svelte';

  export let flightPlan: FlightPlan;
  export let flex = false;
  export let size: 'md' | 'lg' = 'md';

  $: ({ destination, arrivesAt } = flightPlan);

  $: ({ symbol, name, type } = $systems
    .map(({ locations }) => locations)
    .flat()
    .find(({ symbol }) => symbol === destination));

  let timeRemaining = getRemainingTime(arrivesAt);

  onMount(() => {
    const interval = setInterval(() => {
      timeRemaining = getRemainingTime(arrivesAt);
    });

    return () => clearInterval(interval);
  });
</script>

<InfoLayout {flex} {size}>
  <span slot="topLeft">➡️ {symbol}</span>
  <span slot="topRight">⏳ {timeRemaining}s</span>
  <span slot="icon">{getLocationIcon(type)}</span>
  <span slot="label" class="capitalize">
    {name} · {type.replaceAll('_', ' ').toLowerCase()}
  </span>
</InfoLayout>
