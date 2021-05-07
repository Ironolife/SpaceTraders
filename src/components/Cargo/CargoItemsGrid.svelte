<script lang="ts">
  import type { UserShip } from '../../types';
  import Card from '../Common/Card.svelte';
  import Grid from '../Common/Grid.svelte';
  import CargoItemBaseInfo from './CargoItemBaseInfo.svelte';
  import CargoItemOperation from './CargoItemOperation.svelte';

  export let ship: UserShip;
</script>

{#if ship.cargo.length}
  <Grid>
    {#each ship.cargo as cargoItem (cargoItem.good)}
      <Card>
        <div class="flex flex-col">
          <div class="mb-4">
            <CargoItemBaseInfo {cargoItem} />
          </div>
          <CargoItemOperation {cargoItem} {ship} />
        </div>
      </Card>
    {/each}
  </Grid>
{:else}
  <div class="py-8 text-center text-xl">No cargo found</div>
{/if}
