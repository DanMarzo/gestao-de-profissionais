import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {RegistrarProfissionaisPage} from '../../profissionais/registrar/RegistrarProfissionaisPage';
import {NavigatorScreenParams} from '@react-navigation/native';
import HomeStack, {HomeRootStackParamList} from '../stacks/home.stack';
import {colorDefault} from '../../../shared/theme/colors';

type RootStackTabsParamList = {
  HomeStack: NavigatorScreenParams<HomeRootStackParamList>;
  RegistrarProfissionaisPage: undefined;
};

const Tab = createBottomTabNavigator<RootStackTabsParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        options={{
          title: 'Inicio',
          headerStyle: {
            backgroundColor: colorDefault.primary,
          },
        }}
        component={HomeStack}
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
