import {Modal, StyleSheet, Text, View} from 'react-native';
import {ProfissionalModel} from '../../../models/profissional.model';
import {useAtualizarProfissionalViewModel} from './atualizar-profissional.view-model';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import {
  EspecialidadeModel,
  nomeTipoDocEspecialidadeEnum,
} from '../../../models/especialidade.model';
import {SelectDropdown} from '../../../shared/components/SelectDropdown';

type PropsAtualizarProfissional = {profissional: ProfissionalModel};

const AtualizarProfissionalPage = () => {
  const {
    atualizar,
    handleDropdown,
    handleEspecialidade,
    handleSubmit,
    handleReadonly,
    controlForm,
    errorsForm,
    especialidadeSelect,
    isFocus,
    especialidades,
    carregandoEspec,
    carregando,
    readonly,
  } = useAtualizarProfissionalViewModel();
  return (
    <View style={{flex: 1, gap: 8, padding: 8}}>
      <Modal
        visible={carregando || carregandoEspec}
        transparent
        animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </Modal>

      <SelectDropdown
        isFocus={isFocus}
        readonly={readonly}
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
      {errorsForm.especialidadeId && (
        <Text>{errorsForm.especialidadeId.message}</Text>
      )}
      <Controller
        control={controlForm}
        name="nome"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            readOnly={readonly}
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
            readOnly={readonly}
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

      {readonly ? (
        <Button icon="pencil" mode="contained" onPress={() => handleReadonly()}>
          Editar
        </Button>
      ) : (
        <>
          <Button
            mode="contained"
            onPress={handleSubmit(value => atualizar(value))}>
            Enviar
          </Button>
          <Button mode="text" onPress={() => handleReadonly(true)}>
            Cancelar
          </Button>
        </>
      )}
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
