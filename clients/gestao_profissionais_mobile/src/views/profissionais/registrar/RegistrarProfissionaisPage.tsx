import React from 'react';
import {Controller} from 'react-hook-form';
import {Text, View} from 'react-native';
import {useRegistrarProssionalViewModel} from './registrar-profissionais.view-model';
import {Button, Input, Select, SelectItem} from '@ui-kitten/components';

const RegistrarProfissionaisPage = () => {
  const {
    controlForm,
    errorsForm,
    handleSubmit,
    registrarProfissional,
    especialidades,
    carregandoEspecialidade,
    selectedIndex,
    setSelectedIndex,
  } = useRegistrarProssionalViewModel();

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <Select
        selectedIndex={selectedIndex}
        value={
          <Text>{`${
            especialidades[selectedIndex.row]?.nome ??
            'Selecione a especialidade'
          }`}</Text>
        }
        placeholder="Especialidade"
        onSelect={index => setSelectedIndex(index as any)}>
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

      <Button onPress={handleSubmit(registrarProfissional)}>
        <Text>Enviar</Text>
      </Button>
    </View>
  );
};

export {RegistrarProfissionaisPage};
