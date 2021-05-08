<script lang="ts">
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';
  import { systems } from '../../stores';
  import type { FlightPlan } from '../../types';
  import getRemainingTime from '../../utils/getRemainingTime';
  import { getLocationIcon } from '../../utils/IconMaps';
  import Card from '../Common/Card.svelte';
  import StarryBackground from '../StarryBackground.svelte';

  export let flightPlan: FlightPlan;

  const { departure, destination, createdAt, arrivesAt, distance } = flightPlan;

  const duration = dayjs(arrivesAt).diff(dayjs(createdAt), 'seconds');

  let timeRemaining = getRemainingTime(arrivesAt);
  $: percentage = (1 - timeRemaining / duration) * 100;

  onMount(() => {
    const interval = setInterval(() => {
      timeRemaining = getRemainingTime(arrivesAt);
    });

    return () => clearInterval(interval);
  });

  const fromLocation = $systems
    .map(({ locations }) => locations)
    .flat()
    .find(({ symbol }) => symbol === departure);
  const toLocation = $systems
    .map(({ locations }) => locations)
    .flat()
    .find(({ symbol }) => symbol === destination);
</script>

<Card>
  <div class="relative">
    <div class="relative flex justify-center space-x-8 text-2xl font-bold z-10">
      <span>📍 ~{distance.toFixed(0)}</span>
      <span class="md:hidden flex-1" />
      <span>⏳ {timeRemaining}s</span>
    </div>
    <div
      class="relative flex flex-col md:flex-row space-y-8 md:space-y-0 items-center z-10"
    >
      <div
        class="h-40 w-40 flex flex-col items-center justify-center space-y-2"
      >
        <span class="text-2xl">{fromLocation.symbol}</span>
        <span class="text-4xl">{getLocationIcon(fromLocation.type)}</span>
        <span class="text-2xl">{fromLocation.name}</span>
      </div>
      <div
        class="relative h-64 md:h-0 border border-dashed border-white border-opacity-50"
        style="flex: 1 0 auto;"
      >
        <span
          class="hidden md:inline-block text-2xl absolute top-0 transform -translate-y-1/2 -translate-x-1/2 transition-all ease-linear duration-1000"
          style={`left: ${percentage}%`}>🚀</span
        >
        <span
          class="md:hidden text-2xl absolute left-0 transform -translate-y-1/2 -translate-x-1/2 transition-all ease-linear duration-1000"
          style={`top: ${percentage}%`}>🚀</span
        >
      </div>
      <div
        class="h-40 w-40 flex flex-col items-center justify-center space-y-2"
      >
        <span class="text-2xl">{toLocation.symbol}</span>
        <span class="text-4xl">{getLocationIcon(toLocation.type)}</span>
        <span class="text-2xl">{toLocation.name}</span>
      </div>
    </div>
    <StarryBackground />
  </div>
</Card>
