import { type } from "@tauri-apps/plugin-os"
import type { OsType } from "@tauri-apps/plugin-os"

let osType: OsType | undefined = undefined
let osTypePromise: Promise<OsType> | null = null

if (typeof window !== "undefined") {
  osTypePromise = type().then((x) => {
    osType = x
    return x
  })
}

// A helper function to get the OS type, which returns a Promise
export function getOsType(): Promise<OsType> {
  if (!osTypePromise) {
    if (osType) return Promise.resolve(osType)
    // If not on client side or not initialized
    return Promise.resolve("windows" as OsType)
  }
  return osTypePromise
}
