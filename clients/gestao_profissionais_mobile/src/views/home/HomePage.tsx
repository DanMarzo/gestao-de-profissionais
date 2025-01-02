import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

const HomePage = () => {
  const {navigation} =
    useNavigation<StackScreenProps<RootStackParamList, 'HomePage'>>();
  return (
    <View>
      <Button
        title="Registrar Profissional"
        onPress={() =>
          navigation.push('RegistrarProfissionaisPage', {value: 'teste'})
        }
      />
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;
