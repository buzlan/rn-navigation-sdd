import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '@navigation/params/homeParams';

type HomeModalScreenProps = NativeStackScreenProps<HomeStackParamList, 'HomeModalInfo'>;

export function HomeModalScreen({ route }: HomeModalScreenProps) {
  const origin = route.params?.origin ?? 'unknown';

  return (
    <View style={styles.container} testID="home-modal-screen">
      <Text style={styles.title}>Home Modal</Text>
      <Text style={styles.subtitle}>Origin: {origin}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center'
  }
});
