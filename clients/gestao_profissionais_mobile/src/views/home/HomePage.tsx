import {FlatList, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useHomePageViewModel} from './home-page.view-model';
import {Button} from 'react-native-paper';
import {CustomMenu} from '../../shared/components/Menu.component';
import {EspecialidadeModel} from '../../models/especialidade.model';

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
    <View style={{flex: 1, gap: 4}}>
      <CustomMenu<EspecialidadeModel>
        handleItem={item => handleEspecialidade(item)}
        items={especialidades}
        onDismiss={() => handleDropdown(false)}
        onPress={() => handleDropdown(true)}
        titleItem="nome"
        valueText={especialidadeSelect?.nome ?? 'Selecione uma especialidade'}
        visible={visibleDropdown}
      />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
export {HomePage};
