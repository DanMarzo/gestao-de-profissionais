import React from 'react';
import {useColorScheme} from 'react-native';
import RegistrarProfissionaisPage from './src/views/RegistrarProfissionaisPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {colorDefault} from './src/shared/theme/colors';
import DetalhesProfissionalPage from './src/views/DetalhesProfissionalPage';
import {HomePage} from './src/views/home/HomePage';
//import {ProfissionalProvider} from './src/providers/Profissional.context';
import {EspecialidadeProvider} from './src/providers/Especialidade.context';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';

type RootStackParamList = {
  HomePage: undefined;
  RegistrarProfissionaisPage: {value: string};
  DetalhesProfissionalPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const themeDefault: ReactNavigation.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colorDefault.primary,
    text: 'white',
  },
};

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {/* <ProfissionalProvider> */}
      <EspecialidadeProvider>
        <NavigationContainer theme={themeDefault}>
          <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{
                title: 'Profissionais',
                headerStyle: {
                  backgroundColor: colorDefault.primary,
                },
              }}
            />
            <Stack.Screen
              name="RegistrarProfissionaisPage"
              component={RegistrarProfissionaisPage}
              options={{
                title: 'Registrar Profissional',
                headerStyle: {
                  backgroundColor: colorDefault.primary,
                },
              }}
            />
            <Stack.Screen
              name="DetalhesProfissionalPage"
              component={DetalhesProfissionalPage}
              options={{
                title: 'Detalhes Profissional',
                headerStyle: {
                  backgroundColor: colorDefault.primary,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </EspecialidadeProvider>
      {/* </ProfissionalProvider> */}
    </ApplicationProvider>
  );
};

export default App;
export {Stack};
export type {RootStackParamList};
