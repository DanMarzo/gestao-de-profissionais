import React from 'react';
import {View} from 'react-native';
import {ProfissionalModel} from '../../../models/profissional.model';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Text} from 'react-native-paper';

type PropsDetalhesProfissional = {
  profissional: ProfissionalModel;
};

const DetalhesProfissionalPage = () => {
  const {params} = useRoute<RouteProp<PropsDetalhesProfissional>>();
  return (
    <View>
      <Text>{JSON.stringify(params)}</Text>
    </View>
  );
};

export {DetalhesProfissionalPage};
export type {PropsDetalhesProfissional};
