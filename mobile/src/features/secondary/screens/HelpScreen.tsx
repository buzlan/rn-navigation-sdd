import { StyleSheet, Text, View } from 'react-native';

export function HelpScreen() {
  return (
    <View style={styles.container} testID="secondary-help-screen">
      <Text style={styles.title}>Help</Text>
      <Text style={styles.subtitle}>Secondary support placeholder.</Text>
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
