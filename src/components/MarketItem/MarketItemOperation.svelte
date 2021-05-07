<script lang="ts">
  import { buyMarketItem, sellMarketItem } from '../../api/market';
  import { userData } from '../../stores';
  import type { MarketItem, UserShip } from '../../types';
  import Button from '../Common/Button.svelte';
  import StorageIcon from '../Icons/StorageIcon.svelte';
  import TradeDialog from './TradeDialog.svelte';

  export let ship: UserShip;
  export let marketItem: MarketItem;

  $: ({
    symbol,
    quantityAvailable,
    volumePerUnit,
    purchasePricePerUnit,
  } = marketItem);

  $: cargoQuantity =
    ship.cargo.find(({ good }) => good === symbol)?.quantity || 0;

  $: getSellDisabledText = (): string | null => {
    if (cargoQuantity < 1) return 'No Cargo';

    return null;
  };
  $: getBuyDisabledText = (): string | null => {
    if ($userData.user.credits < purchasePricePerUnit) return 'Insufficient 💵';
    if (quantityAvailable < 1) return 'Out of stock';
    if (ship.spaceAvailable < volumePerUnit) return 'Out of space';

    return null;
  };

  let operation: 'buy' | 'sell' | null = null;

  const onBuy = async (quantity: number) => {
    return buyMarketItem($userData, ship.id, symbol, quantity);
  };
  const onSell = async (quantity: number) => {
    return sellMarketItem($userData, ship.id, symbol, quantity);
  };
</script>

<div class="mb-4 py-4 flex items-center justify-center text-3xl font-bold">
  <div class="mr-2 text-green-400">
    <StorageIcon size={32} />
  </div>
  <span>
    {cargoQuantity * volumePerUnit}
    {#if volumePerUnit !== 1 && cargoQuantity > 0}
      <span>({cargoQuantity})</span>
    {/if}
  </span>
</div>
<div class="flex flex-col space-y-2">
  <Button
    fullWidth
    color="tertiary"
    props={{ disabled: !!getSellDisabledText() }}
    disabledText={getSellDisabledText()}
    on:click={() => (operation = 'sell')}
  >
    Sell
  </Button>
  <Button
    fullWidth
    props={{ disabled: !!getBuyDisabledText() }}
    disabledText={getBuyDisabledText()}
    on:click={() => (operation = 'buy')}
  >
    Buy
  </Button>
</div>

{#if operation}
  <TradeDialog
    {ship}
    {operation}
    {marketItem}
    onSubmit={operation === 'buy' ? onBuy : onSell}
    onClose={() => (operation = null)}
  />
{/if}
