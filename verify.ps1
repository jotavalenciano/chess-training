# Script de Verificación del Proyecto
# Ejecuta con: .\verify.ps1

Write-Host "`n🔍 Verificando Proyecto Chess Training" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$allGood = $true

# Verificar estructura de carpetas
Write-Host "📁 Verificando estructura de carpetas..." -ForegroundColor Yellow

$folders = @(
    "src",
    "src\components",
    "src\context", 
    "src\data",
    "src\screens",
    "src\utils",
    "assets"
)

foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Write-Host "  ✓ $folder" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $folder - FALTA" -ForegroundColor Red
        $allGood = $false
    }
}

# Verificar archivos principales
Write-Host "`n📄 Verificando archivos principales..." -ForegroundColor Yellow

$files = @(
    "package.json",
    "app.json",
    "App.js",
    "babel.config.js",
    "src\components\ChessBoard.js",
    "src\context\StorageContext.js",
    "src\data\openings.js",
    "src\screens\HomeScreen.js",
    "src\screens\PracticeScreen.js",
    "src\screens\ProgressScreen.js",
    "src\screens\SettingsScreen.js",
    "src\screens\OpeningDetailScreen.js",
    "src\utils\spacedRepetition.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file - FALTA" -ForegroundColor Red
        $allGood = $false
    }
}

# Verificar Node.js
Write-Host "`n🟢 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js no instalado" -ForegroundColor Red
    $allGood = $false
}

# Verificar npm
Write-Host "`n📦 Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "  ✓ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ npm no instalado" -ForegroundColor Red
    $allGood = $false
}

# Verificar dependencias
Write-Host "`n📚 Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    $nodeModulesCount = (Get-ChildItem "node_modules" -Directory).Count
    Write-Host "  OK node_modules existe ($nodeModulesCount paquetes)" -ForegroundColor Green
} else {
    Write-Host "  WARN node_modules no existe - Ejecuta: npm install" -ForegroundColor Yellow
}

# Verificar archivos de documentación
Write-Host "`n📖 Verificando documentación..." -ForegroundColor Yellow

$docs = @(
    "README.md",
    "INSTALACION.md",
    "DESARROLLO.md",
    "GUIA_USUARIO.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "  ✓ $doc" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $doc - FALTA" -ForegroundColor Red
    }
}

# Resumen
Write-Host "`n========================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "✓ Proyecto verificado correctamente!" -ForegroundColor Green
    Write-Host "`nPuedes iniciar la app con:" -ForegroundColor Cyan
    Write-Host "  .\start.ps1" -ForegroundColor White
    Write-Host "o" -ForegroundColor Cyan
    Write-Host "  npm start" -ForegroundColor White
} else {
    Write-Host "⚠ Hay algunos problemas que debes resolver" -ForegroundColor Yellow
    Write-Host "Revisa los elementos marcados con ✗" -ForegroundColor Yellow
}
Write-Host "`n"
