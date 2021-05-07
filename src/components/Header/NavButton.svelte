<script lang="ts">
  export let handleClick: () => void | undefined = undefined;
  export let fullWidth = false;
  export let isActive: boolean = false;
</script>

<button
  class="px-4 py-1.5 uppercase text-center whitespace-nowrap bg-purple-400 hover:text-purple-400 bg-opacity-0 hover:bg-opacity-10"
  class:w-full={fullWidth}
  class:rounded={!fullWidth}
  class:text-purple-400={isActive}
  on:click={handleClick}
>
  <slot />
</button>
