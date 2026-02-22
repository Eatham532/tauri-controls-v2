import { type, type OsType } from "@tauri-apps/plugin-os"

// A helper function to get the OS type
export async function getOsType(): Promise<OsType> {
  return await type()
}

export async function getPlatform() {
  const os = await getOsType()
  switch (os) {
    case "macos":
      return "macos"
    case "linux":
      return "gnome"
    default:
      return "windows"
  }
}
