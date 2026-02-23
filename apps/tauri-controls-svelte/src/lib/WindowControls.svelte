<script lang="ts">
  import { osType } from "$lib/utils/os"
  import { cn } from "$lib/utils/utils"
  import { initializeAppWindow } from "$lib/utils/window"
  import Gnome from "./controls/linux/Gnome.svelte"
  import MacOs from "./controls/MacOs.svelte"
  import Windows from "./controls/Windows.svelte"
  import { onMount } from "svelte"

  export let platform = "windows"
  export let hide = false
  export let hideMethod = "display"
  export let justify = false

  onMount(() => {
    initializeAppWindow()
  })

  const customClass = cn(
    "flex",
    $$props.class,
    hide && (hideMethod === "display" ? "hidden" : "invisible")
  )

  // Determine the default platform based on the operating system if platform not specified
  if (!platform) {
    switch (osType) {
      case "macos":
        platform = "macos"
        break
      case "linux":
        platform = "gnome"
        break
      default:
        platform = "windows"
    }
  }
</script>

<div class="tauri-controls" style="display: contents">
  {#if platform === "windows"}
    <Windows {...$$props} class={cn(customClass, justify && "ml-auto")} />
  {:else if platform === "macos"}
    <MacOs {...$$props} class={cn(customClass, justify && "ml-0")} />
  {:else if platform === "gnome"}
    <Gnome {...$$props} class={cn(customClass, justify && "ml-auto")} />
  {:else}
    <Windows {...$$props} class={cn(customClass, justify && "ml-auto")} />
  {/if}
</div>
