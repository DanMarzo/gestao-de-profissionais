import {Text, View} from 'react-native';
import {useHomePageViewModel} from './home-page.view-model';
import {
  EspecialidadeModel,
  nomeTipoDocEspecialidadeEnum,
} from '../../models/especialidade.model';
import {Button, IconButton} from 'react-native-paper';
import {SelectDropdown} from '../../shared/components/SelectDropdown';
import {DataTable} from 'react-native-paper';
import {ModalLoading} from '../../shared/components/ModalLoading';
import {colorDefault} from '../../shared/theme/colors';

const HomePage = () => {
  const {
    especialidades,
    visibleDropdown,
    handleEspecialidade,
    handleDropdown,
    obterProfissionais,
    obterProfissionaisState,
    params,
    handlePerPage,
    handlePage,
    navigate,
    carregandoEspecialidades,
    clearSelect,
  } = useHomePageViewModel();
  return (
    <>
      <ModalLoading
        carregando={
          obterProfissionaisState.carregando || carregandoEspecialidades
        }
      />
      <View style={{flexDirection: 'row', gap: 8}}>
        <SelectDropdown
          styles={{flex: 1}}
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
        <IconButton
          icon="close"
          iconColor={colorDefault.primary}
          disabled={!params.especialidade}
          onPress={() => clearSelect()}
        />
      </View>
      <Button mode="contained" onPress={() => obterProfissionais()}>
        Obter profissional {}
      </Button>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nome</DataTable.Title>
          <DataTable.Title>Tipo documento</DataTable.Title>
        </DataTable.Header>

        {obterProfissionaisState.carregando || carregandoEspecialidades ? (
          <Text>Carregando...</Text>
        ) : (
          <>
            {(obterProfissionaisState.profissionais ?? []).map(
              (item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.nome}</DataTable.Cell>
                  <DataTable.Cell
                    onPress={() =>
                      navigate('AtualizarProfissionalPage', {
                        profissional: item,
                      })
                    }>
                    {nomeTipoDocEspecialidadeEnum(
                      item.especialidade.tipoDocumento,
                    )}
                  </DataTable.Cell>
                </DataTable.Row>
              ),
            )}
          </>
        )}
        <DataTable.Pagination
          page={params.pagina - 1}
          numberOfPages={obterProfissionaisState.numeroPaginas}
          onPageChange={pagina => handlePage(pagina + 1)}
          label={`${params.pagina} de ${obterProfissionaisState.numeroPaginas}`}
          numberOfItemsPerPageList={[2, 5, 10, 15, 20]}
          numberOfItemsPerPage={params.itens}
          onItemsPerPageChange={qtdePerPage => handlePerPage(qtdePerPage)}
          selectPageDropdownLabel={'Linhas por página'}
          showFastPaginationControls
        />
      </DataTable>
    </>
  );
};

export {HomePage};
