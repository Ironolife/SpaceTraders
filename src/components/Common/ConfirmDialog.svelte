<script lang="ts">
  import { onMount } from 'svelte';

  import CloseIcon from '../Icons/CloseIcon.svelte';

  import Backdrop from './Backdrop.svelte';
  import Button from './Button.svelte';

  export let onConfirm: (confirm?: boolean) => void | Promise<void>;

  let isLoading = false;
  const onClose = async (confirm?: boolean) => {
    isLoading = true;
    await onConfirm(confirm);
  };

  let cancelButton: any;
  onMount(() => {
    (cancelButton as HTMLButtonElement).focus();
  });
</script>

<Backdrop on:click={() => onClose()} />

<div class="absolute-center w-full max-w-md px-4 z-20">
  <div class="relative p-8 flex flex-col bg-gray-800 rounded shadow-lg">
    <button
      class="absolute top-4 right-4"
      aria-label="close"
      on:click={() => onClose()}
    >
      <CloseIcon size={32} />
    </button>
    <h1 class="mb-8 self-center text-2xl font-bold capitalize">
      <slot name="header" />
    </h1>
    <div class="mb-8 self-center text-xl">
      <slot name="content" />
    </div>
    <div class="flex space-x-4">
      <button
        class="w-full px-4 py-1.5 text-lg uppercase rounded border-2 border-white border-opacity-50"
        bind:this={cancelButton}
        on:click={() => onClose()}
      >
        Cancel
      </button>
      <Button fullWidth {isLoading} on:click={() => onClose(true)}>
        Confirm
      </Button>
    </div>
  </div>
</div>
