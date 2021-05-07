<script lang="ts">
  import { jettisonCargo } from '../../api/ship';
  import { userData } from '../../stores';

  import type { CargoItem, UserShip } from '../../types';

  import Button from '../Common/Button.svelte';
  import JettisonDialog from './JettisonDialog.svelte';

  export let ship: UserShip;
  export let cargoItem: CargoItem;

  $: ({ good } = cargoItem);

  let operation: 'jettison' | null = null;

  const onJettison = async (quantity: number) => {
    return jettisonCargo($userData, ship.id, good, quantity);
  };
</script>

<div class="flex flex-col space-y-2">
  <Button fullWidth color="quaternary" on:click={() => (operation = 'jettison')}
    >Jettison</Button
  >
</div>

{#if operation}
  <JettisonDialog
    {ship}
    {cargoItem}
    onSubmit={onJettison}
    onClose={() => (operation = null)}
  />
{/if}
