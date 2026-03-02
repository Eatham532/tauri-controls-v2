import { type, type OsType } from "@tauri-apps/plugin-os"


export function getPlatform() {
  const os = type()
  switch (os) {
    case "macos":
      return "macos"
    case "linux":
      return "gnome"
    default:
      return "windows"
  }
}
