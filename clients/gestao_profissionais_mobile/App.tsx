import React from 'react';
import {useColorScheme} from 'react-native';
import {EspecialidadeProvider} from './src/providers/Especialidade.context';
import themeLight from './theme.json';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {Routes} from './src/views/route';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/infra/config-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RouteProp} from '@react-navigation/native';

const theme: ThemeProp = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: themeLight['color-primary-500'],
    secondary: themeLight['color-primary-500'],
  },
};

const configQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={configQueryClient}>
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <EspecialidadeProvider>
            <Routes />
          </EspecialidadeProvider>
        </PaperProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default App;
