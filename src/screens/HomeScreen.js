import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStorage } from '../context/StorageContext';
import { OPENINGS_DATABASE } from '../data/openings';
import { getDueOpenings, getLearningStats } from '../utils/spacedRepetition';

export default function HomeScreen({ navigation }) {
  const { userProgress, settings } = useStorage();

  // Preparar datos de aperturas con progreso
  const openingsWithProgress = OPENINGS_DATABASE.map(opening => ({
    ...opening,
    progress: userProgress[opening.id]
  }));

  // Filtrar por niveles seleccionados
  const filteredOpenings = openingsWithProgress.filter(opening =>
    settings.selectedLevels.includes(opening.level)
  );

  // Obtener estadísticas
  const stats = getLearningStats(filteredOpenings);
  const dueOpenings = getDueOpenings(filteredOpenings);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Entrenamiento de Ajedrez</Text>
        <Text style={styles.subtitle}>Aprende aperturas con repetición espaciada</Text>
      </View>

      {/* Tarjetas pendientes hoy */}
      <TouchableOpacity
        style={styles.mainCard}
        onPress={() => navigation.navigate('Practicar')}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="book" size={40} color="#fff" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Modo Estudio</Text>
            <Text style={styles.cardSubtitle}>
              {dueOpenings.length} apertura{dueOpenings.length !== 1 ? 's' : ''} pendiente{dueOpenings.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Modo Quiz Interactivo */}
      <TouchableOpacity
        style={[styles.mainCard, { backgroundColor: '#7b1fa2' }]}
        onPress={() => navigation.navigate('Quiz')}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="game-controller" size={40} color="#fff" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Quiz Interactivo</Text>
            <Text style={styles.cardSubtitle}>
              Practica movimiento por movimiento
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>📊 Estadísticas</Text>
        
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#e3f2fd' }]}>
            <Ionicons name="add-circle-outline" size={32} color="#1976d2" />
            <Text style={styles.statNumber}>{stats.newCards}</Text>
            <Text style={styles.statLabel}>Nuevas</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#fff3e0' }]}>
            <Ionicons name="school-outline" size={32} color="#f57c00" />
            <Text style={styles.statNumber}>{stats.learning}</Text>
            <Text style={styles.statLabel}>Aprendiendo</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#f3e5f5' }]}>
            <Ionicons name="refresh-outline" size={32} color="#7b1fa2" />
            <Text style={styles.statNumber}>{stats.review}</Text>
            <Text style={styles.statLabel}>Revisión</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#e8f5e9' }]}>
            <Ionicons name="checkmark-circle-outline" size={32} color="#388e3c" />
            <Text style={styles.statNumber}>{stats.mastered}</Text>
            <Text style={styles.statLabel}>Dominadas</Text>
          </View>
        </View>
      </View>

      {/* Niveles activos */}
      <View style={styles.levelsContainer}>
        <Text style={styles.sectionTitle}>🎯 Niveles Activos</Text>
        <View style={styles.levelTags}>
          {settings.selectedLevels.map(level => (
            <View key={level} style={styles.levelTag}>
              <Text style={styles.levelTagText}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.levelInfo}>
          {filteredOpenings.length} aperturas disponibles
        </Text>
      </View>

      {/* Meta diaria */}
      <View style={styles.goalContainer}>
        <Text style={styles.sectionTitle}>🎯 Meta Diaria</Text>
        <View style={styles.goalProgress}>
          <View style={styles.goalBar}>
            <View 
              style={[
                styles.goalBarFill, 
                { width: `${Math.min((dueOpenings.length / settings.dailyGoal) * 100, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.goalText}>
            {Math.max(0, settings.dailyGoal - dueOpenings.length)} / {settings.dailyGoal} completadas
          </Text>
        </View>
      </View>

      {/* Consejos */}
      <View style={styles.tipContainer}>
        <Ionicons name="bulb-outline" size={24} color="#f57c00" />
        <Text style={styles.tipText}>
          💡 Tip: La repetición espaciada te ayuda a memorizar mejor. 
          Las aperturas que domines aparecerán cada vez menos frecuentemente.
        </Text>
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
    backgroundColor: '#2e7d32',
    padding: 24,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e8f5e9',
  },
  mainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1976d2',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#e3f2fd',
  },
  statsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  levelsContainer: {
    padding: 16,
  },
  levelTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  levelTag: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  levelTagText: {
    color: '#fff',
    fontWeight: '600',
  },
  levelInfo: {
    color: '#666',
    fontSize: 14,
  },
  goalContainer: {
    padding: 16,
  },
  goalProgress: {
    marginTop: 8,
  },
  goalBar: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  goalBarFill: {
    height: '100%',
    backgroundColor: '#2e7d32',
  },
  goalText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f57c00',
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
