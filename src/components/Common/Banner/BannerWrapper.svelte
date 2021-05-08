<script lang="ts">
  export let href: string | undefined = undefined;
</script>

{#if href}
  <a
    class="relative block w-full h-48 md:h-56 rounded overflow-hidden shadow-lg filter hover:brightness-110 active:brightness-90"
    {href}
    target="_blank"
    rel="noreferrer"
    on:click
  >
    <slot />
  </a>
{:else}
  <button
    class="relative block w-full h-48 md:h-56 rounded overflow-hidden shadow-lg filter hover:brightness-110 active:brightness-90"
    on:click
  >
    <slot />
  </button>
{/if}
