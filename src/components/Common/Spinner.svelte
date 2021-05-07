<script lang="ts">
  import LoadingIcon from '../Icons/LoadingIcon.svelte';

  export let loadingText: string;
</script>

<div class="h-full w-full grid place-items-center">
  <div class="flex flex-col items-center">
    <div class="animate-spin mb-4">
      <LoadingIcon />
    </div>
    {#if loadingText}
      <span>{loadingText}</span>
    {/if}
  </div>
</div>
