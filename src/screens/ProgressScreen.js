import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStorage } from '../context/StorageContext';
import { OPENINGS_DATABASE } from '../data/openings';
import { getMasteryLevel, getLearningStats } from '../utils/spacedRepetition';

export default function ProgressScreen() {
  const { userProgress, settings } = useStorage();

  // Preparar datos
  const openingsWithProgress = OPENINGS_DATABASE
    .filter(opening => settings.selectedLevels.includes(opening.level))
    .map(opening => ({
      ...opening,
      progress: userProgress[opening.id],
      mastery: getMasteryLevel(userProgress[opening.id])
    }))
    .sort((a, b) => b.mastery - a.mastery);

  const stats = getLearningStats(openingsWithProgress);

  // Calcular progreso general
  const totalMastery = openingsWithProgress.reduce((sum, op) => sum + op.mastery, 0);
  const averageMastery = openingsWithProgress.length > 0 
    ? Math.round(totalMastery / openingsWithProgress.length) 
    : 0;

  // Agrupar por nivel de dominio
  const beginner = openingsWithProgress.filter(op => op.mastery < 33);
  const intermediate = openingsWithProgress.filter(op => op.mastery >= 33 && op.mastery < 66);
  const advanced = openingsWithProgress.filter(op => op.mastery >= 66);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📈 Tu Progreso</Text>
      </View>

      {/* Progreso General */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progreso General</Text>
        <View style={styles.overallProgress}>
          <View style={styles.circularProgress}>
            <Text style={styles.percentageText}>{averageMastery}%</Text>
            <Text style={styles.percentageLabel}>Dominio</Text>
          </View>
          <View style={styles.statsColumn}>
            <View style={styles.statRow}>
              <Ionicons name="book-outline" size={24} color="#1976d2" />
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{stats.total}</Text>
                <Text style={styles.statLabel}>Total aperturas</Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="trophy-outline" size={24} color="#f57c00" />
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{stats.mastered}</Text>
                <Text style={styles.statLabel}>Dominadas</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Distribución por dominio */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Distribución por Dominio</Text>
        
        <View style={styles.distributionBar}>
          {advanced.length > 0 && (
            <View 
              style={[styles.barSegment, styles.advancedSegment, 
                { width: `${(advanced.length / openingsWithProgress.length) * 100}%` }]}
            />
          )}
          {intermediate.length > 0 && (
            <View 
              style={[styles.barSegment, styles.intermediateSegment, 
                { width: `${(intermediate.length / openingsWithProgress.length) * 100}%` }]}
            />
          )}
          {beginner.length > 0 && (
            <View 
              style={[styles.barSegment, styles.beginnerSegment, 
                { width: `${(beginner.length / openingsWithProgress.length) * 100}%` }]}
            />
          )}
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#388e3c' }]} />
            <Text style={styles.legendText}>Avanzado ({advanced.length})</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#1976d2' }]} />
            <Text style={styles.legendText}>Intermedio ({intermediate.length})</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#f57c00' }]} />
            <Text style={styles.legendText}>Principiante ({beginner.length})</Text>
          </View>
        </View>
      </View>

      {/* Lista de aperturas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Todas las Aperturas</Text>
        
        {openingsWithProgress.map((opening) => (
          <View key={opening.id} style={styles.openingItem}>
            <View style={styles.openingHeader}>
              <Text style={styles.openingName}>{opening.name}</Text>
              <Text style={styles.masteryPercent}>{opening.mastery}%</Text>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${opening.mastery}%`,
                    backgroundColor: opening.mastery >= 66 ? '#388e3c' : 
                                    opening.mastery >= 33 ? '#1976d2' : '#f57c00'
                  }
                ]} 
              />
            </View>
            
            <View style={styles.openingMeta}>
              <Text style={styles.metaText}>ECO: {opening.eco}</Text>
              <Text style={styles.metaText}>
                {opening.progress ? 
                  `${opening.progress.repetitions || 0} repeticiones` : 
                  'Sin practicar'}
              </Text>
            </View>
          </View>
        ))}

        {openingsWithProgress.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="albums-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              No hay aperturas disponibles para los niveles seleccionados.
            </Text>
          </View>
        )}
      </View>

      {/* Consejos */}
      <View style={styles.tipCard}>
        <Ionicons name="information-circle-outline" size={24} color="#1976d2" />
        <Text style={styles.tipText}>
          💡 Tip: Las aperturas con mayor porcentaje de dominio aparecerán con menor 
          frecuencia en tu práctica diaria.
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  overallProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circularProgress: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#2e7d32',
  },
  percentageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  percentageLabel: {
    fontSize: 14,
    color: '#666',
  },
  statsColumn: {
    flex: 1,
    marginLeft: 20,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statInfo: {
    marginLeft: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  distributionBar: {
    flexDirection: 'row',
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 16,
  },
  barSegment: {
    height: '100%',
  },
  advancedSegment: {
    backgroundColor: '#388e3c',
  },
  intermediateSegment: {
    backgroundColor: '#1976d2',
  },
  beginnerSegment: {
    backgroundColor: '#f57c00',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  openingItem: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  openingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  openingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  masteryPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
  },
  openingMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
