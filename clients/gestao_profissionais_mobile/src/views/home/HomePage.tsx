import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useHomePageViewModel} from './home-page.view-model';
import {EspecialidadeModel} from '../../models/especialidade.model';
import {ProfissionalModel} from '../../models/profissional.model';
import {Button} from 'react-native-paper';
import {SelectDropdown} from '../../shared/components/SelectDropdown';
import {DataTable} from 'react-native-paper';
import {useEffect, useState} from 'react';

const HomePage = () => {
  const {
    especialidades,
    visibleDropdown,
    params,
    handleEspecialidade,
    handleDropdown,
    obterProfissionais,
    numeroPaginas,
  } = useHomePageViewModel();
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  const [items] = useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map(item => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
      {/* <FlatList
        data={profissionais ?? []}
        renderItem={({item}) =>
          ProfissionalItem({
            profissional: item,
            onPress: () =>
              navigate('AtualizarProfissionalPage', {profissional: item}),
          })
        }
      /> */}
    </>
  );
};

type ProfissionalProps = {
  profissional: ProfissionalModel;
  onPress: () => void;
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
