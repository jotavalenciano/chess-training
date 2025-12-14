# Chess Training App

Aplicación móvil para Android que te ayuda a estudiar aperturas de ajedrez usando repetición espaciada, similar a Memrise pero especializada en ajedrez.

## 🎯 Características

- **Repetición Espaciada**: Algoritmo inteligente que muestra las aperturas justo antes de que las olvides
- **24 Aperturas**: Base de datos con aperturas clasificadas por nivel (principiante, intermedio, avanzado)
- **Tablero Interactivo**: Visualización clara de posiciones de ajedrez
- **Seguimiento de Progreso**: Estadísticas detalladas de tu aprendizaje
- **Personalizable**: Selecciona niveles y configura tu meta diaria
- **Sin conexión**: Funciona completamente offline

## 📱 Pantallas

1. **Inicio**: Vista general de tu progreso y aperturas pendientes
2. **Practicar**: Sesiones de estudio con sistema de calificación (Difícil/Bien/Fácil)
3. **Progreso**: Estadísticas detalladas y nivel de dominio por apertura
4. **Configuración**: Personaliza niveles, metas y opciones

## 🚀 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- Expo CLI
- Android Studio (para emulador) o dispositivo Android físico

### Pasos

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm start
```

3. Ejecutar en Android:
```bash
npm run android
```

O escanea el código QR con la app Expo Go en tu teléfono Android.

## 📖 Cómo Usar

1. **Primera vez**: La app viene con niveles principiante e intermedio activados por defecto
2. **Practica**: Ve a la pestaña "Practicar" y comienza a estudiar
3. **Califica tu respuesta**: Después de ver cada apertura, califica qué tan bien la recordaste:
   - ❌ **No la recordé**: La verás en minutos
   - 🤔 **Me costó**: La verás en poco tiempo
   - 👍 **Bien**: La verás en días
   - 🎉 **Fácil**: La verás en semanas
4. **Revisa tu progreso**: La pestaña "Progreso" te muestra tu nivel de dominio

## 🧠 Sistema de Repetición Espaciada

El algoritmo utiliza el método SuperMemo (SM-2) adaptado:

- Las aperturas nuevas aparecen frecuentemente
- Las que dominas aparecen cada vez menos
- El intervalo aumenta según tu rendimiento
- Si fallas, el intervalo se reinicia

## 📚 Base de Datos de Aperturas

### Principiante (5 aperturas)
- Apertura Italiana
- Apertura Española (Ruy López)
- Defensa Escocesa
- Sistema Londres
- Gambito del Centro

### Intermedio (7 aperturas)
- Defensa Siciliana
- Siciliana Dragón
- Defensa Francesa
- Defensa Caro-Kann
- Defensa India de Rey
- Defensa Nimzoindia
- Defensa Grünfeld

### Avanzado (8 aperturas)
- Defensa Berlinesa
- Siciliana Najdorf
- Defensa Eslava
- Defensa Benoni
- Defensa Holandesa
- Ataque Marshall
- Siciliana Sveshnikov
- Apertura Catalana

## 🛠️ Tecnologías

- **React Native**: Framework principal
- **Expo**: Herramientas de desarrollo
- **React Navigation**: Navegación entre pantallas
- **AsyncStorage**: Almacenamiento local
- **react-native-chessboard**: Visualización del tablero
- **chess.js**: Lógica de ajedrez

## 📝 Próximas Mejoras

- [ ] Modo de práctica por categoría (e4, d4, etc.)
- [ ] Importar aperturas desde PGN
- [ ] Modo de juego contra la apertura
- [ ] Notificaciones diarias
- [ ] Gráficos de progreso histórico
- [ ] Compartir progreso
- [ ] Tema oscuro

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

Creado para ayudar a jugadores de ajedrez principiantes e intermedios a memorizar aperturas de forma efectiva.

## 🙏 Agradecimientos

- Inspirado en Memrise y Anki
- Base de datos de aperturas basada en teoría estándar de ajedrez
- Algoritmo de repetición espaciada basado en SuperMemo SM-2

---

¡Buena suerte con tu entrenamiento de ajedrez! ♟️
