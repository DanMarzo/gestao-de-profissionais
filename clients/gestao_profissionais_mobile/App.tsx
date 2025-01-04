import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './src/views/home/HomePage';
import RegistrarProfissionaisPage from './src/views/home/RegistrarProfissionaisPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomePage: undefined;
  RegistrarProfissionaisPage: {value: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{title: 'Profissionais'}}
        />
        <Stack.Screen
          name="RegistrarProfissionaisPage"
          component={RegistrarProfissionaisPage}
          options={{title: 'Registrar Profissional'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
export {Stack};
