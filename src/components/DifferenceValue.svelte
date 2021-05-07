<script lang="ts">
  export let value: number;
  export let isInverted = false;

  $: isBeneficial = isInverted ? value < 0 : value >= 0;
</script>

<span class={isBeneficial ? 'text-green-400' : 'text-red-400'}>
  ({#if value >= 0}+{/if}{value})
</span>
