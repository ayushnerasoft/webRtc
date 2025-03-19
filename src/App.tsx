import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LobbyScreen from './screens/Lobby';
import RoomPage from './screens/Room';
import { SocketProvider } from './context/SocketProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SocketProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LobbyScreen">
          <Stack.Screen name="LobbyScreen" component={LobbyScreen} />
          <Stack.Screen name="RoomPage" component={RoomPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
};

export default App;
