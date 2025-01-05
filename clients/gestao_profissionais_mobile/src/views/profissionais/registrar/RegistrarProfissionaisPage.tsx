import React from 'react';
import {Controller} from 'react-hook-form';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {useRegistrarProfissionalViewModel} from './registrar-profissionais.view-model';
import {Button, Input, Select, SelectItem, Text} from '@ui-kitten/components';
import {nomeTipoDocEspecialidadeEnum} from '../../../models/especialidade.model';

const RegistrarProfissionaisPage = () => {
  const {
    controlForm,
    errorsForm,
    especialidades,
    carregandoEspecialidade,
    selectedIndex,
    especialidade,
    carregando,
    handleSubmit,
    registrarProfissional,
    handleEspecialidade,
  } = useRegistrarProfissionalViewModel();

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <Modal
        visible={carregando || carregandoEspecialidade}
        transparent
        animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />

          <Text style={styles.loadingText} status="primary">
            Carregando...
          </Text>
        </View>
      </Modal>
      <Select
        selectedIndex={selectedIndex}
        value={
          <Text>{`${especialidade?.nome ?? 'Selecione a especialidade'}`}</Text>
        }
        placeholder="Especialidade"
        onSelect={index => handleEspecialidade(index as any)}>
        {especialidades.map(item => (
          <SelectItem title={item.nome} key={item.id} />
        ))}
      </Select>
      {errorsForm.especialidadeId && (
        <Text>{errorsForm.especialidadeId.message}</Text>
      )}
      <Controller
        control={controlForm}
        name="nome"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Nome"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errorsForm.nome && <Text>{errorsForm.nome.message}</Text>}

      <Input
        value={nomeTipoDocEspecialidadeEnum(especialidade?.tipoDocumento)}
        readOnly
      />

      <Controller
        control={controlForm}
        name="numeroDocumento"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Número documento"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errorsForm.numeroDocumento && (
        <Text>{errorsForm.numeroDocumento.message}</Text>
      )}

      <Button status="primary" onPress={handleSubmit(registrarProfissional)}>
        <Text>Enviar</Text>
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
