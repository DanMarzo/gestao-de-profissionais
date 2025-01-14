import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RegistrarProfissionaisPage} from '../../../profissionais/registrar/RegistrarProfissionaisPage';
import {colorDefault} from '../../../../shared/theme/colors';
import {HomePage} from '../../../home/HomePage';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeTabsLayout} from './home-tabs.layout';

type HomeStackTabsParamList = {
  HomePage: undefined;
  RegistrarProfissionaisPage: undefined;
};

const Tab = createBottomTabNavigator<HomeStackTabsParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenLayout={({children}) => {
        return <HomeTabsLayout>{children}</HomeTabsLayout>;
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'HomePage':
              iconName = 'home-variant-outline';
              break;
            case 'RegistrarProfissionaisPage':
              iconName = 'plus';
            default:
              break;
          }
          return (
            <MaterialDesignIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: colorDefault.primary, // Cor do item ativo
        tabBarInactiveTintColor: colorDefault.tertiary, // Cor do item inativo
        tabBarStyle: {
          backgroundColor: '#f2f2f2', // Cor de fundo da barra
        },
      })}
      initialRouteName="HomePage">
      <Tab.Screen
        name="HomePage"
        options={{
          title: 'Profissionais',
          headerStyle: {
            backgroundColor: colorDefault.primary,
          },
        }}
        component={HomePage}
      />
      <Tab.Screen
        name="RegistrarProfissionaisPage"
        options={{
          title: 'Registrar',
          headerStyle: {
            backgroundColor: colorDefault.primary,
          },
        }}
        component={RegistrarProfissionaisPage}
      />
    </Tab.Navigator>
  );
};

export {HomeTabs};
export type {HomeStackTabsParamList};
