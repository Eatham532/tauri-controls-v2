param(
  [switch]$Publish
)

Write-Host "Publish script for all apps (dry-run by default). Use -Publish to actually publish."

# show current npm user
try {
  $whoami = npm whoami 2>$null
  if ($whoami) { Write-Host "npm user: $whoami" }
} catch { Write-Host "npm user: (not logged in or npm not available)" }

$apps = Get-ChildItem -Path "..\apps" -Directory
foreach ($app in $apps) {
  $pkgPath = Join-Path $app.FullName 'package.json'
  if (-not (Test-Path $pkgPath)) { continue }
  $pkg = Get-Content $pkgPath -Raw | ConvertFrom-Json
  if ($pkg.private -eq $true) { Write-Host "Skipping private $($pkg.name)"; continue }

  Write-Host "\n=== $($pkg.name) ==="
  Push-Location $app.FullName

  Write-Host "Building..."
  $buildExit = & npm run build
  if ($LASTEXITCODE -ne 0) { Write-Host "Build failed for $($pkg.name); skipping."; Pop-Location; continue }

  if (-not (Test-Path "dist")) { Write-Host "No dist for $($pkg.name); skipping publish."; Pop-Location; continue }

  Write-Host "Creating package tarball (preview):"
  & npm pack

  if ($Publish) {
    Write-Host "Publishing $($pkg.name) to registry..."
    & npm publish --access public
    if ($LASTEXITCODE -ne 0) { Write-Host "Publish failed for $($pkg.name)" }
  } else {
    Write-Host "Dry run complete for $($pkg.name). To publish, re-run with -Publish."
  }

  Pop-Location
}

Write-Host "\nDone."