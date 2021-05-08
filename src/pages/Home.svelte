<script>
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import Banner from '../components/Common/Banner.svelte';
  import { userData } from '../stores';
  import router from '../utils/router';
  dayjs.extend(relativeTime);

  $: loanDueDate = $userData.user.loans
    .map(({ due }) => due)
    .sort((a, b) => dayjs(a).diff(dayjs(b)))[0];
  $: haveAShip = $userData.user.ships.length;
</script>

<div class="grid grid-col-1 xl:grid-cols-2 gap-4">
  {#if !loanDueDate}
    <Banner on:click={() => router.route('/loans')}>
      <span slot="text">Low on credits?<br />Take a loan!</span>
      <span slot="icon">💵</span>
      <div
        slot="background"
        class="absolute inset-0 bg-gradient-to-br from-blue-500 via-green-600 to-green-700 opacity-90"
      />
    </Banner>
  {:else}
    <Banner on:click={() => router.route('/loans')}>
      <span slot="text">Loan due<br />{dayjs(loanDueDate).fromNow()}</span>
      <span slot="icon">💵</span>
      <div
        slot="background"
        class="absolute inset-0 bg-gradient-to-br from-yellow-500 to-red-700 opacity-90"
      />
    </Banner>
  {/if}
  {#if haveAShip}
    <Banner isIconFirst={false} on:click={() => router.route('/ships')}>
      <span slot="text">Manage<br />your fleet</span>
      <span slot="icon">🚀</span>
      <div
        slot="background"
        class="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-700 opacity-90"
      />
    </Banner>
  {:else}
    <Banner isIconFirst={false} on:click={() => router.route('/ships')}>
      <span slot="text">Purchase<br />a ship</span>
      <span slot="icon">🚀</span>
      <div
        slot="background"
        class="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-700 opacity-90"
      />
    </Banner>
  {/if}
  <Banner on:click={() => router.route('/systems')}>
    <span slot="text">Explore<br />the systems</span>
    <span slot="icon">🌌</span>
    <div
      slot="background"
      class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-800 to-purple-900 opacity-90"
    />
  </Banner>
  <Banner isIconFirst={false} on:click={() => router.route('/leaderboard')}>
    <span slot="text">Compete<br />for Hiscore</span>
    <span slot="icon">🏆</span>
    <div
      slot="background"
      class="absolute inset-0 bg-gradient-to-br from-green-500 to-yellow-400 opacity-90"
    />
  </Banner>
  <a
    class="md:col-span-2"
    href="https://spacetraders.io/"
    target="_blank"
    rel="noreferrer"
  >
    <Banner>
      <span slot="text">SpaceTraders API</span>
      <span slot="icon">📖</span>
      <div
        slot="background"
        class="absolute inset-0 bg-gradient-to-br from-pink-500 to-yellow-700 opacity-90"
      />
    </Banner>
  </a>
</div>
