import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback} from 'react';
import {RootRouteProps, RootStackParamList} from '../../route';

const useDetalhesProfissionalViewModel = () => {
  const {params} = useRoute<RootRouteProps<'DetalhesProfissionalPage'>>();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  useFocusEffect(
    useCallback(() => {
        console.log(params.profissional)
      return () => {};
    }, [params]),
  );

  return {
    navigate,
    params
  };
};

export {useDetalhesProfissionalViewModel};
