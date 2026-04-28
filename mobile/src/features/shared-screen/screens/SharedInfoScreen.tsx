import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type SharedInfoRouteParamList = {
  SharedInfo: {
    sourcePath: string;
  };
};

type SharedInfoScreenProps = NativeStackScreenProps<SharedInfoRouteParamList, 'SharedInfo'>;

export function SharedInfoScreen({ route }: SharedInfoScreenProps) {
  const { sourcePath } = route.params;

  return (
    <View style={styles.container} testID="shared-info-screen">
      <Text style={styles.title}>Shared Info</Text>
      <Text style={styles.meta}>Reached from: {sourcePath}</Text>
      <Text style={styles.description}>
        This is a shared screen module intended to be reusable from multiple navigation paths.
      </Text>
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
    color: '#111827',
    textAlign: 'center'
  },
  meta: {
    marginTop: 8,
    fontSize: 15,
    color: '#4b5563',
    textAlign: 'center'
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#6b7280',
    textAlign: 'center'
  }
});
