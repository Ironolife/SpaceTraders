<script lang="ts">
  import type { DockedShip } from '../../types';

  export let dockedShips: DockedShip[];
</script>

<div class="h-full w-full grid place-items-center text-5xl font-bold">
  🚀 {dockedShips?.length}
</div>
