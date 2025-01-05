import {FlatList, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useHomePageViewModel} from './home-page.view-model';
import {Button, Menu} from 'react-native-paper';

const HomePage = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    especialidades,
    profissionais,
    especialidadeSelect,
    visibleDropdown,
    obterProfissionais,
    handleEspecialidade,
    handleDropdown,
  } = useHomePageViewModel();

  return (
    <View>
      <Menu
        visible={visibleDropdown}
        onDismiss={() => handleDropdown(false)}
        anchor={
          <Button onPress={() => handleDropdown()}>
            {especialidadeSelect?.nome ?? 'Selecione uma especialidade'}
          </Button>
        }>
        {especialidades.map(item => {
          return (
            <Menu.Item
              onPress={() => handleEspecialidade(item)}
              title={item.nome}
            />
          );
        })}
      </Menu>
      <Button
        mode="contained"
        onPress={() => navigate('RegistrarProfissionaisPage')}>
        Registrar Profissional
      </Button>
      <Button mode="contained" onPress={() => obterProfissionais()}>
        Obter profissional
      </Button>
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
