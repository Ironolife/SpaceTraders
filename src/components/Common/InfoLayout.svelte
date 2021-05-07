<script lang="ts">
  export let flex = false;
  export let size: 'md' | 'lg' = 'md';
</script>

<div class={flex ? 'h-full flex flex-col' : ''}>
  <div
    class="flex items-center"
    class:text-xl={size === 'md'}
    class:text-2xl={size === 'lg'}
    class:mb-4={!flex && size === 'md'}
    class:mb-8={flex || size === 'lg'}
  >
    <span>
      <slot name="topLeft" />
    </span>
    <span class="flex-1" />
    <span>
      <slot name="topRight" />
    </span>
  </div>
  <div
    class="text-center {flex ? 'flex-1 grid place-items-center' : ''}"
    class:text-4xl={size === 'md'}
    class:text-5xl={size === 'lg'}
    class:mb-2={!flex && size === 'md'}
    class:mb-4={!flex && size === 'lg'}
    class:mb-8={flex}
  >
    <slot name="icon" />
  </div>
  <div
    class="font-bold text-center"
    class:text-2xl={size === 'md'}
    class:text-3xl={size === 'lg'}
  >
    <slot name="label" />
  </div>
</div>
