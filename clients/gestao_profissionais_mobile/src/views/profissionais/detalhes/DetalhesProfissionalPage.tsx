import {View} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Button, Text} from 'react-native-paper';
import {ProfissionalModel} from '../../../models/profissional.model';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '../../route';

type PropsDetalhesProfissional = {
  profissional: ProfissionalModel;
};

const DetalhesProfissionalPage = () => {
  const {params} = useRoute<RouteProp<PropsDetalhesProfissional>>();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>{JSON.stringify(params)}</Text>
      <Button
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
