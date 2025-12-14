# 🚀 Guía de Instalación y Ejecución

## Paso 1: Instalar Node.js
Si no tienes Node.js instalado, descárgalo desde: https://nodejs.org/
Recomiendo la versión LTS (Long Term Support).

## Paso 2: Instalar Expo CLI
Abre PowerShell y ejecuta:
```powershell
npm install -g expo-cli
```

## Paso 3: Instalar Dependencias del Proyecto
Navega a la carpeta del proyecto y ejecuta:
```powershell
cd C:\dev\ChessTraining
npm install
```

Este proceso puede tardar varios minutos.

## Paso 4: Ejecutar la Aplicación

### Opción A: En tu teléfono Android (Recomendado)

1. Instala la app "Expo Go" desde Google Play Store en tu teléfono
2. Asegúrate de que tu PC y teléfono estén en la misma red WiFi
3. En PowerShell, ejecuta:
   ```powershell
   npm start
   ```
4. Se abrirá una página web con un código QR
5. Abre Expo Go en tu teléfono y escanea el código QR
6. La app se cargará en tu teléfono (puede tardar 1-2 minutos la primera vez)

### Opción B: En un emulador Android

1. Instala Android Studio desde: https://developer.android.com/studio
2. Configura un emulador Android desde Android Studio
3. Inicia el emulador
4. En PowerShell, ejecuta:
   ```powershell
   npm run android
   ```

## Solución de Problemas Comunes

### Error: "Metro bundler not found"
Ejecuta:
```powershell
npm install -g metro
```

### Error: "Unable to resolve module"
Ejecuta:
```powershell
npm install
expo start -c
```

### La app no se conecta en el teléfono
- Verifica que estés en la misma red WiFi
- Desactiva VPN si tienes una activa
- Reinicia el servidor con `npm start`

### Error de dependencias
Si hay problemas con las dependencias, ejecuta:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## Compilar APK para Instalación Directa

Si quieres instalar la app sin Expo Go:

1. Crea una cuenta en https://expo.dev
2. Ejecuta:
   ```powershell
   eas build -p android --profile preview
   ```
3. Descarga el APK generado e instálalo en tu teléfono

## Notas Importantes

- La primera carga puede ser lenta (1-2 minutos)
- Necesitas conexión a internet solo para la instalación inicial
- Una vez instalada, la app funciona completamente offline
- Los datos se guardan localmente en tu dispositivo

## Comandos Útiles

```powershell
# Iniciar servidor de desarrollo
npm start

# Limpiar caché y reiniciar
expo start -c

# Ver logs en tiempo real
expo start --dev-client

# Actualizar dependencias
npm update
```

## Próximos Pasos

1. Una vez que la app esté corriendo, comienza con los niveles principiante e intermedio
2. Practica diariamente para mejores resultados
3. El algoritmo ajustará automáticamente la frecuencia según tu progreso

¡Disfruta aprendiendo ajedrez! ♟️
