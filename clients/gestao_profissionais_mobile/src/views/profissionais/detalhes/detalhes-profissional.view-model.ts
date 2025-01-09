import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback} from 'react';
import {RootStackParamList} from '../../route';
import {PropsDetalhesProfissional} from './DetalhesProfissionalPage';

const useDetalhesProfissionalViewModel = () => {
  const {params} = useRoute<RouteProp<PropsDetalhesProfissional>>();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  useFocusEffect(
    useCallback(() => {
        console.log(params)
      return () => {};
    }, [params]),
  );

  return {
    navigate,
    params
  };
};

export {useDetalhesProfissionalViewModel};
