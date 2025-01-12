import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {colorDefault} from '../../shared/theme/colors';
import {RoutesStack} from './stacks/home.stack';

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
      <RoutesStack />
    </NavigationContainer>
  );
};

export {Routes};
// export type {RootStackParamList, RootRouteProps};
