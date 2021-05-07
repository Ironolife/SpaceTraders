<script lang="ts">
  import { userData } from '../../stores';
  import type { PurchaseLocation } from '../../types';
  import Button from '../Common/Button.svelte';

  export let purchaseLocation: PurchaseLocation;
  $: ({ location, price } = purchaseLocation);

  export let onBuy: () => Promise<void>;
  let isLoading = false;
  const handleBuy = async () => {
    isLoading = true;
    await onBuy();
    isLoading = false;
  };

  $: getBuyDisabledText = (): string | null => {
    if ($userData.user.credits < price) return 'Insufficient 💵';
    if (
      $userData.user.ships.length &&
      !$userData.user.ships.map(({ location }) => location).includes(location)
    )
      return 'No docked 🚀';

    return null;
  };
</script>

<div class="p-4 flex flex-col bg-white bg-opacity-10">
  <div class="mb-4 flex text-xl">
    <span>🛰️ {location}</span>
    <span class="flex-1" />
    <span class="font-bold">💵 {price}</span>
  </div>
  <Button
    fullWidth
    props={{ disabled: !!getBuyDisabledText() }}
    disabledText={getBuyDisabledText()}
    {isLoading}
    on:click={handleBuy}
  >
    Buy
  </Button>
</div>
