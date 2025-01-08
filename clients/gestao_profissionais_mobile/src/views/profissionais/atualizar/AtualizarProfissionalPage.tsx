import React from 'react';
import {Text, View} from 'react-native';
import {ProfissionalModel} from '../../../models/profissional.model';
import {RouteProp, useRoute} from '@react-navigation/native';

type PropsAtualizarProfissional = {profissional: ProfissionalModel};

const AtualizarProfissionalPage = () => {
  const {params} = useRoute<RouteProp<PropsAtualizarProfissional>>();
  return (
    <View>
      <Text>{JSON.stringify(params)}</Text>
    </View>
  );
};

export {AtualizarProfissionalPage};
export type {PropsAtualizarProfissional};
