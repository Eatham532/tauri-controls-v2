import { ref } from "vue"

export const appWindow = ref<any | null>(null)
export const isWindowMaximized = ref(false)

if (typeof window !== "undefined") {
  const init = async () => {
    const mod = await import("@tauri-apps/api")
    const appWin = mod.window.getCurrentWindow()
    appWindow.value = appWin

    const isMaximized = await appWin.isMaximized()
    isWindowMaximized.value = isMaximized

    await appWin.onResized(async () => {
      const isMaximized = await appWin.isMaximized()
      isWindowMaximized.value = isMaximized
    })
  }
  init()
}

export const minimizeWindow = async () => {
  await appWindow.value?.minimize()
}

export const maximizeWindow = async () => {
  await appWindow.value?.toggleMaximize()
}

export const fullscreenWindow = async () => {
  if (appWindow.value) {
    const fullscreen = await appWindow.value?.isFullscreen()
    await appWindow.value?.setFullscreen(!fullscreen)
  }
}

export const closeWindow = async () => {
  await appWindow.value?.close()
}
