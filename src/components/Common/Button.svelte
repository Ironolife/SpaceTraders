<script lang="ts">
  export let props:
    | svelte.JSX.HTMLAttributes<HTMLButtonElement>
    | undefined = undefined;
  export let isLoading = false;
  export let disabledText: string | undefined = undefined;
  export let color: 'primary' | 'secondary' | 'tertiary' | 'quaternary' =
    'primary';
  export let fullWidth = false;
</script>

<button
  class="px-4 py-1.5 text-lg uppercase text-center rounded shadow filter {props?.disabled ||
  isLoading
    ? 'pointer-events-none saturate-50 opacity-50'
    : 'hover:brightness-110 active:brightness-90'}"
  class:bg-purple-600={color === 'primary'}
  class:bg-indigo-600={color === 'secondary'}
  class:bg-green-600={color === 'tertiary'}
  class:bg-yellow-600={color === 'quaternary'}
  class:w-full={fullWidth}
  {...props}
  on:click
>
  {#if isLoading}
    Loading...
  {:else if disabledText && props?.disabled}
    {disabledText}
  {:else}
    <slot />
  {/if}
</button>
