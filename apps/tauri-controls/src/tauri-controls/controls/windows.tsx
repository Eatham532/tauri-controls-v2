import { useContext, type HTMLProps } from "react"
import { Icons } from "src/tauri-controls/components/icons"
import TauriAppWindowContext from "src/tauri-controls/contexts/plugin-window"
import { cn } from "src/tauri-controls/libs/utils"
import { Button } from "../components/button"

export function Windows({ className, ...props }: HTMLProps<HTMLDivElement>) {
  const { isWindowMaximized, minimizeWindow, maximizeWindow, closeWindow } =
    useContext(TauriAppWindowContext)

  return (
    <div className={cn("h-8", className)} {...props}>
      <Button
        onClick={minimizeWindow}
        className="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-black/5 active:bg-black/3 dark:text-white dark:hover:bg-white/6 dark:active:bg-white/4"
      >
        <Icons.minimizeWin />
      </Button>
      <Button
        onClick={maximizeWindow}
        className={cn(
          "max-h-8 w-[46px] cursor-default rounded-none bg-transparent",
          "text-black/90 hover:bg-black/5 active:bg-black/3 dark:text-white dark:hover:bg-white/6 dark:active:bg-white/4"
          // !isMaximizable && "text-white/36",
        )}
      >
        {!isWindowMaximized ? (
          <Icons.maximizeWin />
        ) : (
          <Icons.maximizeRestoreWin />
        )}
      </Button>
      <Button
        onClick={closeWindow}
        className="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-[#c42b1c] hover:text-white active:bg-[#c42b1c]/90 dark:text-white"
      >
        <Icons.closeWin />
      </Button>
    </div>
  )
}
