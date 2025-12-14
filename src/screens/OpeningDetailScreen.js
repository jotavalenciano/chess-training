import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ChessBoard from '../components/ChessBoard';

export default function OpeningDetailScreen({ route }) {
  const { opening } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{opening.name}</Text>
        <Text style={styles.eco}>ECO: {opening.eco}</Text>
      </View>

      <View style={styles.boardContainer}>
        <ChessBoard 
          position={opening.fen}
          boardSize={340}
          interactive={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Descripción</Text>
        <Text style={styles.text}>{opening.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Idea Principal</Text>
        <Text style={styles.text}>{opening.mainIdea}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>♟️ Movimientos</Text>
        <View style={styles.movesList}>
          {opening.moves.map((move, index) => (
            <View key={index} style={styles.moveItem}>
              <Text style={styles.moveNumber}>{Math.floor(index / 2) + 1}.</Text>
              <Text style={styles.moveText}>{move}</Text>
            </View>
          ))}
        </View>
      </View>

      {opening.nextMoves && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>➡️ Continuaciones Típicas</Text>
          <View style={styles.movesList}>
            {opening.nextMoves.map((move, index) => (
              <View key={index} style={styles.moveItem}>
                <Text style={styles.moveText}>{move}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
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
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  eco: {
    fontSize: 16,
    color: '#e8f5e9',
  },
  boardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
  },
  movesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moveItem: {
    flexDirection: 'row',
    marginRight: 12,
    marginBottom: 8,
  },
  moveNumber: {
    fontSize: 14,
    color: '#999',
    marginRight: 4,
  },
  moveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976d2',
  },
});
