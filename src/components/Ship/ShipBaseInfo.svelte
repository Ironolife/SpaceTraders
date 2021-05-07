<script lang="ts">
  import type { Ship } from '../../types';
  import InfoLayout from '../Common/InfoLayout.svelte';

  export let ship: Ship;
  export let flex = false;
  export let size: 'md' | 'lg' = 'md';

  $: ({ type, class: _class, manufacturer } = ship);
</script>

<InfoLayout {flex} {size}>
  <span slot="topLeft">{_class}</span>
  <span slot="topRight">{manufacturer}</span>
  <span slot="icon">🚀</span>
  <span slot="label" class="uppercase">{type}</span>
</InfoLayout>
