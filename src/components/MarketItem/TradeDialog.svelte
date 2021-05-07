<script lang="ts">
  import { userData } from '../../stores';
  import type { MarketItem, UserShip } from '../../types';
  import Backdrop from '../Common/Backdrop.svelte';
  import Button from '../Common/Button.svelte';
  import QuantityInput from '../Common/QuantityInput.svelte';
  import CloseIcon from '../Icons/CloseIcon.svelte';
  import StorageIcon from '../Icons/StorageIcon.svelte';

  export let ship: UserShip;
  export let operation: 'buy' | 'sell';
  export let marketItem: MarketItem;
  export let onClose: () => void;
  export let onSubmit: (quantity: number) => Promise<string | null>;

  $: ({ maxCargo, spaceAvailable } = ship);
  $: ({
    symbol,
    quantityAvailable,
    purchasePricePerUnit,
    sellPricePerUnit,
    volumePerUnit,
  } = marketItem);

  let quantity = 1;
  $: spaceOccupied =
    maxCargo -
    spaceAvailable +
    quantity * volumePerUnit * (operation === 'buy' ? 1 : -1);
  $: cargoQuantity =
    ship.cargo.find(({ good }) => good === symbol)?.quantity || 0;

  let error: string | undefined = undefined;

  $: max =
    operation === 'buy'
      ? Math.min(
          quantityAvailable,
          Math.floor(spaceAvailable / volumePerUnit),
          Math.floor($userData.user.credits / purchasePricePerUnit)
        )
      : cargoQuantity;

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
      {operation}
      {symbol.replaceAll('_', ' ').toLowerCase()}
    </h1>
    <div class="mb-4">
      <QuantityInput bind:quantity {max} min={1} {error} />
    </div>
    <div class="mb-8 flex items-center text-2xl font-bold">
      <span class="flex items-center">
        <span class="mr-2 text-green-400">
          <StorageIcon />
        </span>
        <span class:text-red-400={spaceOccupied === maxCargo}>
          {spaceOccupied} / {maxCargo}
        </span>
      </span>
      <span class="flex-1" />
      <span>
        💵 {quantity *
          (operation === 'buy' ? purchasePricePerUnit : sellPricePerUnit)}
      </span>
    </div>
    <Button
      color={operation === 'buy' ? 'primary' : 'tertiary'}
      fullWidth
      props={{ type: 'submit' }}
      {isLoading}
    >
      {operation}
    </Button>
  </form>
</div>
