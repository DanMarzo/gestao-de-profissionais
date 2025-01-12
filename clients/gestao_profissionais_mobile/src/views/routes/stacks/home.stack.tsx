import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AtualizarProfissionalPage,
  PropsAtualizarProfissional,
} from '../../profissionais/atualizar/AtualizarProfissionalPage';
import {RouteProp} from '@react-navigation/native';
import {HomePage} from '../../home/HomePage';

type HomeRootStackParamList = {
  HomePage: undefined;
  AtualizarProfissionalPage: PropsAtualizarProfissional;
};

type HomeRootRouteProps<RouteName extends keyof HomeRootStackParamList> =
  RouteProp<HomeRootStackParamList, RouteName>;

const Stack = createNativeStackNavigator<HomeRootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        options={{headerShown: false}}
        component={HomePage}
      />
      <Stack.Screen
        name="AtualizarProfissionalPage"
        component={AtualizarProfissionalPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
export type {HomeRootRouteProps, HomeRootStackParamList};
