Set-Location -Path $PSScriptRoot
$env:Path = "C:\Users\hp\AppData\Local\Programs\nodejs;" + $env:Path
Write-Host "Starting Practice Corner..." -ForegroundColor Green
node server.js

