<script>
  import { cn } from "$lib/utils/utils"
</script>

<button
  on:click
  {...$$props}
  class={cn(
    "inline-flex cursor-default items-center justify-center",
    $$props.class
  )}
>
  <slot />
</button>
