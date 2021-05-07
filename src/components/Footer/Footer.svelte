<script lang="ts">
  import BioLink from './BioLink.svelte';
  import Status from './Status.svelte';
</script>

<footer
  class="flex-shrink-0 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 p-4 text-sm lg:text-base text-center border-t border-white border-opacity-50"
>
  <Status />
  <span class="hidden lg:inline-block flex-1" />
  <BioLink />
</footer>
