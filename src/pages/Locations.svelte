<script lang="ts">
  import { onMount } from 'svelte';
  import { getSystems } from '../api/system';
  import BackButton from '../components/Common/BackButton.svelte';
  import Button from '../components/Common/Button.svelte';
  import Card from '../components/Common/Card.svelte';
  import Grid from '../components/Common/Grid.svelte';
  import Spinner from '../components/Common/Spinner.svelte';
  import LocationBaseInfo from '../components/System/LocationBaseInfo.svelte';
  import { route, systems, userData } from '../stores';
  import router from '../utils/router';

  onMount(async () => {
    if (!$systems) {
      const _systems = await getSystems($userData);
      systems.set(_systems);
    }
  });

  $: system =
    $systems?.find(({ symbol }) => symbol === $route.params?.system) || null;
</script>

{#if $systems}
  <section>
    <div class="mb-8 flex items-center space-x-4">
      <BackButton on:click={() => router.route('/systems')} />
      <h1 class="text-2xl leading-10">🌌 {$route.params?.system}</h1>
    </div>
    {#if system}
      {#if system.locations.length}
        <Grid>
          {#each system.locations as location}
            <Card>
              <div class="flex flex-col space-y-4">
                <LocationBaseInfo {location} />
                <Button
                  fullWidth
                  on:click={() =>
                    router.route(
                      `/systems/${system.symbol}/${location.symbol}`
                    )}
                >
                  View
                </Button>
              </div>
            </Card>
          {/each}
        </Grid>
      {:else}
        <div class="py-8 text-center text-xl">No locations found</div>
      {/if}
    {:else}
      <div class="py-8 text-center text-xl">System not found</div>
    {/if}
  </section>
{:else}
  <Spinner loadingText="fetching systems" />
{/if}
