<script lang="ts">
  import type { CargoItem, UserShip } from '../../types';
  import Backdrop from '../Common/Backdrop.svelte';
  import Button from '../Common/Button.svelte';
  import QuantityInput from '../Common/QuantityInput.svelte';
  import CloseIcon from '../Icons/CloseIcon.svelte';
  import StorageIcon from '../Icons/StorageIcon.svelte';

  export let ship: UserShip;
  export let cargoItem: CargoItem;
  export let onClose: () => void;
  export let onSubmit: (quantity: number) => Promise<string | null>;

  $: ({ maxCargo, spaceAvailable } = ship);
  $: ({ good, quantity: cargoQuantity, totalVolume } = cargoItem);

  let quantity = 1;
  $: spaceOccupied =
    maxCargo - spaceAvailable - (quantity * totalVolume) / cargoQuantity;

  let error: string | undefined = undefined;

  let isLoading = false;
  const handleSubmit = async () => {
    isLoading = true;
    error = await onSubmit(quantity);
    isLoading = false;

    if (!error) {
      onClose();
    }
  };
</script>

<Backdrop on:click={onClose} />

<div class="absolute-center w-full max-w-md px-4 z-20">
  <form
    class="relative p-8 flex flex-col bg-gray-800 rounded shadow-lg"
    on:submit|preventDefault={handleSubmit}
  >
    <button
      class="absolute top-4 right-4"
      type="button"
      aria-label="close"
      on:click={onClose}
    >
      <CloseIcon size={32} />
    </button>
    <h1 class="self-center mb-8 text-2xl font-bold capitalize">
      Jettison
      {good.replaceAll('_', ' ').toLowerCase()}
    </h1>
    <div class="mb-4">
      <QuantityInput bind:quantity max={cargoQuantity} min={1} {error} />
    </div>
    <div class="mb-8 flex items-center text-2xl font-bold">
      <span class="mr-2 text-green-400">
        <StorageIcon />
      </span>
      <span class:text-red-400={spaceOccupied === maxCargo}>
        {spaceOccupied} / {maxCargo}
      </span>
    </div>
    <Button color="quaternary" fullWidth props={{ type: 'submit' }} {isLoading}>
      Jettison
    </Button>
  </form>
</div>
