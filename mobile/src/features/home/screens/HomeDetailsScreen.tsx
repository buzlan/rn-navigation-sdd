import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '@navigation/params/homeParams';

import { getHomeItemById } from '../data/homeMockData';

type HomeDetailsScreenProps = NativeStackScreenProps<HomeStackParamList, 'HomeDetails'>;

export function HomeDetailsScreen({ route }: HomeDetailsScreenProps) {
  const { itemId } = route.params;
  const item = getHomeItemById(itemId);

  return (
    <View style={styles.container} testID="home-details-screen">
      <Text style={styles.title}>Home Details</Text>
      <Text style={styles.meta}>Item ID: {itemId}</Text>

      {item ? (
        <>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSummary}>{item.summary}</Text>
        </>
      ) : (
        <Text style={styles.emptyText}>No mock item found for this id.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827'
  },
  meta: {
    marginTop: 6,
    marginBottom: 16,
    fontSize: 14,
    color: '#6b7280'
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827'
  },
  itemSummary: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563'
  },
  emptyText: {
    fontSize: 15,
    color: '#b45309'
  }
});
