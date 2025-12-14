# Notas de Desarrollo

## Estructura del Proyecto

```
ChessTraining/
├── App.js                          # Punto de entrada, navegación principal
├── package.json                    # Dependencias
├── app.json                        # Configuración de Expo
│
├── src/
│   ├── components/
│   │   └── ChessBoard.js          # Componente de tablero reutilizable
│   │
│   ├── context/
│   │   └── StorageContext.js      # Context API para estado global
│   │
│   ├── data/
│   │   └── openings.js            # Base de datos de 24 aperturas
│   │
│   ├── screens/
│   │   ├── HomeScreen.js          # Pantalla principal con resumen
│   │   ├── PracticeScreen.js      # Pantalla de práctica/estudio
│   │   ├── ProgressScreen.js      # Estadísticas y progreso
│   │   ├── SettingsScreen.js      # Configuración
│   │   └── OpeningDetailScreen.js # Detalle de apertura individual
│   │
│   └── utils/
│       └── spacedRepetition.js    # Algoritmo de repetición espaciada
│
└── assets/                         # Iconos e imágenes
```

## Algoritmo de Repetición Espaciada

Basado en SuperMemo SM-2 con modificaciones:

### Intervalos Base
- **Again**: ~1 minuto (revisión inmediata)
- **Hard**: ~6 minutos 
- **Good**: 1 día
- **Easy**: 4 días

### Factor de Facilidad (Ease Factor)
- Valor por defecto: 2.5
- Mínimo: 1.3
- Se ajusta según la calidad de la respuesta

### Cálculo del Próximo Intervalo

```javascript
// Primera revisión
if (repetitions === 1) {
  interval = INTERVALS.GOOD (1 día)
}

// Segunda revisión
else if (repetitions === 2) {
  interval = 6 días
}

// Revisiones posteriores
else {
  interval = previous_interval * ease_factor
}
```

### Ajuste del Ease Factor
- **Again**: EF - 0.2 (resetea repeticiones a 0)
- **Hard**: EF - 0.15
- **Good**: Sin cambio
- **Easy**: EF + 0.15

## Almacenamiento Local

### AsyncStorage Keys
- `userProgress`: Objeto con progreso de cada apertura
- `settings`: Configuraciones del usuario

### Estructura de Progreso por Apertura
```javascript
{
  openingId: {
    repetitions: number,      // Número de veces revisada
    easeFactor: number,       // Factor de facilidad actual
    interval: number,         // Intervalo en días
    nextReview: timestamp,    // Cuándo debe revisarse
    lastReview: timestamp,    // Última revisión
    lastQuality: string       // Última calificación
  }
}
```

## Base de Datos de Aperturas

Cada apertura tiene:
- `id`: Identificador único
- `name`: Nombre de la apertura
- `level`: principiante | intermedio | avanzado
- `eco`: Código ECO
- `moves`: Array de movimientos
- `fen`: Posición FEN del tablero
- `description`: Descripción general
- `mainIdea`: Idea principal de la apertura
- `nextMoves`: Continuaciones típicas
- `category`: e4 | d4 (tipo de apertura)

## Funcionalidades Implementadas

### ✅ Completadas
- [x] Sistema de repetición espaciada
- [x] Base de datos de 24 aperturas
- [x] Navegación entre pantallas
- [x] Almacenamiento local persistente
- [x] Visualización de tablero de ajedrez
- [x] Estadísticas de progreso
- [x] Configuración de niveles
- [x] Meta diaria
- [x] Filtrado por nivel
- [x] Cálculo de dominio por apertura

### 🚧 Posibles Mejoras Futuras
- [ ] Modo de juego interactivo (hacer los movimientos)
- [ ] Importar aperturas desde archivos PGN
- [ ] Notificaciones push diarias
- [ ] Modo oscuro
- [ ] Gráficos de progreso histórico
- [ ] Exportar/importar progreso
- [ ] Más variantes por apertura
- [ ] Audio con pronunciación de aperturas
- [ ] Modo de práctica por categoría (solo e4, solo d4)
- [ ] Desafíos semanales
- [ ] Sistema de logros/badges

## Dependencias Clave

- **expo**: Framework de React Native
- **@react-navigation**: Navegación entre pantallas
- **@react-native-async-storage/async-storage**: Almacenamiento local
- **react-native-chess-board**: Componente de tablero
- **chess.js**: Lógica de ajedrez (validación de movimientos)

## Testing

Para probar la app:
1. Instalar en dispositivo físico o emulador
2. Probar flujo completo: inicio → práctica → calificación → progreso
3. Verificar persistencia de datos (cerrar y reabrir app)
4. Probar cambio de configuraciones
5. Verificar algoritmo de repetición espaciada

## Rendimiento

- La app es ligera (~10-15 MB)
- Funciona offline después de la instalación
- Los datos se guardan localmente (no requiere backend)
- Carga instantánea de aperturas (no hay red)

## Compatibilidad

- Android 5.0 (API 21) o superior
- iOS 11.0 o superior (si se desea portar)
- Tabletas y teléfonos

## Notas para Expansión

Si deseas agregar más aperturas, edita `src/data/openings.js` siguiendo este formato:

```javascript
{
  id: 'unique_id',
  name: 'Nombre de la Apertura',
  level: 'principiante', // o 'intermedio', 'avanzado'
  eco: 'A00',
  moves: ['e4', 'c5', 'Nf3'], // Array de movimientos
  fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R',
  description: 'Descripción...',
  mainIdea: 'Idea principal...',
  nextMoves: ['d4', 'cxd4', 'Nxd4'],
  category: 'e4' // o 'd4'
}
```

Para obtener el FEN de una posición, puedes usar https://lichess.org/editor

---

Creado con ❤️ para ayudar a jugadores de ajedrez a mejorar su juego
