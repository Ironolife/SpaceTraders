<script lang="ts">
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import type { UserLoan } from '../../types';
  import InfoList from '../Common/InfoList.svelte';
  dayjs.extend(relativeTime);

  export let userLoan: UserLoan;

  $: ({ due } = userLoan);
  $: isExpired = dayjs(due).diff(dayjs()) < 0;
</script>

<div class:text-red-400={isExpired}>
  <InfoList entries={[{ key: 'Due', value: dayjs(due).fromNow() }]} />
</div>
