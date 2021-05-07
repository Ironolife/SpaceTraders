<script lang="ts">
  import { onMount } from 'svelte';
  export let disableScroll = true;

  onMount(() => {
    if (disableScroll) {
      const html = document.getElementsByTagName('html').item(0);
      const scrollTop = document.documentElement.scrollTop;

      html.classList.add('fixed', 'w-full');
      html.style.top = `-${scrollTop}px`;

      return () => {
        html.classList.remove('fixed', 'w-full');
        html.style.top = 'unset';
        html.scroll({
          top: scrollTop,
        });
      };
    }
  });
</script>

<div class="fixed inset-0 bg-black bg-opacity-40 z-10" on:click />
