import { type } from "@tauri-apps/plugin-os"
import type { OsType } from "@tauri-apps/plugin-os"

let osType: OsType | undefined = undefined

if (typeof window !== "undefined") {
  try {
    // type() is now synchronous
    osType = type()
  } catch (e) {
    // fallback if something goes wrong
    osType = "windows" as OsType
  }
}

// A helper function to get the OS type. Kept returning a Promise for
// compatibility with existing callers.
export function getOsType(): Promise<OsType> {
  if (osType) return Promise.resolve(osType)
  // If not on client side or not initialized
  return Promise.resolve("windows" as OsType)
}
