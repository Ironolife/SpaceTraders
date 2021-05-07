<script lang="ts">
  import { onMount } from 'svelte';
  import { getLoans } from '../api/loan';
  import Card from '../components/Common/Card.svelte';
  import Grid from '../components/Common/Grid.svelte';
  import Spinner from '../components/Common/Spinner.svelte';
  import AvailableLoanInfo from '../components/Loan/AvailableLoanInfo.svelte';
  import LoanBaseInfo from '../components/Loan/LoanBaseInfo.svelte';
  import LoanOperation from '../components/Loan/LoanOperation.svelte';
  import UserLoanInfo from '../components/Loan/UserLoanInfo.svelte';
  import { userData } from '../stores';
  import type { AvailableLoan } from '../types';

  let availableLoans: AvailableLoan[] | undefined = undefined;

  onMount(async () => {
    availableLoans = await getLoans($userData);
  });
</script>

{#if availableLoans}
  <section>
    {#if $userData.user.loans.length > 0}
      <h1 class="text-2xl mb-8 leading-10">My Loans</h1>
      <Grid>
        {#each $userData.user.loans as userLoan (userLoan.id)}
          <Card>
            <div class="flex flex-col space-y-4">
              <LoanBaseInfo loan={userLoan} />
              <UserLoanInfo {userLoan} />
              <LoanOperation loan={userLoan} operation="pay" />
            </div>
          </Card>
        {/each}
      </Grid>
    {:else}
      <h1 class="text-2xl mb-8 leading-10">Available Loans</h1>
      {#if availableLoans.length > 0}
        <Grid>
          {#each availableLoans as availableLoan (availableLoan.type)}
            <Card>
              <div class="flex flex-col space-y-4">
                <LoanBaseInfo loan={availableLoan} />
                <AvailableLoanInfo {availableLoan} />
                <LoanOperation loan={availableLoan} operation="take" />
              </div>
            </Card>
          {/each}
        </Grid>
      {:else}
        <div class="py-8 text-center text-xl">No loans available</div>
      {/if}
    {/if}
  </section>
{:else}
  <Spinner loadingText="fetching loans" />
{/if}
