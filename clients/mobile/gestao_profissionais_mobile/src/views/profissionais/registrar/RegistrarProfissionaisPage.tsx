import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, Text} from 'react-native';
import {useRegistrarProfissionalViewModel} from './registrar-profissionais.view-model';
import {
  EspecialidadeModel,
  nomeTipoDocEspecialidadeEnum,
} from '../../../models/especialidade.model';
import {Button, TextInput} from 'react-native-paper';
import {SelectDropdown} from '../../../shared/components/SelectDropdown';
import {ModalLoading} from '../../../shared/components/ModalLoading';

const RegistrarProfissionaisPage = () => {
  const {
    controlForm,
    errorsForm,
    especialidades,
    carregandoEspecialidades,
    carregando,
    especialidadeSelect,
    visibleDropdown,
    handleSubmit,
    registrarProfissional,
    handleEspecialidade,
    handleDropdown,
    goBack,
  } = useRegistrarProfissionalViewModel();

  return (
    <>
      <ModalLoading carregando={carregando || carregandoEspecialidades} />
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
        onChange={(item: EspecialidadeModel) => handleEspecialidade(item)}
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
        onPress={handleSubmit(value => registrarProfissional(value))}>
        Registrar
      </Button>
      <Button mode="text" onPress={() => goBack()}>
        Cancelar
      </Button>
    </>
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
    marginTop: 10,
    fontSize: 16,
  },
});
export {RegistrarProfissionaisPage};
