<script lang="ts">
  import { onMount } from 'svelte';

  let status: number;
  let message: string = 'Loading...';

  onMount(async () => {
    const res = await fetch('https://api.spacetraders.io/game/status', {
      method: 'GET',
    });

    status = res.status;
    message = (await res.json()).status || 'spacetraders server unreachable';
  });
</script>

<span>
  <span
    class="inline-block align-middle w-3 h-3 mr-4 rounded-full"
    class:bg-gray-400={!status}
    class:bg-green-400={status && status === 200}
    class:bg-red-400={status && status !== 200}
  />
  <span>{message}</span>
</span>
