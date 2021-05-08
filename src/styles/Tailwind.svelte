<style global lang="postcss">
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';

  @layer utilities {
    .absolute-center {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }

  * {
    touch-action: manipulation;
  }
  html {
    @apply h-full overflow-y-scroll;
  }
  body {
    @apply h-full flex flex-col max-w-7xl mx-auto bg-gray-900 text-white font-sans select-none;
  }
  button:focus,
  input:focus {
    @apply outline-none;
  }
</style>
