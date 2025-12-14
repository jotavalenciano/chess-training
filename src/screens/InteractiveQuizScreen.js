import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Chess } from 'chess.js';
import ChessBoard from '../components/ChessBoard';
import { useStorage } from '../context/StorageContext';
import { getOpeningsByLevel } from '../data/openings';
import { getDueOpenings, calculateNextReview } from '../utils/spacedRepetition';

/**
 * Quiz Interactivo - Modo donde el usuario hace los movimientos
 */

function generatePositionAtMove(opening, moveIndex) {
  if (!opening) return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  const chess = new Chess();
  
  // Aplicar movimientos hasta el índice actual
  for (let i = 0; i <= moveIndex && i < opening.moves.length; i++) {
    try {
      chess.move(opening.moves[i]);
    } catch (error) {
      console.error('Error aplicando movimiento:', opening.moves[i], error);
      break;
    }
  }
  
  return chess.fen();
}

export default function InteractiveQuizScreen() {
  const { userProgress, saveProgress, settings } = useStorage();
  const [currentOpening, setCurrentOpening] = useState(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [mode, setMode] = useState('guess'); // 'guess' | 'show'
  const [dueOpenings, setDueOpenings] = useState([]);

  useEffect(() => {
    loadNextOpening();
  }, [userProgress, settings]);

  const loadNextOpening = () => {
    const filteredOpenings = getOpeningsByLevel(settings.selectedLevels).map(opening => ({
      ...opening,
      progress: userProgress[opening.id]
    }));

    const due = getDueOpenings(filteredOpenings);
    setDueOpenings(due);

    if (due.length > 0) {
      const randomIndex = Math.floor(Math.random() * due.length);
      setCurrentOpening(due[randomIndex]);
      setCurrentMoveIndex(0);
      setSelectedSquare(null);
      setShowHint(false);
      setMode('guess');
    } else {
      setCurrentOpening(null);
    }
  };

  const handleSquarePress = ({ row, col }) => {
    if (!currentOpening || mode !== 'guess') return;

    // En una implementación completa, aquí validarías el movimiento
    // Por ahora, simplemente mostramos el hint
    setShowHint(true);
  };

  const handleShowAnswer = () => {
    setMode('show');
  };

  const handleNextMove = () => {
    if (currentMoveIndex < currentOpening.moves.length - 1) {
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const handlePrevMove = () => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex(currentMoveIndex - 1);
    }
  };

  const handleAnswer = (quality) => {
    if (!currentOpening) return;

    const currentProgress = currentOpening.progress || {};
    const newProgress = calculateNextReview(currentProgress, quality);

    saveProgress(currentOpening.id, newProgress);

    const messages = {
      again: '❌ Inténtalo de nuevo pronto',
      hard: '🤔 Difícil - La verás pronto',
      good: '👍 Bien - La verás en unos días',
      easy: '🎉 ¡Excelente! La verás en mucho tiempo'
    };

    Alert.alert('Respuesta registrada', messages[quality], [
      { text: 'Continuar', onPress: loadNextOpening }
    ]);
  };

  if (!currentOpening) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="checkmark-circle" size={80} color="#2e7d32" />
        <Text style={styles.emptyTitle}>¡Felicitaciones! 🎉</Text>
        <Text style={styles.emptyText}>
          Has completado todas las aperturas por hoy.
        </Text>
      </View>
    );
  }

  const currentMove = currentOpening.moves[currentMoveIndex];
  const moveNumber = Math.floor(currentMoveIndex / 2) + 1;
  const isWhiteMove = currentMoveIndex % 2 === 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.counter}>
          {dueOpenings.length} pendiente{dueOpenings.length !== 1 ? 's' : ''}
        </Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>
            {currentOpening.level.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        {mode === 'guess' ? (
          <View>
            <Text style={styles.question}>
              🎯 Modo Quiz Interactivo
            </Text>
            <Text style={styles.instruction}>
              ¿Cuál es el siguiente movimiento?
            </Text>
            <Text style={styles.moveHint}>
              Turno de {isWhiteMove ? 'las blancas' : 'las negras'}
              {'\n'}Movimiento #{moveNumber}
            </Text>
          </View>
        ) : (
          <View style={styles.answerHeader}>
            <Text style={styles.openingName}>{currentOpening.name}</Text>
            <Text style={styles.openingEco}>ECO: {currentOpening.eco}</Text>
          </View>
        )}

        <View style={styles.boardContainer}>
          <ChessBoard 
            position={mode === 'show' ? generatePositionAtMove(currentOpening, currentMoveIndex) : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
            boardSize={340}
            interactive={mode === 'guess'}
            onSquarePress={handleSquarePress}
            selectedSquare={selectedSquare}
          />
        </View>

        {mode === 'guess' ? (
          <View style={styles.guessButtons}>
            {showHint && (
              <View style={styles.hintBox}>
                <Ionicons name="bulb" size={20} color="#f57c00" />
                <Text style={styles.hintText}>
                  Siguiente movimiento: <Text style={styles.hintMove}>{currentMove}</Text>
                </Text>
              </View>
            )}
            
            {!showHint && (
              <TouchableOpacity
                style={styles.hintButton}
                onPress={() => setShowHint(true)}
              >
                <Ionicons name="help-circle-outline" size={20} color="#fff" />
                <Text style={styles.hintButtonText}>Mostrar Pista</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.showButton}
              onPress={handleShowAnswer}
            >
              <Text style={styles.showButtonText}>Ver Apertura Completa</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* Controles de movimientos */}
            <View style={styles.movesControls}>
              <TouchableOpacity
                style={[styles.moveButton, currentMoveIndex === 0 && styles.moveButtonDisabled]}
                onPress={handlePrevMove}
                disabled={currentMoveIndex === 0}
              >
                <Ionicons name="play-back" size={24} color={currentMoveIndex === 0 ? '#ccc' : '#2e7d32'} />
              </TouchableOpacity>

              <View style={styles.moveDisplay}>
                <Text style={styles.moveText}>
                  {moveNumber}. {currentMove}
                </Text>
                <Text style={styles.moveProgress}>
                  {currentMoveIndex + 1} / {currentOpening.moves.length}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.moveButton, currentMoveIndex === currentOpening.moves.length - 1 && styles.moveButtonDisabled]}
                onPress={handleNextMove}
                disabled={currentMoveIndex === currentOpening.moves.length - 1}
              >
                <Ionicons name="play-forward" size={24} color={currentMoveIndex === currentOpening.moves.length - 1 ? '#ccc' : '#2e7d32'} />
              </TouchableOpacity>
            </View>

            {/* Lista de movimientos */}
            <View style={styles.movesContainer}>
              <Text style={styles.movesLabel}>Movimientos:</Text>
              <View style={styles.movesList}>
                {currentOpening.moves.map((move, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.moveItem,
                      index === currentMoveIndex && styles.moveItemActive
                    ]}
                    onPress={() => setCurrentMoveIndex(index)}
                  >
                    <Text style={[
                      styles.moveItemText,
                      index === currentMoveIndex && styles.moveItemTextActive
                    ]}>
                      {Math.floor(index / 2) + 1}. {move}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>💡 Idea principal:</Text>
              <Text style={styles.infoText}>{currentOpening.mainIdea}</Text>
            </View>

            {/* Botones de calificación */}
            <View style={styles.buttonsContainer}>
              <Text style={styles.ratingTitle}>¿Qué tan bien la recordaste?</Text>
              
              <TouchableOpacity
                style={[styles.ratingButton, styles.againButton]}
                onPress={() => handleAnswer('again')}
              >
                <Text style={styles.ratingButtonText}>❌ No la recordé</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ratingButton, styles.hardButton]}
                onPress={() => handleAnswer('hard')}
              >
                <Text style={styles.ratingButtonText}>🤔 Me costó</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ratingButton, styles.goodButton]}
                onPress={() => handleAnswer('good')}
              >
                <Text style={styles.ratingButtonText}>👍 Bien</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ratingButton, styles.easyButton]}
                onPress={() => handleAnswer('easy')}
              >
                <Text style={styles.ratingButtonText}>🎉 Fácil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  counter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  levelBadge: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  moveHint: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    color: '#2e7d32',
    fontWeight: '600',
  },
  boardContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  guessButtons: {
    marginTop: 20,
  },
  hintBox: {
    flexDirection: 'row',
    backgroundColor: '#fff3e0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#f57c00',
  },
  hintText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  hintMove: {
    fontWeight: 'bold',
    color: '#2e7d32',
    fontSize: 16,
  },
  hintButton: {
    flexDirection: 'row',
    backgroundColor: '#f57c00',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  hintButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  showButton: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  showButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  answerHeader: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
  },
  openingName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  openingEco: {
    fontSize: 16,
    color: '#666',
  },
  movesControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  moveButton: {
    padding: 12,
  },
  moveButtonDisabled: {
    opacity: 0.3,
  },
  moveDisplay: {
    alignItems: 'center',
    flex: 1,
  },
  moveText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  moveProgress: {
    fontSize: 12,
    color: '#999',
  },
  movesContainer: {
    marginBottom: 16,
  },
  movesLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  movesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moveItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  moveItemActive: {
    backgroundColor: '#2e7d32',
  },
  moveItemText: {
    fontSize: 14,
    color: '#666',
  },
  moveItemTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  ratingButton: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  againButton: {
    backgroundColor: '#ffebee',
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  hardButton: {
    backgroundColor: '#fff3e0',
    borderWidth: 2,
    borderColor: '#f57c00',
  },
  goodButton: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#1976d2',
  },
  easyButton: {
    backgroundColor: '#e8f5e9',
    borderWidth: 2,
    borderColor: '#388e3c',
  },
  ratingButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#333',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});
