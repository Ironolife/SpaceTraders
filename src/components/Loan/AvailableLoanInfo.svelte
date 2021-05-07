<script lang="ts">
  import type { AvailableLoan } from '../../types';
  import InfoList from '../Common/InfoList.svelte';

  export let availableLoan: AvailableLoan;

  $: ({ termInDays, rate, collateralRequired } = availableLoan);
</script>

<InfoList
  entries={[
    { key: 'Terms', value: `${termInDays} Days` },
    { key: 'Rate', value: `${rate}%` },
    { key: 'Collateral', value: collateralRequired ? '✅' : '❎' },
  ]}
/>
