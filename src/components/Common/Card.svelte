<script lang="ts">
  export let noMargin = false;
</script>

<div
  class="h-full bg-gray-800 rounded overflow-hidden shadow-lg"
  class:p-4={!noMargin}
>
  <slot />
</div>
