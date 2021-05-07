<script lang="ts">
  import type { LeaderBoardRecord } from '../../types';
  export let record: LeaderBoardRecord;

  $: ({ rank, username, netWorth } = record);
</script>

<div
  class="px-4 py-4 md:py-6 flex items-center alt-bg min-w-0 w-full overflow-hidden"
>
  <span class="md:w-36 flex-shrink-0 text-2xl md:text-2xl font-bold">
    #{rank}
  </span>
  <span
    class="flex-1 flex flex-col space-y-4 md:space-y-0 md:flex-row text-right md:text-left"
  >
    <span class="flex-1 text-lg md:text-xl whitespace-nowrap">{username}</span>
    <span class="text-xl md:text-2xl">{netWorth} 💵</span>
  </span>
</div>
