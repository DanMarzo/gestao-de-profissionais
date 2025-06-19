import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React, {useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {RootStackParamList} from '../routes/stacks/home.stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from '../../shared/theme/toasts';

const RegisterHostPage = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const [http, sethttp] = useState('');

  const httpRoot = async (host: string) => {
    try {
      const res = await axios.get(host.toLowerCase());
      return res;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const queryHttpTest = useMutation({
    mutationFn: (host: string) => httpRoot(host),
    onSuccess: (_, param) => {
      AsyncStorage.setItem('client_http', param).then(() =>
        navigate('HomeTabs', {screen: 'HomePage'}),
      );
    },
    onError: () => {
      Toast('Host invalido', ToastAndroid.BOTTOM);
    },
  });
  return (
    <View style={{padding: 8, gap: 8}}>
      <TextInput label={'Http Host'} onChangeText={e => sethttp(e)}></TextInput>
      <Button onPress={() => queryHttpTest.mutate(http)} mode="contained">
        Confirmar
      </Button>
    </View>
  );
};

export {RegisterHostPage};
