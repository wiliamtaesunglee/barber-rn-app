import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';
import { AuthProvider } from './hooks/auth';

const App: React.FC = () => {
  return (
    <NavigationContainer>
    <StatusBar
      barStyle="light-content"
      backgroundColor="#312e38"
      translucent
    />
      <AppProvider>
        <AuthProvider>
          <View
            style={{ flex: 1, backgroundColor: '#312e38' }}
          >
            <Routes />
          </View>
        </AuthProvider>
      </AppProvider>
    </NavigationContainer>
  )
};

export default App;
