<script lang="ts">
  import { onMount } from 'svelte';
  import type { AuthDetails } from '../utils/auth';
  import auth from '../utils/auth';
  import Backdrop from './Common/Backdrop.svelte';
  import Button from './Common/Button.svelte';
  import FormControl from './Form/FormControl.svelte';
  import LoadingIcon from './Icons/LoadingIcon.svelte';

  let isReady = false;
  let isLoading = false;

  const { init, register, login } = auth;

  onMount(async () => {
    await init();
    isReady = true;
  });

  let { username, accessToken }: AuthDetails = {
    username: '',
    accessToken: '',
  };

  let errors: Partial<AuthDetails> = {};

  const handleSubmit = async () => {
    isLoading = true;

    if (isLogin) errors = await login(username, accessToken);
    else {
      const res = await register(username);
      if (typeof res === 'string') {
        accessToken = res;
      } else {
        errors = res;
      }
    }

    isLoading = false;
  };

  let isLogin = true;

  const handleToggleMode = () => {
    isLogin = !isLogin;
    accessToken = '';
  };

  const clearErrors = () => {
    errors = {};
  };
</script>

<Backdrop />

<div class="absolute-center w-full max-w-md px-4 z-20">
  <form
    class="p-8 flex flex-col bg-gray-800 rounded shadow-lg"
    on:submit|preventDefault={handleSubmit}
  >
    <h1 class="self-center mb-8 text-2xl font-bold">SpaceTraders</h1>
    {#if isReady}
      <div class="flex flex-col space-y-4 mb-12">
        <FormControl label="Username" name="username" error={errors.username}>
          <input
            id="username"
            type="text"
            required
            bind:value={username}
            on:input={clearErrors}
            readonly={isLoading}
          />
        </FormControl>
        {#if isLogin || (!isLogin && accessToken)}
          <FormControl
            label="Access Token"
            name="accessToken"
            error={errors.accessToken}
          >
            {#if isLogin}
              <input
                id="accessToken"
                type="text"
                required
                bind:value={accessToken}
                on:input={clearErrors}
                readonly={isLoading}
              />
            {:else}
              <span class="text-green-400 break-all select-text mb-4">
                {accessToken}
              </span>
              <span class="text-yellow-400">
                Don't forget to save your access token!
              </span>
            {/if}
          </FormControl>
        {/if}
      </div>
      <div class="flex items-start">
        {#if isLogin || (!isLogin && !accessToken)}
          <button
            class="text-lg underline"
            type="button"
            on:click={handleToggleMode}
            disabled={isLoading}
          >
            {#if isLogin}
              New User?
            {:else}
              Registered?
            {/if}
          </button>
        {/if}
        <span class="flex-1" />
        {#if isLogin || (!isLogin && !accessToken)}
          <Button props={{ type: 'submit' }} {isLoading}>
            {#if isLogin}
              Login
            {:else}
              Register
            {/if}
          </Button>
        {:else}
          <Button on:click={handleToggleMode}>Login</Button>
        {/if}
      </div>
    {:else}
      <div class="self-center animate-spin">
        <LoadingIcon />
      </div>
    {/if}
  </form>
</div>
