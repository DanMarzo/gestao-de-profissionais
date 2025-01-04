import {Button, FlatList, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {HomePageViewModel} from './home-page.view-model';
import {Select, SelectItem} from '@ui-kitten/components';

const HomePage = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    especialidades,
    obterProfissionais,
    profissionais,
    selectedIndex,
    setSelectedIndex,
  } = HomePageViewModel();

  return (
    <View>
      <Select
        selectedIndex={selectedIndex}
        value={
          <Text>{`${
            especialidades[selectedIndex.row]?.nome ??
            'Selecione a especialidade'
          }`}</Text>
        }
        placeholder="Especialidade"
        onSelect={index => setSelectedIndex(index as any)}>
        {especialidades.map(item => (
          <SelectItem title={item.nome} key={item.id} />
        ))}
      </Select>
      <Button
        title="Registrar Profissional"
        onPress={() => navigate('RegistrarProfissionaisPage')}
      />
      <Button title="Obter profissional" onPress={() => obterProfissionais()} />
      <FlatList
        data={profissionais?.data ?? []}
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
