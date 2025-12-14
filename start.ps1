# Script de Inicio Rápido para Chess Training App
# Ejecuta este archivo con: .\start.ps1

Write-Host "🎯 Chess Training App - Inicio Rápido" -ForegroundColor Green
Write-Host "======================================`n" -ForegroundColor Green

# Verificar si Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js no encontrado" -ForegroundColor Red
    Write-Host "Por favor instala Node.js desde: https://nodejs.org/" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit
}

# Verificar si npm está instalado
Write-Host "Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm instalado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm no encontrado" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit
}

# Verificar si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "`n📦 Instalando dependencias (esto puede tardar varios minutos)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
        Read-Host "Presiona Enter para salir"
        exit
    }
    Write-Host "✓ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "✓ Dependencias ya instaladas" -ForegroundColor Green
}

Write-Host "`n🚀 Iniciando servidor de desarrollo..." -ForegroundColor Yellow
Write-Host "`nOpciones:" -ForegroundColor Cyan
Write-Host "1. Presiona 'a' para abrir en emulador Android" -ForegroundColor Cyan
Write-Host "2. Escanea el código QR con Expo Go en tu teléfono" -ForegroundColor Cyan
Write-Host "3. Presiona 'Ctrl+C' para detener el servidor`n" -ForegroundColor Cyan

npm start
