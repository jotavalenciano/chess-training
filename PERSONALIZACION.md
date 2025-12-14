# 🎨 Guía de Personalización y Expansión

Esta guía te muestra cómo personalizar y expandir la aplicación según tus necesidades.

## 📚 Agregar Nuevas Aperturas

### Paso 1: Abrir el archivo de datos
Edita: `src/data/openings.js`

### Paso 2: Agregar tu apertura
Copia este formato al final del array `OPENINGS_DATABASE`:

```javascript
{
  id: 'identificador_unico',           // Ej: 'alo_01'
  name: 'Nombre de la Apertura',       // Ej: 'Ataque Londinense'
  level: 'principiante',               // 'principiante', 'intermedio', 'avanzado'
  eco: 'A48',                          // Código ECO de la apertura
  moves: ['d4', 'Nf6', 'Nf3', 'e6', 'Bf4'],  // Array de movimientos
  fen: 'rnbqkb1r/pppp1ppp/4pn2/8/3P1B2/5N2/PPP1PPPP/RN1QKB1R',
  description: 'Descripción general de la apertura...',
  mainIdea: 'La idea principal es...',
  nextMoves: ['Be7', 'e3', 'O-O'],    // Continuaciones típicas
  category: 'd4'                       // 'e4' o 'd4'
},
```

### Paso 3: Obtener el FEN de la posición

Usa este sitio para crear la posición y copiar el FEN:
👉 https://lichess.org/editor

1. Coloca las piezas en la posición deseada
2. Copia el FEN que aparece abajo
3. Pégalo en el campo `fen`

### Ejemplo Completo

```javascript
{
  id: 'ale_01',
  name: 'Defensa Alekhine',
  level: 'intermedio',
  eco: 'B02',
  moves: ['e4', 'Nf6'],
  fen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2',
  description: 'Defensa provocativa que invita al blanco a avanzar peones centrales.',
  mainIdea: 'Atacar el centro blanco sobreextendido con d5 y c5.',
  nextMoves: ['e5', 'Nd5', 'd4'],
  category: 'e4'
},
```

## 🎨 Cambiar Colores de la App

### Editar colores globales

Los colores se definen en los estilos de cada pantalla. Para cambiar el tema:

1. **Color principal verde** → Busca: `#2e7d32`
2. **Color azul** → Busca: `#1976d2`
3. **Color naranja** → Busca: `#f57c00`

### Ejemplo de cambio de color principal

En cada archivo de pantalla (HomeScreen.js, etc.), reemplaza:
```javascript
// De verde a azul
backgroundColor: '#2e7d32'  // Cambia a '#1565c0'
```

## ⚙️ Modificar el Algoritmo de Repetición

### Cambiar intervalos base

Edita: `src/utils/spacedRepetition.js`

```javascript
const INTERVALS = {
  AGAIN: 0.0007,    // ~1 minuto → Cambiar para más/menos tiempo
  HARD: 0.0042,     // ~6 minutos
  GOOD: 1,          // 1 día
  EASY: 4           // 4 días
};
```

### Ajustar factor de facilidad

```javascript
// Valor por defecto (más alto = intervalos más largos)
const DEFAULT_EASE_FACTOR = 2.5;  // Cambiar entre 1.5 - 3.5

// Mínimo (previene intervalos demasiado cortos)
const MIN_EASE_FACTOR = 1.3;      // Cambiar entre 1.1 - 2.0
```

### Modificar ajustes por calificación

En la función `calculateNextReview`:

```javascript
case 'again':
  newEaseFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2);
  // Cambiar 0.2 para penalizar más/menos

case 'hard':
  newInterval = interval * 1.2;
  // Cambiar 1.2 para intervalos más largos/cortos
  newEaseFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.15);

case 'good':
  // Sin cambios en facilidad

case 'easy':
  newInterval = interval * easeFactor * 1.3;
  // Cambiar 1.3 para bonus de intervalo
  newEaseFactor = easeFactor + 0.15;
  // Cambiar 0.15 para ajuste de facilidad
```

## 📊 Cambiar Meta Diaria Predeterminada

Edita: `src/context/StorageContext.js`

```javascript
const [settings, setSettings] = useState({
  selectedLevels: ['principiante', 'intermedio'],
  dailyGoal: 10,        // ← Cambiar aquí (1-50)
  soundEnabled: true,
});
```

## 🎯 Agregar Nuevos Niveles

### Paso 1: Agregar nivel personalizado

En `src/data/openings.js`, puedes usar niveles personalizados:

```javascript
{
  id: 'nueva_apertura',
  name: 'Apertura Personalizada',
  level: 'experto',  // ← Nuevo nivel
  // ... resto de campos
}
```

### Paso 2: Actualizar configuración

En `src/screens/SettingsScreen.js`, agrega el nuevo nivel:

```javascript
<TouchableOpacity
  style={[
    styles.levelOption,
    localSettings.selectedLevels.includes('experto') && styles.levelOptionActive
  ]}
  onPress={() => toggleLevel('experto')}
>
  <View style={styles.levelInfo}>
    <Text style={styles.levelName}>Experto</Text>
    <Text style={styles.levelDesc}>Aperturas de nivel maestro</Text>
  </View>
  {localSettings.selectedLevels.includes('experto') && (
    <Ionicons name="checkmark-circle" size={24} color="#2e7d32" />
  )}
</TouchableOpacity>
```

## 🔔 Agregar Notificaciones (Futuro)

Para implementar notificaciones diarias:

1. Instalar dependencia:
```powershell
expo install expo-notifications
```

2. Importar y configurar en App.js:
```javascript
import * as Notifications from 'expo-notifications';

// Programar notificación diaria
Notifications.scheduleNotificationAsync({
  content: {
    title: "¡Hora de practicar ajedrez! ♟️",
    body: 'Tienes aperturas pendientes hoy',
  },
  trigger: {
    hour: 20,
    minute: 0,
    repeats: true
  },
});
```

