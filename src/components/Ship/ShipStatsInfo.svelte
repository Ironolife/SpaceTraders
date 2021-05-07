<script lang="ts">
  import type { Ship, UserShip } from '../../types';
  import AttackIcon from '../Icons/AttackIcon.svelte';
  import DefenseIcon from '../Icons/DefenseIcon.svelte';
  import SpeedIcon from '../Icons/SpeedIcon.svelte';
  import StorageIcon from '../Icons/StorageIcon.svelte';

  export let ship: Ship;
  export let size: 'md' | 'lg' = 'md';

  $: ({ weapons, plating, speed, maxCargo } = ship);
  $: spaceAvailable = (ship as UserShip).spaceAvailable;
</script>

<div
  class="flex items-center justify-around"
  class:text-2xl={size === 'md'}
  class:text-3xl={size === 'lg'}
>
  <div
    class="flex flex-col items-center text-blue-400"
    class:space-y-2={size === 'md'}
    class:space-y-4={size === 'lg'}
    title="plating"
  >
    <div class="font-bold">{plating}</div>
    <DefenseIcon size={size === 'lg' ? 32 : 24} />
  </div>
  <div>
    <div
      class="flex flex-col items-center text-red-400"
      class:space-y-2={size === 'md'}
      class:space-y-4={size === 'lg'}
      class:mb-4={size === 'md'}
      class:mb-8={size === 'lg'}
      title="weapons"
    >
      <div class="font-bold">{weapons}</div>
      <AttackIcon size={size === 'lg' ? 32 : 24} />
    </div>
    <div
      class="flex flex-col items-center text-green-400"
      class:space-y-2={size === 'md'}
      class:space-y-4={size === 'lg'}
      title="cargo capacity"
    >
      <div class="font-bold">
        {#if spaceAvailable !== undefined}{maxCargo - spaceAvailable} /
        {/if}{maxCargo}
      </div>
      <StorageIcon size={size === 'lg' ? 32 : 24} />
    </div>
  </div>
  <div
    class="flex flex-col items-center text-yellow-400"
    class:space-y-2={size === 'md'}
    class:space-y-4={size === 'lg'}
    title="speed"
  >
    <div class="font-bold">{speed}</div>
    <SpeedIcon size={size === 'lg' ? 32 : 24} />
  </div>
</div>
