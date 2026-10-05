# NEXUS — build tekshiruvi, commit va push (Vercel avtomatik deploy qiladi)

function Fail($text) {
    Write-Host $text -ForegroundColor Red
    exit 1
}

# 1. O'zgarish bormi?
$changes = git status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
    Write-Host "Yuboriladigan o'zgarish yo'q." -ForegroundColor Yellow
    exit 0
}

# 2. Sayt build bo'lishini tekshirish (xato kod GitHub'ga ketmasin)
Write-Host "Build tekshirilmoqda..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Fail "Build xatolik berdi. Avval xatoni tuzating." }

# 3. Commit
git add .
if ($LASTEXITCODE -ne 0) { Fail "Git add xatolik berdi." }

git status --short

$message = Read-Host "Commit nomi"
if ([string]::IsNullOrWhiteSpace($message)) {
    $message = "Update NEXUS Gaming Setup"
}

git commit -m "$message"
if ($LASTEXITCODE -ne 0) { Fail "Commit xatolik berdi." }

# 4. Push
git push
if ($LASTEXITCODE -ne 0) { Fail "Push xatolik berdi." }

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "  GitHub ga yuborildi!" -ForegroundColor Green
Write-Host "  Vercel avtomatik deploy qiladi." -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
