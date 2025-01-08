import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  DetalhesProfissionalPage,
  PropsDetalhesProfissional,
} from './profissionais/detalhes/DetalhesProfissionalPage';
import {ProfissionalModel} from '../models/profissional.model';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colorDefault} from '../shared/theme/colors';
import {HomePage} from './home/HomePage';
import {RegistrarProfissionaisPage} from './profissionais/registrar/RegistrarProfissionaisPage';
import {AtualizarProfissionalPage} from './profissionais/atualizar/AtualizarProfissionalPage';

const themeDefault: ReactNavigation.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colorDefault.primary,
    text: 'white',
  },
};

type RootStackParamList = {
  HomePage: undefined;
  RegistrarProfissionaisPage: undefined;
  DetalhesProfissionalPage: PropsDetalhesProfissional;
  AtualizarProfissionalPage: {profissional: ProfissionalModel};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
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
  );
};

export {Routes};
export type {RootStackParamList};
