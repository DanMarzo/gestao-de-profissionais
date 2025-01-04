import {Button, FlatList, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {HomePageViewModel} from './home-page.view-model';

const HomePage = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {especialidades, obterProfissionais} = HomePageViewModel();
  return (
    <View>
      <Button
        title="Registrar Profissional"
        onPress={() => navigate('RegistrarProfissionaisPage', {value: 'tete'})}
      />
      <Button title="Obter profissional" onPress={() => obterProfissionais()} />
      <FlatList
        data={especialidades}
        renderItem={({item}) => (
          <View>
            <Text>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
};

export {HomePage};
