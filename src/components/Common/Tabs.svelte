<script lang="ts">
  import type { KeyValuePair } from '../../types';

  export let tabs: KeyValuePair[];
  export let selectedValue: string;

  let scrollable: HTMLDivElement;
  const handleClick = (
    event: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    },
    value: string
  ) => {
    event.currentTarget.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });

    selectedValue = value;
  };
</script>

<div bind:this={scrollable} class="flex overflow-x-scroll hide-scrollbar">
  {#each tabs as { key, value } (value)}
    <button
      class="px-8 py-4 text-2xl whitespace-nowrap border-b-4 transition-colors {value ===
      selectedValue
        ? 'border-purple-400 text-purple-400'
        : 'border-gray-700'}"
      on:click={(event) => handleClick(event, value)}
    >
      {key}
    </button>
  {/each}
  <span class="flex-1 border-b-4 border-gray-700" />
</div>
