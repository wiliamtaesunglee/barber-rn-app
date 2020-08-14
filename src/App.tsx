import React from 'react';
import { View, Text, StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <>
    <StatusBar
      barStyle="light-content"
      backgroundColor="'#312e38'"
    />
    <View
      style={{ flex: 1, backgroundColor: '#312e38' }}
    >
      <Text>
        teste
      </Text>
    </View>
    </>
  )
};

export default App;
