import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStorage } from '../context/StorageContext';

export default function SettingsScreen() {
  const { settings, saveSettings, resetProgress } = useStorage();
  
  const [localSettings, setLocalSettings] = useState(settings);

  const toggleLevel = (level) => {
    const newLevels = localSettings.selectedLevels.includes(level)
      ? localSettings.selectedLevels.filter(l => l !== level)
      : [...localSettings.selectedLevels, level];

    if (newLevels.length === 0) {
      Alert.alert('Atención', 'Debes seleccionar al menos un nivel');
      return;
    }

    const newSettings = { ...localSettings, selectedLevels: newLevels };
    setLocalSettings(newSettings);
    saveSettings(newSettings);
  };

  const changeDailyGoal = (change) => {
    const newGoal = Math.max(1, Math.min(50, localSettings.dailyGoal + change));
    const newSettings = { ...localSettings, dailyGoal: newGoal };
    setLocalSettings(newSettings);
    saveSettings(newSettings);
  };

  const toggleSound = () => {
    const newSettings = { ...localSettings, soundEnabled: !localSettings.soundEnabled };
    setLocalSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleResetProgress = () => {
    Alert.alert(
      '⚠️ Confirmar',
      '¿Estás seguro de que quieres resetear todo tu progreso? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetear',
          style: 'destructive',
          onPress: () => {
            resetProgress();
            Alert.alert('✅ Completado', 'Tu progreso ha sido reseteado');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Configuración</Text>
      </View>

      {/* Niveles */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 Niveles de Aperturas</Text>
        <Text style={styles.cardDescription}>
          Selecciona los niveles que deseas practicar
        </Text>

        <TouchableOpacity
          style={[
            styles.levelOption,
            localSettings.selectedLevels.includes('principiante') && styles.levelOptionActive
          ]}
          onPress={() => toggleLevel('principiante')}
        >
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>Principiante</Text>
            <Text style={styles.levelDesc}>Aperturas básicas y fundamentales</Text>
          </View>
          {localSettings.selectedLevels.includes('principiante') && (
            <Ionicons name="checkmark-circle" size={24} color="#2e7d32" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelOption,
            localSettings.selectedLevels.includes('intermedio') && styles.levelOptionActive
          ]}
          onPress={() => toggleLevel('intermedio')}
        >
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>Intermedio</Text>
            <Text style={styles.levelDesc}>Aperturas con más teoría y variantes</Text>
          </View>
          {localSettings.selectedLevels.includes('intermedio') && (
            <Ionicons name="checkmark-circle" size={24} color="#2e7d32" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelOption,
            localSettings.selectedLevels.includes('avanzado') && styles.levelOptionActive
          ]}
          onPress={() => toggleLevel('avanzado')}
        >
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>Avanzado</Text>
            <Text style={styles.levelDesc}>Aperturas complejas y de alto nivel</Text>
          </View>
          {localSettings.selectedLevels.includes('avanzado') && (
            <Ionicons name="checkmark-circle" size={24} color="#2e7d32" />
          )}
        </TouchableOpacity>
      </View>

      {/* Meta Diaria */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Meta Diaria</Text>
        <Text style={styles.cardDescription}>
          Número de aperturas a estudiar por día
        </Text>

        <View style={styles.goalControl}>
          <TouchableOpacity
            style={styles.goalButton}
            onPress={() => changeDailyGoal(-5)}
          >
            <Ionicons name="remove" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.goalDisplay}>
            <Text style={styles.goalNumber}>{localSettings.dailyGoal}</Text>
            <Text style={styles.goalLabel}>aperturas/día</Text>
          </View>

          <TouchableOpacity
            style={styles.goalButton}
            onPress={() => changeDailyGoal(5)}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sonido */}
      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.cardTitle}>🔊 Sonidos</Text>
            <Text style={styles.cardDescription}>
              Habilitar efectos de sonido
            </Text>
          </View>
          <Switch
            value={localSettings.soundEnabled}
            onValueChange={toggleSound}
            trackColor={{ false: '#ccc', true: '#81c784' }}
            thumbColor={localSettings.soundEnabled ? '#2e7d32' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Información */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ℹ️ Acerca de</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Versión:</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total de aperturas:</Text>
          <Text style={styles.infoValue}>24</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Sistema:</Text>
          <Text style={styles.infoValue}>Repetición espaciada</Text>
        </View>
      </View>

      {/* Zona peligrosa */}
      <View style={styles.dangerCard}>
        <Text style={styles.dangerTitle}>⚠️ Zona de Peligro</Text>
        
        <TouchableOpacity
          style={styles.dangerButton}
          onPress={handleResetProgress}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.dangerButtonText}>Resetear Todo el Progreso</Text>
        </TouchableOpacity>

        <Text style={styles.dangerWarning}>
          Esto eliminará todo tu progreso de forma permanente
        </Text>
      </View>

      {/* Información del algoritmo */}
      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={24} color="#1976d2" />
        <View style={styles.infoCardContent}>
          <Text style={styles.infoCardTitle}>
            ¿Cómo funciona la repetición espaciada?
          </Text>
          <Text style={styles.infoCardText}>
            Este sistema te muestra las aperturas justo antes de que las olvides. 
            Las que dominas aparecen menos frecuentemente, mientras que las difíciles 
            se repiten más a menudo. Así optimizas tu tiempo de estudio.
          </Text>
        </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  levelOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 12,
  },
  levelOptionActive: {
    borderColor: '#2e7d32',
    backgroundColor: '#f1f8f4',
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  levelDesc: {
    fontSize: 13,
    color: '#666',
  },
  goalControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  goalButton: {
    backgroundColor: '#2e7d32',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalDisplay: {
    alignItems: 'center',
    marginHorizontal: 32,
  },
  goalNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  goalLabel: {
    fontSize: 14,
    color: '#666',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  dangerCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#d32f2f',
  },
  dangerButton: {
    flexDirection: 'row',
    backgroundColor: '#d32f2f',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dangerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dangerWarning: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  infoCardContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  infoCardText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});
