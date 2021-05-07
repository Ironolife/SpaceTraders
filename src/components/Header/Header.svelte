<script lang="ts">
  import { route, userData } from '../../stores';
  import auth from '../../utils/auth';
  import router from '../../utils/router';
  import CloseIcon from '../Icons/CloseIcon.svelte';
  import MenuIcon from '../Icons/MenuIcon.svelte';
  import NavButton from './NavButton.svelte';

  const { logout } = auth;

  let isMenuOpen = false;
  const handleToggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  const _logout = () => {
    isMenuOpen = false;
    logout();
  };

  $: homeNavProps = {
    handleClick: () => {
      router.route('/');
      isMenuOpen = false;
    },
    isActive: $route.href === '/',
  };
  $: shipsNavProps = {
    handleClick: () => {
      router.route('/ships');
      isMenuOpen = false;
    },
    isActive: $route.href.includes('/ships'),
  };
  $: systemsNavProps = {
    handleClick: () => {
      router.route('/systems');
      isMenuOpen = false;
    },
    isActive: $route.href.includes('/systems'),
  };
  $: leaderboardNavProps = {
    handleClick: () => {
      router.route('/leaderboard');
      isMenuOpen = false;
    },
    isActive: $route.href.includes('/leaderboard'),
  };
  $: creditsNavProps = {
    handleClick: () => {
      router.route('/loans');
      isMenuOpen = false;
    },
    isActive: $route.href.includes('/loans'),
  };
</script>

<header
  class="flex-shrink-0 flex items-center p-4 border-b border-white border-opacity-50"
>
  <button class="lg:hidden mr-4" on:click={handleToggleMenu} aria-label="menu">
    {#if isMenuOpen}
      <CloseIcon />
    {:else}
      <MenuIcon />
    {/if}
  </button>
  <div class="hidden lg:inline-flex items-center space-x-2">
    <NavButton {...homeNavProps}>🏠 Home</NavButton>
    <NavButton {...shipsNavProps}>🚀 Ships</NavButton>
    <NavButton {...systemsNavProps}>🌌 Systems</NavButton>
    <NavButton {...leaderboardNavProps}>🏆 Leaderboard</NavButton>
  </div>
  <div class="flex-1" />
  {#if $userData}
    <div class="inline-flex space-x-2">
      <NavButton>
        <span class="normal-case">👨‍🚀 {$userData.user.username}</span>
      </NavButton>
      <NavButton {...creditsNavProps}>💵 {$userData.user.credits}</NavButton>
      <span class="hidden lg:inline-block">
        <NavButton handleClick={_logout}>🚪 Logout</NavButton>
      </span>
    </div>
  {:else}
    <NavButton>🔑 Not Logged In</NavButton>
  {/if}
</header>

{#if isMenuOpen}
  <div
    class="flex lg:hidden flex-col items-center py-8 space-y-2 border-b border-white border-opacity-50"
  >
    <NavButton {...homeNavProps} fullWidth>🏠 Home</NavButton>
    <NavButton {...shipsNavProps} fullWidth>🚀 Ships</NavButton>
    <NavButton {...systemsNavProps} fullWidth>🌍 Systems</NavButton>
    <NavButton {...leaderboardNavProps} fullWidth>🏆 Leaderboard</NavButton>
    {#if $userData}
      <NavButton handleClick={_logout} fullWidth>🚪 Logout</NavButton>
    {/if}
  </div>
{/if}
