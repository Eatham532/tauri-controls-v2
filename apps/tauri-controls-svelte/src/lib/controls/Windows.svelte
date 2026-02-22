<script>
  import Button from "$lib/components/Button.svelte"
  import Icons from "$lib/components/Icons.svelte"
  import { cn } from "$lib/utils/utils"
  import {
    closeWindow,
    initializeAppWindow,
    isWindowMaximized,
    maximizeWindow,
    minimizeWindow
  } from "$lib/utils/window"
  import { onMount } from "svelte"

  onMount(async () => {
    await initializeAppWindow()
  })
</script>

<div {...$$props} class={cn("h-8 select-none", $$props.class)}>
  <Button
    on:click={() => minimizeWindow()}
    class="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-black/5 active:bg-black/3  dark:text-white dark:hover:bg-white/6 dark:active:bg-white/4"
  >
    <Icons icon="minimizeWin" />
  </Button>
  <Button
    on:click={() => maximizeWindow()}
    class={cn(
      "max-h-8 w-[46px] cursor-default rounded-none bg-transparent",
      "text-black/90 hover:bg-black/5 active:bg-black/3 dark:text-white dark:hover:bg-white/6 dark:active:bg-white/4"
      // !isMaximizable && "text-white/36",
    )}
  >
    {#if $isWindowMaximized}
      <Icons icon="maximizeRestoreWin" />
    {:else}
      <Icons icon="maximizeWin" />
    {/if}
  </Button>
  <Button
    on:click={() => closeWindow()}
    class="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-[#c42b1c] hover:text-white active:bg-[#c42b1c]/90 dark:text-white"
  >
    <Icons icon="closeWin" />
  </Button>
</div>
