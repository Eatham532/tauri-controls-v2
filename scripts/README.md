Publish scripts

Files:
- `publish-all.ps1` — PowerShell script (dry-run by default). Pass `-Publish` to actually publish.
- `publish-all.sh` — Bash script (dry-run by default). Pass `--publish` to actually publish.

Usage (PowerShell):

```powershell
# dry run
pwsh ./scripts/publish-all.ps1

# actually publish
pwsh ./scripts/publish-all.ps1 -Publish
```

Usage (bash):

```bash
# dry run
bash ./scripts/publish-all.sh

# actually publish
bash ./scripts/publish-all.sh --publish
```

Notes:
- Ensure you are logged in to npm (`npm login`) or have `~/.npmrc` configured with an auth token.
- Scripts will skip packages with `private: true` in `package.json` and packages without a `dist/` folder.
- They run `npm pack` for a preview tarball before publishing.
- Review the tarball contents (`npm pack` output) before publishing.

Safety tip: run the scripts first without the publish flag to confirm builds and tarballs.