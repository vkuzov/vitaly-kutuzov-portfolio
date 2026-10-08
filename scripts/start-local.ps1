$ErrorActionPreference = 'Stop'
$portfolioRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $portfolioRoot

$portfolioPnpm = Get-Command pnpm.cmd -ErrorAction SilentlyContinue
if ($portfolioPnpm) {
    $portfolioRunner = $portfolioPnpm.Source
} else {
    $portfolioRuntime = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies'
    $portfolioRunner = Join-Path $portfolioRuntime 'bin\fallback\pnpm.cmd'
    if (-not (Test-Path -LiteralPath $portfolioRunner)) {
        throw 'Install Node.js 22.13+ and pnpm, then run pnpm install and pnpm dev.'
    }
    $env:PATH = (Join-Path $portfolioRuntime 'node\bin') + ';' + $env:PATH
}

if (-not (Test-Path -LiteralPath (Join-Path $portfolioRoot 'node_modules'))) {
    & $portfolioRunner install
    if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
}

Write-Host 'Portfolio: http://127.0.0.1:5173'
Write-Host 'Keep this window open. Press Ctrl+C to stop the local site.'
& $portfolioRunner dev
exit $LASTEXITCODE
