import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {ProfissionalModel} from '../../../models/profissional.model';
import {useAtualizarProfissionalViewModel} from './atualizar-profissional.view-model';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import {
  EspecialidadeModel,
  nomeTipoDocEspecialidadeEnum,
} from '../../../models/especialidade.model';
import {CustomMenu} from '../../../shared/components/Menu.component';

type PropsAtualizarProfissional = {profissional: ProfissionalModel};

const AtualizarProfissionalPage = () => {
  const {
    atualizar,
    handleDropdown,
    handleEspecialidade,
    handleSubmit,
    controlForm,
    errorsForm,
    especialidadeSelect,
    visibleDropdown,
    especialidades,
    carregandoEspec,
    carregando,
  } = useAtualizarProfissionalViewModel();
  const insets = useSafeAreaInsets();

  return (
    <View style={{flex: 1, gap: 4, paddingBottom: insets.bottom}}>
      <Modal
        visible={carregando || carregandoEspec}
        transparent
        animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </Modal>
      <CustomMenu<EspecialidadeModel>
        handleItem={item => handleEspecialidade(item)}
        items={especialidades}
        onDismiss={() => handleDropdown(false)}
        onPress={() => handleDropdown(true)}
        titleItem="nome"
        valueText={especialidadeSelect?.nome ?? 'Selecione uma especialidade'}
        visible={visibleDropdown}
      />
      {errorsForm.especialidadeId && (
        <Text>{errorsForm.especialidadeId.message}</Text>
      )}
      <Controller
        control={controlForm}
        name="nome"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Nome"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errorsForm.nome && <Text>{errorsForm.nome.message}</Text>}

      <TextInput
        label="Tipo documento"
        value={nomeTipoDocEspecialidadeEnum(especialidadeSelect?.tipoDocumento)}
        readOnly
      />

      <Controller
        control={controlForm}
        name="numeroDocumento"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Número documento"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errorsForm.numeroDocumento && (
        <Text>{errorsForm.numeroDocumento.message}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(value => atualizar(value))}>
        Enviar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    // color: colorDefault.,
    marginTop: 10,
    fontSize: 16,
  },
});
export {AtualizarProfissionalPage};
export type {PropsAtualizarProfissional};
