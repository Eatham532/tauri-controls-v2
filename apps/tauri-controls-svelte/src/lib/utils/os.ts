import { type, type OsType } from "@tauri-apps/plugin-os"

export let osType: OsType

if (typeof window !== "undefined") {
  type().then((x) => (osType = x))
}

export async function getOsType(): Promise<OsType> {
  if (osType) return osType
  return await type()
}
