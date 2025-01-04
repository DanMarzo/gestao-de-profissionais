import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import RegistrarProfissionaisPage from './src/views/profissionais/registrar/RegistrarProfissionaisPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {colorDefault} from './src/shared/theme/colors';
import DetalhesProfissionalPage from './src/views/profissionais/DetalhesProfissionalPage';
import {HomePage} from './src/views/home/HomePage';
//import {ProfissionalProvider} from './src/providers/Profissional.context';
import {EspecialidadeProvider} from './src/providers/Especialidade.context';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  useEffect(() => {
    obterHttpClient();
    return () => {};
  }, []);

  const obterHttpClient = () => {
    AsyncStorage.getItem('client_http')
      .then(res => {
        if (!res) defaultHttp();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const defaultHttp = () => {
    console.log('in default cod');
    AsyncStorage.setItem('client_http', 'http://192.168.1.2:5123');
  };

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
