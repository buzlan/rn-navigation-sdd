import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '@navigation/params/homeParams';

import { HomeScreen } from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

type HomeDetailsProps = NativeStackScreenProps<HomeStackParamList, 'HomeDetails'>;

function HomeDetailsPlaceholderScreen({ route }: HomeDetailsProps) {
  return (
    <View style={styles.detailsContainer} testID="home-details-placeholder-screen">
      <Text style={styles.detailsTitle}>Home Details</Text>
      <Text style={styles.detailsText}>Selected item: {route.params.itemId}</Text>
    </View>
  );
}

export function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={{ title: 'Home' }}>
        {({ navigation }) => (
          <HomeScreen
            onSelectItem={(itemId) => {
              navigation.navigate('HomeDetails', { itemId });
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        component={HomeDetailsPlaceholderScreen}
        name="HomeDetails"
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827'
  },
  detailsText: {
    marginTop: 8,
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center'
  }
});