## 📱 Personalizar Iconos

### Crear iconos personalizados

Necesitas crear estas imágenes en la carpeta `assets/`:

1. **icon.png** (1024x1024 px)
   - Icono principal de la app
   - Recomendación: Logo de ajedrez con fondo de color

2. **splash.png** (1242x2436 px)
   - Pantalla de carga
   - Recomendación: Logo centrado con texto "Chess Training"

3. **adaptive-icon.png** (1024x1024 px)
   - Para Android moderno
   - Debe tener espacio alrededor (safe zone)

### Herramientas recomendadas:
- Canva: https://www.canva.com/
- Figma: https://www.figma.com/
- Iconos gratis: https://www.flaticon.com/search?word=chess

## 🎮 Agregar Modo de Práctica Interactivo

Para permitir que el usuario haga los movimientos:

En `src/screens/PracticeScreen.js`, modifica el componente ChessBoard:

```javascript
const [currentPosition, setCurrentPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

<ChessBoard 
  position={currentPosition}
  boardSize={320}
  interactive={true}  // ← Cambiar a true
  onMove={({ from, to }) => {
    // Lógica para validar el movimiento
    console.log(`Movimiento: ${from} → ${to}`);
  }}
/>
```

## 📈 Agregar Gráficos de Progreso

Instalar dependencia:
```powershell
npm install react-native-chart-kit
npm install react-native-svg
```

Usar en ProgressScreen.js:
```javascript
import { LineChart } from 'react-native-chart-kit';

<LineChart
  data={{
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    datasets: [{ data: [20, 45, 28, 80, 99] }]
  }}
  width={300}
  height={200}
  chartConfig={{
    backgroundColor: '#2e7d32',
    backgroundGradientFrom: '#4caf50',
    backgroundGradientTo: '#2e7d32',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  }}
/>
```

## 🌙 Implementar Tema Oscuro

### Paso 1: Crear Context para tema

`src/context/ThemeContext.js`:
```javascript
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const colors = {
    background: isDark ? '#121212' : '#f5f5f5',
    card: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#ffffff' : '#333333',
    primary: '#2e7d32',
  };

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### Paso 2: Usar en componentes

```javascript
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hola</Text>
    </View>
  );
}
```

## 📤 Exportar/Importar Progreso

Agregar en SettingsScreen.js:

```javascript
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const exportProgress = async () => {
  const data = JSON.stringify(userProgress);
  const fileUri = FileSystem.documentDirectory + 'chess_progress.json';
  await FileSystem.writeAsStringAsync(fileUri, data);
  await Sharing.shareAsync(fileUri);
};
```

## 🎯 Agregar Categorías de Práctica

Modificar PracticeScreen.js para filtrar por categoría:

```javascript
const [selectedCategory, setSelectedCategory] = useState('all');

// Filtrar aperturas
const filteredOpenings = getOpeningsByLevel(settings.selectedLevels)
  .filter(op => selectedCategory === 'all' || op.category === selectedCategory);

// UI para seleccionar
<View>
  <TouchableOpacity onPress={() => setSelectedCategory('all')}>
    <Text>Todas</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setSelectedCategory('e4')}>
    <Text>Solo e4</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setSelectedCategory('d4')}>
    <Text>Solo d4</Text>
  </TouchableOpacity>
</View>
```

## 🏆 Sistema de Logros

Crear `src/utils/achievements.js`:

```javascript
export const ACHIEVEMENTS = [
  {
    id: 'first_opening',
    name: 'Primera Apertura',
    description: 'Practica tu primera apertura',
    icon: '🎯',
    requirement: (stats) => stats.learning >= 1
  },
  {
    id: 'master_five',
    name: 'Cinco Dominadas',
    description: 'Domina 5 aperturas',
    icon: '🏆',
    requirement: (stats) => stats.mastered >= 5
  },
  // Agregar más logros
];

export function checkAchievements(stats, unlockedAchievements) {
  return ACHIEVEMENTS.filter(achievement => 
    !unlockedAchievements.includes(achievement.id) &&
    achievement.requirement(stats)
  );
}
```

## 📋 Lista de Mejoras Sugeridas

### Fáciles de implementar:
- [ ] Cambiar colores del tema
- [ ] Agregar más aperturas
- [ ] Modificar intervalos de repetición
- [ ] Cambiar meta diaria predeterminada

### Intermedias:
- [ ] Tema oscuro
- [ ] Categorías de práctica (e4/d4)
- [ ] Exportar/importar progreso
- [ ] Gráficos de progreso

### Avanzadas:
- [ ] Modo de práctica interactivo
- [ ] Notificaciones push
- [ ] Sistema de logros
- [ ] Importar PGN
- [ ] Modo multijugador

## 🔍 Debugging

### Ver datos guardados

Agrega en cualquier pantalla:
```javascript
import { useStorage } from '../context/StorageContext';

const { userProgress, settings } = useStorage();
console.log('Progress:', userProgress);
console.log('Settings:', settings);
```

### Resetear datos de prueba

En SettingsScreen.js ya existe el botón "Resetear Progreso".

### Ver logs en tiempo real

```powershell
npm start
# Presiona 'm' para abrir el menú
# Selecciona "Toggle Remote JS Debugging"
```

## 📞 Recursos Útiles

- **Expo Docs**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/
- **Chess.js**: https://github.com/jhlywa/chess.js
- **Lichess API**: https://lichess.org/api
- **Chess.com API**: https://www.chess.com/news/view/published-data-api

---

¡Feliz personalización! Si implementas alguna mejora interesante, considera compartirla. 🚀
