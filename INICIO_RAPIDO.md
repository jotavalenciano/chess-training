# 🚀 INICIO RÁPIDO - Chess Training App

## ✅ Estado del Proyecto
- ✓ 21 archivos creados
- ✓ Estructura completa del proyecto
- ✓ 24 aperturas de ajedrez incluidas
- ✓ Sistema de repetición espaciada implementado
- ✓ 5 pantallas funcionales
- ✓ Documentación completa

## 📋 Próximos Pasos

### 1️⃣ Instalar Dependencias (Primera vez solamente)
```powershell
npm install
```
⏱️ Esto tomará 5-10 minutos la primera vez.

### 2️⃣ Iniciar la Aplicación
```powershell
npm start
```
O simplemente ejecuta:
```powershell
.\start.ps1
```

### 3️⃣ Ejecutar en tu Teléfono Android

**Opción A - Con Expo Go (Más Fácil):**
1. Instala "Expo Go" desde Google Play Store
2. Asegúrate de estar en la misma red WiFi que tu PC
3. Escanea el código QR que aparece en la terminal
4. ¡Listo! La app se cargará en tu teléfono

**Opción B - Con Emulador Android:**
1. Instala Android Studio
2. Configura un dispositivo virtual (AVD)
3. Ejecuta: `npm run android`

## 📱 Características de la App

### 🎯 Pantalla Principal (Home)
- Resumen de aperturas pendientes hoy
- Estadísticas: nuevas, aprendiendo, en revisión, dominadas
- Meta diaria configurable
- Progreso general

### 📖 Pantalla de Práctica
- Muestra una posición de ajedrez
- Intenta adivinar la apertura
- Califica tu respuesta:
  * ❌ No la recordé → La verás en minutos
  * 🤔 Me costó → La verás pronto
  * 👍 Bien → La verás en días
  * 🎉 Fácil → La verás en semanas

### 📊 Pantalla de Progreso
- Nivel de dominio por apertura (0-100%)
- Distribución por dominio
- Lista completa de aperturas
- Número de repeticiones por apertura

### ⚙️ Configuración
- Selecciona niveles: Principiante, Intermedio, Avanzado
- Ajusta meta diaria (1-50 aperturas)
- Resetear progreso
- Información de la app

## 🎓 Cómo Usar

1. **Primer uso**: La app viene con niveles principiante e intermedio activados
2. **Practica**: Ve a "Practicar" y estudia las aperturas del día
3. **Sé honesto**: Califica sinceramente qué tan bien recordaste cada apertura
4. **Consistencia**: Estudia 10-15 minutos diarios para mejores resultados
5. **Progreso**: El algoritmo se optimizará en 2-3 semanas

## 📚 Aperturas Incluidas

### Nivel Principiante (5):
- Apertura Italiana
- Apertura Española (Ruy López)
- Defensa Escocesa
- Sistema Londres
- Gambito del Centro

### Nivel Intermedio (7):
- Defensa Siciliana
- Siciliana Dragón
- Defensa Francesa
- Defensa Caro-Kann
- Defensa India de Rey
- Defensa Nimzoindia
- Defensa Grünfeld

### Nivel Avanzado (8):
- Defensa Berlinesa
- Siciliana Najdorf
- Defensa Eslava
- Defensa Benoni
- Defensa Holandesa
- Ataque Marshall
- Siciliana Sveshnikov
- Apertura Catalana

## 🔧 Comandos Útiles

```powershell
# Instalar dependencias
npm install

# Iniciar servidor
npm start

# Limpiar caché
npm start -- --clear

# Ejecutar en Android
npm run android

# Ver estructura del proyecto
Get-ChildItem -Recurse -Directory | Select-Object FullName
```

## 📖 Documentación Disponible

- **README.md** - Descripción general del proyecto
- **GUIA_USUARIO.md** - Guía completa para el usuario final
- **INSTALACION.md** - Instrucciones detalladas de instalación
- **DESARROLLO.md** - Notas técnicas y arquitectura
- **INICIO_RAPIDO.md** - Este archivo

## ⚠️ Solución de Problemas Comunes

### Error: "Cannot find module"
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### La app no se conecta en el teléfono
- Verifica que estés en la misma WiFi
- Desactiva VPN
- Reinicia el servidor: `npm start`

### Metro bundler error
```powershell
npm start -- --clear
```

## 🎯 Consejos para Mejor Aprendizaje

1. **Empieza con principiante**: No actives todos los niveles al inicio
2. **Estudia diariamente**: 10-15 minutos > 1 hora semanal
3. **Entiende, no memorices**: Lee las ideas principales
4. **Sé honesto**: Califica correctamente tu conocimiento
5. **Paciencia**: Los resultados aparecen en 2-4 semanas

## 📞 Soporte

Si encuentras problemas:
1. Revisa la sección de solución de problemas
2. Consulta INSTALACION.md para más detalles
3. Verifica que Node.js y npm estén instalados correctamente

## 🎉 ¡Estás Listo!

Tu app está completamente configurada y lista para usar. Solo ejecuta:

```powershell
npm install
npm start
```

¡Buena suerte aprendiendo ajedrez! ♟️

---

**Nota**: La primera instalación puede tardar 5-10 minutos. Ten paciencia. Después todo será instantáneo.
