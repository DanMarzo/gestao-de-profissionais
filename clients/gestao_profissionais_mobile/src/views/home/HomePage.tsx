import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const HomePage = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  console.log(navigate);
  return (
    <View>
      <Button
        title="Registrar Profissional"
        onPress={() => navigate('RegistrarProfissionaisPage', {value: 'tete'})}
      />
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;
