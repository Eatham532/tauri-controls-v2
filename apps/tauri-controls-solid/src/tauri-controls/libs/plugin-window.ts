import { createSignal } from "solid-js"

const [isWindowMaximized, setIsWindowMaximized] = createSignal(false)
export { isWindowMaximized }

const getWin = async () => {
  const mod = await import("@tauri-apps/api")
  return mod.window.getCurrentWindow()
}

const watchWindowMaximized = async () => {
  if (typeof window !== "undefined") {
    const appWin = await getWin()
    const isMaximized = await appWin.isMaximized()
    setIsWindowMaximized(isMaximized)

    await appWin.onResized(async () => {
      const isMaximized = await appWin.isMaximized()
      setIsWindowMaximized(isMaximized)
    })
  }
}
watchWindowMaximized()

export const minimizeWindow = async () => {
  const window = await getWin()
  await window.minimize()
}

export const maximizeWindow = async () => {
  const window = await getWin()
  await window.toggleMaximize()
}

export const fullscreenWindow = async () => {
  const window = await getWin()
  const fullscreen = await window.isFullscreen()
  await window.setFullscreen(!fullscreen)
}

export const closeWindow = async () => {
  const window = await getWin()
  await window.close()
}
