import { type, type OsType } from "@tauri-apps/plugin-os"

export let osType: OsType

if (typeof window !== "undefined") {
  osType = type()
}

export function getOsType(): OsType {
  if (osType) return osType
  return type()
}
