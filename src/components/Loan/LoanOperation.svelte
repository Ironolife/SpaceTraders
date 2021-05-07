<script lang="ts">
  import { payLoan, takeLoan } from '../../api/loan';
  import { userData } from '../../stores';
  import type { AvailableLoan, UserLoan } from '../../types';
  import Button from '../Common/Button.svelte';

  export let operation: 'take' | 'pay';
  export let loan: UserLoan | AvailableLoan;

  $: ({ type } = loan);

  let isLoading = false;
  const handleOperation = async () => {
    isLoading = true;
    switch (operation) {
      case 'take': {
        await takeLoan($userData, type);
        break;
      }
      case 'pay': {
        await payLoan($userData, type);
        break;
      }
    }
    isLoading = false;
  };

  const getDisabledText = (): string | null => {
    switch (operation) {
      case 'take': {
        return null;
      }
      case 'pay': {
        if ($userData.user.credits < (loan as UserLoan).repaymentAmount)
          return 'Insufficient 💵';
        return null;
      }
    }
  };
</script>

<Button
  fullWidth
  props={{ disabled: !!getDisabledText() }}
  disabledText={getDisabledText()}
  {isLoading}
  on:click={handleOperation}
>
  {operation}
</Button>
