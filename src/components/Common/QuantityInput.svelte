<script lang="ts">
  import FormControl from '../Form/FormControl.svelte';
  import Button from './Button.svelte';

  export let quantity: number;
  export let max: number;
  export let min: number = 1;
  export let error: string | undefined = undefined;

  $: changeQuantity = (value: number) => {
    let changedQuantity = quantity + value;
    if (changedQuantity < min) changedQuantity = min;
    if (changedQuantity > max) changedQuantity = max;
    quantity = changedQuantity;
  };

  $: canChangeQuantity = (value: number) => {
    if (value > 0) return !(quantity >= max);
    if (value < 0) return !(quantity <= min);
  };
</script>

<div>
  <div class="mb-2">
    <FormControl label="Quantity" hideLabel name="quantity" {error}>
      <input
        class="text-2xl font-bold text-center"
        id="quantity"
        required
        bind:value={quantity}
        readonly
      />
    </FormControl>
  </div>
  <div class="flex space-x-2">
    <Button
      fullWidth
      color="secondary"
      props={{ type: 'button', disabled: !canChangeQuantity(-10) }}
      on:click={() => changeQuantity(-10)}
    >
      -10
    </Button>
    <Button
      fullWidth
      color="secondary"
      props={{ type: 'button', disabled: !canChangeQuantity(-1) }}
      on:click={() => changeQuantity(-1)}
    >
      -1
    </Button>
    <Button
      fullWidth
      color="secondary"
      props={{ type: 'button', disabled: !canChangeQuantity(1) }}
      on:click={() => changeQuantity(1)}
    >
      +1
    </Button>
    <Button
      fullWidth
      color="secondary"
      props={{ type: 'button', disabled: !canChangeQuantity(10) }}
      on:click={() => changeQuantity(10)}
    >
      +10
    </Button>
  </div>
</div>
