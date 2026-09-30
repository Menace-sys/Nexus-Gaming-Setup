git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git add xatolik berdi." -ForegroundColor Red
    exit 1
}

git status

$message = Read-Host "Commit nomi"

if ([string]::IsNullOrWhiteSpace($message)) {
    $message = "Update NEXUS Gaming Setup"
}

git commit -m "$message"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit xatolik berdi." -ForegroundColor Red
    exit 1
}

git push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Push xatolik berdi." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "  GitHub ga yuborildi!" -ForegroundColor Green
Write-Host "  Vercel avtomatik deploy qiladi." -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green