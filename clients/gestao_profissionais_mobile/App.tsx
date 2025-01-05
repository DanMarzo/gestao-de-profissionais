import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {colorDefault} from './src/shared/theme/colors';
import {HomePage} from './src/views/home/HomePage';
import {EspecialidadeProvider} from './src/providers/Especialidade.context';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {ProfissionalModel} from './src/models/profissional.model';
import {RegistrarProfissionaisPage} from './src/views/profissionais/registrar/RegistrarProfissionaisPage';
import {DetalhesProfissionalPage} from './src/views/profissionais/DetalhesProfissionalPage';
import {AtualizarProfissionalPage} from './src/views/profissionais/atualizar/AtualizarProfissionalPage';
import {default as themeLight} from './theme.json';

type RootStackParamList = {
  HomePage: undefined;
  RegistrarProfissionaisPage: undefined;
  DetalhesProfissionalPage: {
    profissional: ProfissionalModel;
  };
  AtualizarProfissionalPage: {profissional: ProfissionalModel};
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
    <ApplicationProvider {...eva} theme={{...eva.light, ...themeLight}}>
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
            <Stack.Screen
              name="AtualizarProfissionalPage"
              component={AtualizarProfissionalPage}
              options={{
                title: 'Atualizar Profissional',
                headerStyle: {
                  backgroundColor: colorDefault.primary,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </EspecialidadeProvider>
    </ApplicationProvider>
  );
};

export default App;
export {Stack};
export type {RootStackParamList};
