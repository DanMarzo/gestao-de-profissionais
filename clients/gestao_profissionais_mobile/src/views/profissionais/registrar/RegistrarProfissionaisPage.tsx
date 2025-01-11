import React from 'react';
import {Controller} from 'react-hook-form';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {useRegistrarProfissionalViewModel} from './registrar-profissionais.view-model';
import {
  EspecialidadeModel,
  nomeTipoDocEspecialidadeEnum,
} from '../../../models/especialidade.model';
import {Button, TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SelectDropdown} from '../../../shared/components/SelectDropdown';

const RegistrarProfissionaisPage = () => {
  const {
    controlForm,
    errorsForm,
    especialidades,
    carregandoEspecialidade,
    carregando,
    especialidadeSelect,
    visibleDropdown,
    handleSubmit,
    registrarProfissional,
    handleEspecialidade,
    handleDropdown,
  } = useRegistrarProfissionalViewModel();
  const insets = useSafeAreaInsets();

  return (
    <View style={{flex: 1, gap: 4, paddingBottom: insets.bottom}}>
      <Modal
        visible={carregando || carregandoEspecialidade}
        transparent
        animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </Modal>
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

      <Button mode="contained" onPress={handleSubmit(registrarProfissional)}>
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
export {RegistrarProfissionaisPage};
