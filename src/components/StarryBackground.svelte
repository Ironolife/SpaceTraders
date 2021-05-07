<script lang="ts">
  import { onMount } from 'svelte';

  let stars = new Array(30).fill(null).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: 0.1 + Math.random() * 0.5,
  }));

  onMount(() => {
    let frame: number;

    const loop = () => {
      frame = requestAnimationFrame(loop);

      stars = stars.map((star) => {
        star.x -= 0.2 * star.r;
        if (star.x < -20) star.x = 120;
        return star;
      });
    };

    loop();

    return () => cancelAnimationFrame(frame);
  });
</script>

{#each stars as { x, y, r }}
  <span
    class="absolute w-2 h-2 bg-yellow-200 rounded-full"
    style="left: {x}%; top: {y}%; transform: scale({r});"
  />
{/each}
