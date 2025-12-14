/**
 * Sistema de Repetición Espaciada (similar a Anki/Memrise)
 * Calcula cuándo debe aparecer nuevamente una apertura basándose en el rendimiento del usuario
 */

// Intervalos base en días
const INTERVALS = {
  AGAIN: 0.0007,      // ~1 minuto (revisión inmediata)
  HARD: 0.0042,       // ~6 minutos
  GOOD: 1,            // 1 día
  EASY: 4             // 4 días
};

// Factor de facilidad por defecto (E-Factor en SuperMemo)
const DEFAULT_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

/**
 * Calcula el próximo intervalo de revisión
 * @param {Object} card - Información de la tarjeta (apertura)
 * @param {string} quality - Calidad de la respuesta: 'again', 'hard', 'good', 'easy'
 * @returns {Object} - Nuevo estado de la tarjeta
 */
export function calculateNextReview(card, quality) {
  const now = new Date().getTime();
  
  // Inicializar valores si es primera vez
  const repetitions = card.repetitions || 0;
  const easeFactor = card.easeFactor || DEFAULT_EASE_FACTOR;
  const interval = card.interval || 0;

  let newRepetitions = repetitions;
  let newEaseFactor = easeFactor;
  let newInterval = interval;

  switch (quality) {
    case 'again':
      // Resetear progreso
      newRepetitions = 0;
      newInterval = INTERVALS.AGAIN;
      newEaseFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2);
      break;

    case 'hard':
      newRepetitions = repetitions + 1;
      newInterval = interval * 1.2;
      newEaseFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.15);
      break;

    case 'good':
      newRepetitions = repetitions + 1;
      if (newRepetitions === 1) {
        newInterval = INTERVALS.GOOD;
      } else if (newRepetitions === 2) {
        newInterval = 6;
      } else {
        newInterval = interval * easeFactor;
      }
      break;

    case 'easy':
      newRepetitions = repetitions + 1;
      if (newRepetitions === 1) {
        newInterval = INTERVALS.EASY;
      } else {
        newInterval = interval * easeFactor * 1.3;
      }
      newEaseFactor = easeFactor + 0.15;
      break;

    default:
      break;
  }

  // Calcular fecha de próxima revisión
  const nextReviewDate = now + (newInterval * 24 * 60 * 60 * 1000);

  return {
    repetitions: newRepetitions,
    easeFactor: newEaseFactor,
    interval: newInterval,
    nextReview: nextReviewDate,
    lastReview: now,
    lastQuality: quality
  };
}

/**
 * Filtra las aperturas que deben ser revisadas hoy
 * @param {Array} openings - Lista de aperturas con su progreso
 * @returns {Array} - Aperturas que necesitan revisión
 */
export function getDueOpenings(openings) {
  const now = new Date().getTime();
  
  return openings.filter(opening => {
    // Si nunca ha sido revisada, incluirla
    if (!opening.progress || !opening.progress.nextReview) {
      return true;
    }
    
    // Si la fecha de revisión ya pasó, incluirla
    return opening.progress.nextReview <= now;
  });
}

/**
 * Obtiene estadísticas de aprendizaje
 * @param {Array} openings - Lista de aperturas con su progreso
 * @returns {Object} - Estadísticas generales
 */
export function getLearningStats(openings) {
  const now = new Date().getTime();
  let newCards = 0;
  let learning = 0;
  let review = 0;
  let mastered = 0;

  openings.forEach(opening => {
    const progress = opening.progress;
    
    if (!progress || !progress.lastReview) {
      newCards++;
    } else if (progress.repetitions < 3) {
      learning++;
    } else if (progress.interval < 21) {
      review++;
    } else {
      mastered++;
    }
  });

  const dueCount = getDueOpenings(openings).length;

  return {
    newCards,
    learning,
    review,
    mastered,
    total: openings.length,
    dueToday: dueCount
  };
}

/**
 * Calcula el nivel de dominio de una apertura (0-100)
 * @param {Object} progress - Progreso de la apertura
 * @returns {number} - Porcentaje de dominio
 */
export function getMasteryLevel(progress) {
  if (!progress || !progress.repetitions) {
    return 0;
  }

  const { repetitions, easeFactor, interval } = progress;
  
  // Fórmula simple: combina repeticiones, facilidad e intervalo
  const repScore = Math.min(repetitions / 10, 1) * 40; // Máximo 40 puntos
  const easeScore = ((easeFactor - MIN_EASE_FACTOR) / (3.5 - MIN_EASE_FACTOR)) * 30; // Máximo 30 puntos
  const intervalScore = Math.min(interval / 30, 1) * 30; // Máximo 30 puntos

  return Math.round(repScore + easeScore + intervalScore);
}
