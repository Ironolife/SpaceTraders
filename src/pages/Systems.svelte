<script lang="ts">
  import { onMount } from 'svelte';
  import { getSystems } from '../api/system';
  import BackButton from '../components/Common/BackButton.svelte';
  import Button from '../components/Common/Button.svelte';
  import Card from '../components/Common/Card.svelte';
  import Grid from '../components/Common/Grid.svelte';
  import Spinner from '../components/Common/Spinner.svelte';
  import SystemBaseInfo from '../components/System/SystemBaseInfo.svelte';
  import { systems, userData } from '../stores';
  import type { System } from '../types';
  import router from '../utils/router';

  onMount(async () => {
    if (!$systems) {
      const _systems = await getSystems($userData);
      systems.set(_systems);
    }
  });
</script>

{#if $systems}
  <section>
    <h1 class="text-2xl mb-8 leading-10">Systems</h1>
    {#if $systems.length}
      <Grid>
        {#each $systems as system (system.symbol)}
          <Card>
            <div class="flex flex-col space-y-4">
              <SystemBaseInfo {system} />
              <Button
                fullWidth
                on:click={() => router.route(`/systems/${system.symbol}`)}
              >
                Select
              </Button>
            </div>
          </Card>
        {/each}
      </Grid>
    {:else}
      <div class="py-8 text-center text-xl">No systems found</div>
    {/if}
  </section>
{:else}
  <Spinner loadingText="fetching systems" />
{/if}
