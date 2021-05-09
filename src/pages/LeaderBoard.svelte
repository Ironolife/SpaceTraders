<script lang="ts">
  import { onMount } from 'svelte';
  import { getLeaderBoard } from '../api/leaderboard';
  import Spinner from '../components/Common/Spinner.svelte';
  import LeaderboardRecord from '../components/Leaderboard/LeaderboardRecord.svelte';
  import { userData } from '../stores';

  import type { LeaderBoard } from '../types';

  let leaderboard: LeaderBoard;

  onMount(async () => {
    leaderboard = await getLeaderBoard($userData);
  });
</script>

{#if leaderboard}
  <section>
    <h1 class="text-2xl mb-8 leading-10">Leaderboard</h1>
    <div
      class="flex flex-col divide-y divide-white divide-opacity-25 border-t border-b border-white border-opacity-25"
    >
      {#each leaderboard.netWorth as record (record.username)}
        <LeaderboardRecord {record} />
      {/each}
      {#if leaderboard.userNetWorth?.rank > 10}
        <div class="py-6 text-center text-3xl">···</div>
        <LeaderboardRecord record={leaderboard.userNetWorth} />
      {/if}
    </div>
  </section>
{:else}
  <Spinner loadingText="fetching leaderboard" />
{/if}
