<script lang="ts">
  export let name: string;
  export let label: string;
  export let hideLabel = false;
  export let error: string | undefined = undefined;
</script>

<div class="control flex flex-col space-y-2">
  {#if !hideLabel}
    <label class="text-lg" for={name}>{label}</label>
  {/if}
  <slot />
  {#if error}
    <span class="text-red-400">{error}</span>
  {/if}
</div>

<style>
  :global(.control input) {
    @apply p-2 bg-black bg-opacity-20 border-b-2 border-white border-opacity-50 rounded-none;
  }
  :global(.control input:focus) {
    @apply border-opacity-100;
  }
</style>
