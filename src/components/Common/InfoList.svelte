<script lang="ts">
  import type { KeyValuePair } from '../../types';

  export let entries: KeyValuePair[];
</script>

<div
  class="flex flex-col divide-y divide-white divide-dashed divide-opacity-50 border-t-4 border-b-4 border-double border-white border-opacity-50 text-xl"
>
  {#each entries as { key, value } (key)}
    <div class="flex py-2">
      <span>{key}</span>
      <span class="flex-1" />
      <span class="font-bold">{value}</span>
    </div>
  {/each}
</div>
