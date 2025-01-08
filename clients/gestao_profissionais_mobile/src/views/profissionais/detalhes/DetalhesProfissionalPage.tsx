import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {ProfissionalModel} from '../../../models/profissional.model';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDetalhesProfissionalViewModel} from './detalhes-profissional.view-model';

type PropsDetalhesProfissional = {
  profissional: ProfissionalModel;
};

const DetalhesProfissionalPage = () => {
  const {navigate, params} = useDetalhesProfissionalViewModel();
  return (
    <View>
      <Text>{JSON.stringify(params)}</Text>
      <Button
        mode="contained"
        onPress={() =>
          navigate('AtualizarProfissionalPage', {profissional: params})
        }>
        <Icon name="edit" />
      </Button>
    </View>
  );
};

export type {PropsDetalhesProfissional};
export {DetalhesProfissionalPage};
