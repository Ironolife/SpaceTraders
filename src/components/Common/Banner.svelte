<script lang="ts">
  export let isIconFirst: boolean = true;
</script>

<button
  class="relative w-full h-48 md:h-56 rounded overflow-hidden shadow-lg filter hover:brightness-110 active:brightness-90"
  on:click
>
  <div
    class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0"
  >
    <div
      class="relative text-5xl md:text-7xl z-10 {isIconFirst
        ? 'md:order-1'
        : 'md:order-3'}"
    >
      <slot name="icon" />
    </div>
    <div class="hidden md:block px-8 order-2" />
    <div
      class="relative text-2xl md:text-4xl font-bold text-center capitalize z-10 {isIconFirst
        ? 'md:order-3'
        : 'md:order-1'}"
    >
      <slot name="text" />
    </div>
  </div>
  <slot name="background" />
</button>
