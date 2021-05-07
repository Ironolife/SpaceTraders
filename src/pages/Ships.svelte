<script lang="ts">
  import { onMount } from 'svelte';
  import { buyShip, getShips } from '../api/ship';
  import Card from '../components/Common/Card.svelte';
  import Grid from '../components/Common/Grid.svelte';
  import Spinner from '../components/Common/Spinner.svelte';
  import PurchaseLocation from '../components/Ship/PurchaseLocation.svelte';
  import ShipBaseInfo from '../components/Ship/ShipBaseInfo.svelte';
  import ShipLocation from '../components/Ship/ShipLocation.svelte';
  import ShipStatsInfo from '../components/Ship/ShipStatsInfo.svelte';
  import { userData } from '../stores';
  import type { AvailableShip } from '../types';

  let availableShips: AvailableShip[] | undefined = undefined;

  onMount(async () => {
    availableShips = await getShips($userData);
  });

  const _buyShip = async (location: string, type: string) => {
    await buyShip($userData, location, type);
  };
</script>

{#if availableShips}
  <section class="mb-8">
    <h1 class="text-2xl mb-8 leading-10">My Ships</h1>
    {#if $userData.user.ships.length > 0}
      <Grid>
        {#each $userData.user.ships as usership (usership.id)}
          <Card noMargin>
            <div class="flex flex-col space-y-4">
              <div>
                <div class="p-4">
                  <ShipBaseInfo ship={usership} />
                </div>
                <div
                  class="p-4 border-t-4 border-b-4 border-double border-white border-opacity-50"
                >
                  <ShipStatsInfo ship={usership} />
                </div>
              </div>
              <ShipLocation ship={usership} />
            </div>
          </Card>
        {/each}
      </Grid>
    {:else}
      <div class="py-8 text-center text-xl">No ships found</div>
    {/if}
  </section>
  <section>
    <h1 class="text-2xl mb-8 leading-10">Available Ships</h1>
    {#if availableShips.length > 0}
      <Grid>
        {#each availableShips as availableShip (availableShip.type)}
          <Card noMargin>
            <div class="flex flex-col space-y-4">
              <div>
                <div class="p-4">
                  <ShipBaseInfo ship={availableShip} />
                </div>
                <div
                  class="p-4 border-t-4 border-b-4 border-double border-white border-opacity-50"
                >
                  <ShipStatsInfo ship={availableShip} />
                </div>
              </div>
              {#each availableShip.purchaseLocations as purchaseLocation (purchaseLocation.location)}
                <PurchaseLocation
                  {purchaseLocation}
                  onBuy={() =>
                    _buyShip(purchaseLocation.location, availableShip.type)}
                />
              {/each}
            </div>
          </Card>
        {/each}
      </Grid>
    {:else}
      <div class="py-8 text-center text-xl">No ships available</div>
    {/if}
  </section>
{:else}
  <Spinner loadingText="fetching ships" />
{/if}
