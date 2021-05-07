<script lang="ts">
  import type { UserShip } from '../../types';
  import router from '../../utils/router';
  import Button from '../Common/Button.svelte';

  export let ship: UserShip;

  $: ({ id, location, x, y } = ship);

  const handleView = () => router.route(`/ships/${id}`);
</script>

<div class="p-4 flex flex-col bg-white bg-opacity-10">
  <div class="mb-4 flex text-xl">
    {#if location}
      <span>🛰️ {location}</span>
      <span class="flex-1" />
      <span>🧭 {x} , {y}</span>
    {:else}
      <span class="flex-1 text-center">⏳ En Route</span>
    {/if}
  </div>
  <Button fullWidth color="secondary" on:click={handleView}>View</Button>
</div>
