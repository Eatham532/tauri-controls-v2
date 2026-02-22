import { get, writable, type Writable } from "svelte/store"

export let appWindow: Writable<any> = writable(undefined)
export let isWindowMaximized: Writable<boolean> = writable(false)

export const initializeAppWindow = async () => {
  if (typeof window !== "undefined") {
    import("@tauri-apps/api").then(async (mod) => {
      const appWin = mod.window.getCurrentWindow();
      appWindow.set(appWin);

      const maximized = await appWin.isMaximized()
      isWindowMaximized.set(maximized)

      await appWin.onResized(async () => {
        const maximized = await appWin.isMaximized()
        isWindowMaximized.set(maximized)
      })
    })
  }
}

export const minimizeWindow = () => {
  get(appWindow)?.minimize()
}

export const maximizeWindow = async () => {
  await get(appWindow)?.toggleMaximize()
}

export const closeWindow = () => {
  get(appWindow)?.close()
}

export const fullscreenWindow = async () => {
  const currentWindow = get(appWindow)
  if (currentWindow) {
    const fullscreen = await currentWindow.isFullscreen()
    await currentWindow.setFullscreen(!fullscreen)
  }
}
