import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { HOME_LIST_ITEMS } from '../data/homeMockData';

type HomeScreenProps = {
  onSelectItem?: (itemId: string) => void;
};

export function HomeScreen({ onSelectItem }: HomeScreenProps) {
  return (
    <View style={styles.container} testID="home-screen">
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>
        Mock-backed list for demo navigation flows.
      </Text>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={HOME_LIST_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card} testID={`home-item-${item.id}`}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSummary}>{item.summary}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => onSelectItem?.(item.id)}
              style={({ pressed }) => [styles.cardButton, pressed && styles.cardButtonPressed]}
              testID={`home-item-open-${item.id}`}
            >
              <Text style={styles.cardButtonLabel}>View details</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827'
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 14,
    fontSize: 15,
    color: '#4b5563'
  },
  listContent: {
    paddingBottom: 24,
    gap: 10
  },
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#f9fafb'
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827'
  },
  cardSummary: {
    marginTop: 6,
    fontSize: 14,
    color: '#4b5563'
  },
  cardButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  cardButtonPressed: {
    opacity: 0.85
  },
  cardButtonLabel: {
    color: '#f9fafb',
    fontWeight: '600'
  }
});
