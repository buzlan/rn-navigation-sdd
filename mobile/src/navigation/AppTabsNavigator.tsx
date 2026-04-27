import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { AppTabParamList } from './params/appParams';

const Tab = createBottomTabNavigator<AppTabParamList>();

function HomeTabPlaceholderScreen() {
  return (
    <View style={styles.container} testID="tab-home-placeholder">
      <Text style={styles.title}>Home Tab</Text>
      <Text style={styles.subtitle}>Placeholder content for upcoming Home flow.</Text>
    </View>
  );
}

function ExploreTabPlaceholderScreen() {
  return (
    <View style={styles.container} testID="tab-explore-placeholder">
      <Text style={styles.title}>Explore Tab</Text>
      <Text style={styles.subtitle}>Placeholder content for upcoming Explore flow.</Text>
    </View>
  );
}

function ProfileTabPlaceholderScreen() {
  return (
    <View style={styles.container} testID="tab-profile-placeholder">
      <Text style={styles.title}>Profile Tab</Text>
      <Text style={styles.subtitle}>Placeholder content for upcoming Profile flow.</Text>
    </View>
  );
}

export function AppTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Tab.Screen name="Home" component={HomeTabPlaceholderScreen} />
      <Tab.Screen name="Explore" component={ExploreTabPlaceholderScreen} />
      <Tab.Screen name="Profile" component={ProfileTabPlaceholderScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center'
  }
});
