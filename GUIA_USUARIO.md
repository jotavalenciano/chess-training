# 📱 Chess Training - App de Aperturas de Ajedrez

## 🎯 ¿Qué es esta app?

Una aplicación Android diseñada específicamente para jugadores principiantes e intermedios que tienen dificultad para memorizar aperturas de ajedrez. Utiliza el sistema de **repetición espaciada** (como Memrise o Anki) para optimizar tu aprendizaje.

## ✨ Características Principales

### 🧠 Sistema Inteligente de Aprendizaje
- **Repetición espaciada**: Las aperturas que dominas aparecen menos, las difíciles se repiten más
- **4 niveles de calificación**: No la recordé / Me costó / Bien / Fácil
- **Algoritmo adaptativo**: Se ajusta automáticamente a tu progreso

### 📚 Base de Datos Completa
- **24 aperturas populares** clasificadas en 3 niveles
- **Principiante**: Italiana, Española, Escocesa, Londres, Gambito del Centro
- **Intermedio**: Siciliana, Dragón, Francesa, Caro-Kann, India de Rey, Nimzoindia, Grünfeld
- **Avanzado**: Berlinesa, Najdorf, Eslava, Benoni, Holandesa, Marshall, Sveshnikov, Catalana

### 📊 Seguimiento de Progreso
- Visualiza tu nivel de dominio por apertura (0-100%)
- Estadísticas detalladas: nuevas, aprendiendo, en revisión, dominadas
- Meta diaria personalizable

### ⚙️ Personalización Total
- Selecciona qué niveles quieres estudiar
- Ajusta tu meta diaria (1-50 aperturas/día)
- Funciona 100% offline

## 🚀 Inicio Rápido

### Método 1: Script Automático (Recomendado)
```powershell
cd C:\dev\ChessTraining
.\start.ps1
```

### Método 2: Manual
```powershell
cd C:\dev\ChessTraining
npm install
npm start
```

Luego:
1. Instala **Expo Go** en tu Android (desde Play Store)
2. Escanea el código QR que aparece
3. ¡Listo! La app se cargará en tu teléfono

## 📖 Guía de Uso

### Primera Vez
1. La app viene configurada con niveles principiante e intermedio
2. Ve a la pestaña **"Practicar"** para comenzar
3. Se te mostrará una posición de ajedrez
4. Intenta adivinar qué apertura es
5. Presiona **"Mostrar Respuesta"**
6. Califica qué tan bien la recordaste

### Calificaciones
- **❌ No la recordé**: La verás de nuevo en minutos
- **🤔 Me costó**: La verás en poco tiempo  
- **👍 Bien**: La verás en días
- **🎉 Fácil**: La verás en semanas

### Progreso
- Ve a **"Progreso"** para ver tu nivel de dominio
- Cuanto mayor el porcentaje, menos frecuentemente aparecerá
- Las aperturas al 66%+ se consideran dominadas

### Configuración
- Activa/desactiva niveles según tu experiencia
- Ajusta tu meta diaria
- Resetea tu progreso si quieres empezar de nuevo

## 🎓 Consejos de Estudio

1. **Consistencia**: Estudia 10-15 minutos diarios mejor que 1 hora una vez por semana
2. **No adivines**: Si no recuerdas, marca "No la recordé" honestamente
3. **Entiende las ideas**: Lee la descripción y la idea principal, no solo memorices movimientos
4. **Progresión gradual**: Comienza solo con nivel principiante, luego agrega intermedio
5. **Paciencia**: El algoritmo necesita 2-3 semanas para optimizarse a tu ritmo

## 🔧 Solución de Problemas

### La app no se conecta
- Asegúrate de estar en la misma red WiFi (PC y teléfono)
- Desactiva VPN si tienes una activa
- Reinicia con `npm start`

### Error al instalar dependencias
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### La app está lenta
- Primera carga siempre es más lenta (1-2 minutos)
- Después es instantánea
- Cierra otras apps en el teléfono

## 📱 Compilar APK Instalable

Si quieres instalar la app sin Expo Go:

1. Crea cuenta en https://expo.dev
2. Instala EAS CLI:
```powershell
npm install -g eas-cli
eas login
```

3. Compila:
```powershell
eas build -p android --profile preview
```

4. Descarga el APK e instálalo

## 📁 Estructura del Proyecto

```
ChessTraining/
├── App.js                    # Navegación principal
├── src/
│   ├── components/          # Tablero de ajedrez
│   ├── screens/             # 5 pantallas principales
│   ├── data/                # Base de datos de aperturas
│   ├── utils/               # Algoritmo de repetición
│   └── context/             # Estado global
├── package.json
└── README.md
```

## 🤝 Personalización

### Agregar más aperturas
Edita `src/data/openings.js`:
```javascript
{
  id: 'nueva_apertura',
  name: 'Nombre',
  level: 'principiante',
  eco: 'A00',
  moves: ['e4', 'e5'],
  fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR',
  description: 'Descripción...',
  mainIdea: 'Idea principal...',
  category: 'e4'
}
```

Obtén FEN desde: https://lichess.org/editor

## 🐛 Reportar Problemas

Si encuentras un error:
1. Describe qué estabas haciendo
2. Incluye mensaje de error (si hay)
3. Menciona tu versión de Android

## 📚 Recursos Adicionales

- [Guía de Instalación Detallada](INSTALACION.md)
- [Notas de Desarrollo](DESARROLLO.md)
- [Expo Documentation](https://docs.expo.dev/)

## 🎯 Roadmap Futuro

- [ ] Modo de práctica interactivo (jugar los movimientos)
- [ ] Importar aperturas desde PGN
- [ ] Notificaciones diarias
- [ ] Tema oscuro
- [ ] Gráficos de progreso histórico
- [ ] Sistema de logros

## 💡 ¿Por qué funciona?

La **repetición espaciada** es el método más eficiente científicamente comprobado para memorización a largo plazo. En lugar de estudiar todo una y otra vez:

1. **Optimiza tu tiempo**: Solo estudias lo que necesitas
2. **Previene el olvido**: Te muestra las aperturas justo antes de olvidarlas
3. **Memoria a largo plazo**: Transforma información de corto a largo plazo
4. **Personalizado**: Se adapta a TU ritmo de aprendizaje

## 📞 Contacto

Para preguntas, sugerencias o mejoras, puedes crear un issue en el repositorio.

---

**¡Buena suerte en tu viaje de aprendizaje de ajedrez!** ♟️

Recuerda: La clave no es estudiar más, sino estudiar inteligentemente. Esta app hace exactamente eso.
