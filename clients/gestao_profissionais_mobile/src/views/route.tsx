import {
  NavigationContainer,
  DefaultTheme,
  RouteProp,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colorDefault} from '../shared/theme/colors';
import {HomePage} from './home/HomePage';
import {RegistrarProfissionaisPage} from './profissionais/registrar/RegistrarProfissionaisPage';
import {
  AtualizarProfissionalPage,
  PropsAtualizarProfissional,
} from './profissionais/atualizar/AtualizarProfissionalPage';

type RootStackParamList = {
  HomePage: undefined;
  RegistrarProfissionaisPage: undefined;
  AtualizarProfissionalPage: PropsAtualizarProfissional;
};

type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const themeDefault: ReactNavigation.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colorDefault.primary,
    text: 'white',
  },
};

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
          name="AtualizarProfissionalPage"
          component={AtualizarProfissionalPage}
          options={{
            title: 'Detalhes Profissional',
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
export type {RootStackParamList, RootRouteProps};
