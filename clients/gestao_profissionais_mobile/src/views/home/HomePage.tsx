import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useHomePageViewModel} from './home-page.view-model';
import {EspecialidadeModel} from '../../models/especialidade.model';
import {ProfissionalModel} from '../../models/profissional.model';
import {Button} from 'react-native-paper';
import {SelectDropdown} from '../../shared/components/SelectDropdown';

const HomePage = () => {
  const {
    especialidades,
    profissionais,
    visibleDropdown,
    params,
    handleEspecialidade,
    handleDropdown,
    navigate,
    carregando,
    carregandoEspecialidades,
    obterProfissionais,
  } = useHomePageViewModel();
  return (
    <>
      <SelectDropdown
        isFocus={visibleDropdown}
        readonly={false}
        data={especialidades}
        search
        labelField="nome"
        valueField="id"
        value={params.especialidade}
        onFocus={() => handleDropdown(true)}
        onBlur={() => handleDropdown(false)}
        onChange={(item: EspecialidadeModel) => {
          handleEspecialidade(item);
        }}
      />
      <Button mode="contained" onPress={() => obterProfissionais()}>
        Obter profissional {}
      </Button>
      <FlatList
        data={profissionais ?? []}
        renderItem={({item}) =>
          ProfissionalItem({
            profissional: item,
            onPress: () =>
              navigate('AtualizarProfissionalPage', {profissional: item}),
          })
        }
      />
    </>
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
