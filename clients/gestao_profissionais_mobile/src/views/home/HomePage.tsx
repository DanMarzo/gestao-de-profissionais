import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../route';
import {useHomePageViewModel} from './home-page.view-model';
import {EspecialidadeModel} from '../../models/especialidade.model';
import {ProfissionalModel} from '../../models/profissional.model';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SelectDropdown} from '../../shared/components/SelectDropdown';

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
    <View style={{flex: 1, gap: 8, padding: 8}}>
      <SelectDropdown
        isFocus={visibleDropdown}
        readonly={false}
        data={especialidades}
        search
        labelField="nome"
        valueField="id"
        value={especialidadeSelect}
        onFocus={() => handleDropdown(true)}
        onBlur={() => handleDropdown(false)}
        onChange={(item: EspecialidadeModel) => {
          console.log(item);
          handleEspecialidade(item);
        }}
      />
      <Button
        style={styles.floatButton}
        mode="contained"
        onPress={() => {
          console.log();
          navigate('RegistrarProfissionaisPage');
        }}>
        <Icon name="plus" size={20} />
      </Button>
      <Button mode="contained" onPress={() => obterProfissionais()}>
        Obter profissional
      </Button>
      <FlatList
        data={profissionais?.data ?? []}
        renderItem={({item}) =>
          ProfissionalItem({
            profissional: item,
            onPress: () =>
              navigate('AtualizarProfissionalPage', {profissional: item}),
          })
        }
      />
    </View>
  );
};

type ProfissionalProps = {
  profissional: ProfissionalModel;
  onPress: () => void;
};

const ProfissionalItem = ({onPress, profissional}: ProfissionalProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.itemList]}>
      <Text>{profissional.nome}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  itemList: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  floatButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    zIndex: 999,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    borderRadius: '50%',
  },
});
export {HomePage};
