#!/usr/bin/env bash
set -euo pipefail

PUBLISH=false
if [ "${1-}" = "--publish" ] || [ "${1-}" = "publish" ]; then
  PUBLISH=true
fi

echo "Publish script for all apps (dry-run by default). Use --publish to actually publish."

whoami=$(npm whoami 2>/dev/null || true)
if [ -n "$whoami" ]; then
  echo "npm user: $whoami"
else
  echo "npm user: (not logged in or npm not available)"
fi

for app in apps/*; do
  [ -f "$app/package.json" ] || continue
  name=$(jq -r .name "$app/package.json")
  is_private=$(jq -r '.private // false' "$app/package.json")
  if [ "$is_private" = "true" ]; then
    echo "Skipping private $name"
    continue
  fi

  echo "\n=== $name ==="
  (cd "$app" && \
    echo "Building..." && npm run build ) || { echo "Build failed for $name; skipping."; continue; }

  if [ ! -d "$app/dist" ]; then
    echo "No dist for $name; skipping publish."
    continue
  fi

  echo "Creating package tarball (preview):"
  (cd "$app" && npm pack)

  if [ "$PUBLISH" = true ]; then
    echo "Publishing $name to registry..."
    (cd "$app" && npm publish --access public) || echo "Publish failed for $name"
  else
    echo "Dry run complete for $name. To publish, re-run with --publish."
  fi

done

echo "\nDone."