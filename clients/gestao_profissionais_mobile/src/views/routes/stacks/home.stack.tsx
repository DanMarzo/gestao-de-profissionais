import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AtualizarProfissionalPage,
  PropsAtualizarProfissional,
} from '../../profissionais/atualizar/AtualizarProfissionalPage';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {colorDefault} from '../../../shared/theme/colors';
import {HomeTabs, HomeStackTabsParamList} from '../tabs/home/home.tabs';
import {RegisterHostPage} from '../../register-host/RegisterHostPage';

type RootStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeStackTabsParamList>;
  AtualizarProfissionalPage: PropsAtualizarProfissional;
  RegisterHostView: undefined;
};

type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RoutesStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTabs">
      <Stack.Screen
        name="HomeTabs"
        options={{headerShown: false}}
        component={HomeTabs}
      />
      <Stack.Screen name="RegisterHostView" component={RegisterHostPage} />
      <Stack.Screen
        name="AtualizarProfissionalPage"
        component={AtualizarProfissionalPage}
        options={{
          headerShown: true,
          title: 'Atualizar',
          headerStyle: {
            backgroundColor: colorDefault.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export {RoutesStack};
export type {RootRouteProps, RootStackParamList};
