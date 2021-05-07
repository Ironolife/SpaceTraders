<script lang="ts">
  import type { AvailableLoan, UserLoan } from '../../types';

  export let loan: UserLoan | AvailableLoan;

  $: ({ type } = loan);

  $: amount =
    (loan as AvailableLoan).amount || (loan as UserLoan).repaymentAmount;
</script>

<div class="text-center">
  <div class="mb-2 text-2xl opacity-50">{type}</div>
  <div class="mb-2 text-4xl">💵</div>
  <div class="text-2xl font-bold">{amount}</div>
</div>
