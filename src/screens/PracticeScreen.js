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
import { OPENINGS_DATABASE, getOpeningsByLevel } from '../data/openings';
import { getDueOpenings, calculateNextReview } from '../utils/spacedRepetition';

export default function PracticeScreen() {
  const { userProgress, saveProgress, settings } = useStorage();
  const [currentOpening, setCurrentOpening] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [dueOpenings, setDueOpenings] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [showMoveByMove, setShowMoveByMove] = useState(false);

  useEffect(() => {
    loadNextOpening();
  }, [userProgress, settings]);

  const loadNextOpening = () => {
    // Filtrar por niveles seleccionados
    const filteredOpenings = getOpeningsByLevel(settings.selectedLevels).map(opening => ({
      ...opening,
      progress: userProgress[opening.id]
    }));

    // Obtener aperturas pendientes
    const due = getDueOpenings(filteredOpenings);
    setDueOpenings(due);

    if (due.length > 0) {
      // Seleccionar aleatoriamente de las pendientes
      const randomIndex = Math.floor(Math.random() * due.length);
      setCurrentOpening(due[randomIndex]);
      setShowAnswer(false);
      setCurrentMoveIndex(0);
      setShowMoveByMove(false);
    } else {
      setCurrentOpening(null);
    }
  };

  // Generar FEN para cada movimiento usando chess.js
  const generatePositionAtMove = (moveIndex) => {
    if (!currentOpening) return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    
    const chess = new Chess();
    
    // Aplicar movimientos hasta el índice actual
    for (let i = 0; i <= moveIndex && i < currentOpening.moves.length; i++) {
      try {
        chess.move(currentOpening.moves[i]);
      } catch (error) {
        console.error('Error aplicando movimiento:', currentOpening.moves[i], error);
        break;
      }
    }
    
    return chess.fen();
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

  const handleResetMoves = () => {
    setCurrentMoveIndex(0);
  };

  const toggleMoveByMove = () => {
    setShowMoveByMove(!showMoveByMove);
    if (!showMoveByMove) {
      setCurrentMoveIndex(0);
    }
  };

  const handleAnswer = (quality) => {
    if (!currentOpening) return;

    const currentProgress = currentOpening.progress || {};
    const newProgress = calculateNextReview(currentProgress, quality);

    saveProgress(currentOpening.id, newProgress);

    // Mostrar feedback
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
        <Text style={styles.emptySubtext}>
          Vuelve mañana para continuar tu entrenamiento.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.counter}>
          {dueOpenings.length} apertura{dueOpenings.length !== 1 ? 's' : ''} pendiente{dueOpenings.length !== 1 ? 's' : ''}
        </Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>
            {currentOpening.level.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          ¿Cuál es esta apertura?
        </Text>

        <View style={styles.boardContainer}>
          <ChessBoard 
            position={showAnswer && showMoveByMove ? generatePositionAtMove(currentMoveIndex) : currentOpening.fen}
            boardSize={340}
            interactive={false}
          />
          
          {showAnswer && showMoveByMove && (
            <View style={styles.moveNavigation}>
              <View style={styles.moveHeader}>
                <Text style={styles.moveCounter}>
                  Movimiento {currentMoveIndex + 1} de {currentOpening.moves.length}
                </Text>
                <Text style={styles.currentMoveText}>
                  {currentOpening.moves[currentMoveIndex]}
                </Text>
              </View>
              
              <View style={styles.moveControls}>
                <TouchableOpacity
                  style={[styles.moveButton, currentMoveIndex === 0 && styles.moveButtonDisabled]}
                  onPress={handleResetMoves}
                  disabled={currentMoveIndex === 0}
                >
                  <Ionicons name="play-back" size={24} color={currentMoveIndex === 0 ? '#ccc' : '#1976d2'} />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.moveButton, currentMoveIndex === 0 && styles.moveButtonDisabled]}
                  onPress={handlePrevMove}
                  disabled={currentMoveIndex === 0}
                >
                  <Ionicons name="chevron-back" size={24} color={currentMoveIndex === 0 ? '#ccc' : '#1976d2'} />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.moveButton, currentMoveIndex === currentOpening.moves.length - 1 && styles.moveButtonDisabled]}
                  onPress={handleNextMove}
                  disabled={currentMoveIndex === currentOpening.moves.length - 1}
                >
                  <Ionicons name="chevron-forward" size={24} color={currentMoveIndex === currentOpening.moves.length - 1 ? '#ccc' : '#1976d2'} />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.moveButton, currentMoveIndex === currentOpening.moves.length - 1 && styles.moveButtonDisabled]}
                  onPress={() => setCurrentMoveIndex(currentOpening.moves.length - 1)}
                  disabled={currentMoveIndex === currentOpening.moves.length - 1}
                >
                  <Ionicons name="play-forward" size={24} color={currentMoveIndex === currentOpening.moves.length - 1 ? '#ccc' : '#1976d2'} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {!showAnswer ? (
          <TouchableOpacity
            style={styles.showButton}
            onPress={() => setShowAnswer(true)}
          >
            <Text style={styles.showButtonText}>Mostrar Respuesta</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.answerContainer}>
            <View style={styles.answerHeader}>
              <Text style={styles.openingName}>{currentOpening.name}</Text>
              <Text style={styles.openingEco}>ECO: {currentOpening.eco}</Text>
            </View>

            <TouchableOpacity
              style={styles.moveByMoveButton}
              onPress={toggleMoveByMove}
            >
              <Ionicons 
                name={showMoveByMove ? "eye-off" : "play-circle"} 
                size={20} 
                color="#fff" 
              />
              <Text style={styles.moveByMoveButtonText}>
                {showMoveByMove ? 'Ocultar navegación' : 'Ver paso a paso'}
              </Text>
            </TouchableOpacity>

            <View style={styles.movesContainer}>
              <Text style={styles.movesLabel}>Movimientos:</Text>
              <View style={styles.movesList}>
                {currentOpening.moves.map((move, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.moveItem,
                      showMoveByMove && index === currentMoveIndex && styles.moveItemActive
                    ]}
                  >
                    <Text style={[
                      styles.moveNumber,
                      showMoveByMove && index === currentMoveIndex && styles.moveTextActive
                    ]}>
                      {Math.floor(index / 2) + 1}.
                    </Text>
                    <Text style={[
                      styles.moveText,
                      showMoveByMove && index === currentMoveIndex && styles.moveTextActive
                    ]}>
                      {move}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>💡 Idea principal:</Text>
              <Text style={styles.infoText}>{currentOpening.mainIdea}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>📝 Descripción:</Text>
              <Text style={styles.infoText}>{currentOpening.description}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <Text style={styles.ratingTitle}>¿Qué tan bien la recordaste?</Text>
              
              <TouchableOpacity
                style={[styles.ratingButton, styles.againButton]}
                onPress={() => handleAnswer('again')}
              >
                <Text style={styles.ratingButtonText}>❌ No la recordé</Text>
                <Text style={styles.ratingButtonSubtext}>La veré pronto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ratingButton, styles.hardButton]}
                onPress={() => handleAnswer('hard')}
              >
                <Text style={styles.ratingButtonText}>🤔 Me costó</Text>
                <Text style={styles.ratingButtonSubtext}>En minutos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ratingButton, styles.goodButton]}
                onPress={() => handleAnswer('good')}
              >
                <Text style={styles.ratingButtonText}>👍 Bien</Text>
                <Text style={styles.ratingButtonSubtext}>En días</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ratingButton, styles.easyButton]}
                onPress={() => handleAnswer('easy')}
              >
                <Text style={styles.ratingButtonText}>🎉 Fácil</Text>
                <Text style={styles.ratingButtonSubtext}>En semanas</Text>
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
    marginBottom: 20,
    color: '#333',
  },
  boardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  moveNavigation: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  moveHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  moveCounter: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  currentMoveText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  moveControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  moveButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moveButtonDisabled: {
    backgroundColor: '#f5f5f5',
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
  answerContainer: {
    marginTop: 10,
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
  moveByMoveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7b1fa2',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  moveByMoveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    flexDirection: 'row',
    marginRight: 12,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  moveItemActive: {
    backgroundColor: '#e3f2fd',
  },
  moveNumber: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  moveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976d2',
  },
  moveTextActive: {
    color: '#1976d2',
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
    padding: 16,
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
    marginBottom: 4,
  },
  ratingButtonSubtext: {
    fontSize: 12,
    color: '#666',
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
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
  },
});
