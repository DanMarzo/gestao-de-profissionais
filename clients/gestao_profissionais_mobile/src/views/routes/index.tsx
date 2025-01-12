import {
  NavigationContainer,
  DefaultTheme,
  RouteProp,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AtualizarProfissionalPage,
  PropsAtualizarProfissional,
} from '../profissionais/atualizar/AtualizarProfissionalPage';
import {colorDefault} from '../../shared/theme/colors';
import {HomeTabs} from './tabs/home.tabs';
import {HomePage} from '../home/HomePage';

type RootStackParamList = {
  HomeTabs: undefined;
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
      <HomeTabs />
    </NavigationContainer>
  );
};

export {Routes};
export type {RootStackParamList, RootRouteProps};
