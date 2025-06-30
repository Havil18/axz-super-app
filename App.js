import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, Text } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';
import Services from './components/Services';
import { UserProvider, useUser } from './contexts/UserContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Blog from './components/Blog';

const Stack = createNativeStackNavigator();

// Auth stack navigator
const AuthStack = createNativeStackNavigator();
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

// App stack navigator
const AppStack = createNativeStackNavigator();
const AppNavigator = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Landing" component={LandingScreen} />
    <AppStack.Screen name="Services" component={Services} />
    <AppStack.Screen name="Blog" component={Blog} />
  </AppStack.Navigator>
);

function LoadingScreen() {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text style={{ marginTop: 10, color: theme.text }}>Loading...</Text>
    </View>
  );
}

function Navigation() {
  const { isLoading, accessToken } = useUser();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {accessToken ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </ThemeProvider>
  );
} 